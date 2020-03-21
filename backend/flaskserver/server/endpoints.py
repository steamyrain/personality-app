import os
import json
import logging
from celery import signature,chain,uuid
from werkzeug.utils import secure_filename
from server.middlewares import login_required
from flask import Blueprint,json,request,g,current_app,jsonify,url_for
from flask_cors import CORS
from server.tasks import input_db_task,predict_post_task

logging.getLogger('flask_cors').setLevel(logging.DEBUG)
bp = Blueprint("endpoints",__name__)
CORS(bp,expose_headers=['Content-Type','Location'])

@bp.route('/upload',methods=['POST'])
@login_required
def fileUpload():
	target = os.path.join(current_app.config['UPLOAD_FOLDER'],g.user)
	if not os.path.isdir(target):
		os.mkdir(target)
	file = request.files['file']
	filename = secure_filename(file.filename)
	destination = os.path.join(target,filename)
	file.save(destination)
	input_db_task_id = uuid()
	predict_post_task_id = uuid()
	chainTask = chain(
		input_db_task
		.s(
			inputFileDir=destination,
			userName=g.user,
			collectionName=current_app.config['MONGO_COL']
		)
		.set(task_id=input_db_task_id),
		predict_post_task.s().set(task_id=predict_post_task_id)
	).apply_async()
	return jsonify({}),202,{
				'Location':url_for(
						'endpoints.checkTask',
						task_id=predict_post_task_id
				)}

@bp.route('/status/<task_id>',methods=['GET'])
@login_required
def checkTask(task_id):
	task = input_db_task.AsyncResult(task_id)
	if task.state == 'PENDING':
		response = {
			'state':task.state,
			'status':'Pending...'
		}
	elif task.state != 'FAILURE':
		response = {
			'state':task.state,
			'status':task.info.get('status','')
		}
		if 'result' in task.info:
			response['result']=task.info['result']
	else:
		response={
			'state':task.state,
			'status':str(task.info)
		}
	return jsonify(response)

def json_response(payload,status=200):
	return (json.dumps(payload),status,{'content-type':'application/json'})
