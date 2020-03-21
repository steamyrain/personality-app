import os
import logging
from flask import Flask
from flask_pymongo import PyMongo
mongo = PyMongo()


def create_app(debug=False):
	return entry_point(debug)

def create_celery(debug=False,mode='celery'):
	return entry_point(debug,mode)	

def entry_point(debug=False,mode='app'):
	from server import endpoints,tasks
	app = Flask(__name__)
	app.debug = debug
	configure_app(app)
	configure_celery(app,tasks.celery)
	configure_logging()
	app.register_blueprint(endpoints.bp)
	mongo.init_app(app)
	if mode == 'app':
		return app
	elif mode == 'celery':
		return tasks.celery

def configure_app(app):
	app.config['UPLOAD_FOLDER']=os.getenv('UPLOAD_FOLDER')
	app.config['CELERY_BROKER_URL']=os.getenv('CELERY_BROKER_URL')
	app.config['CELERY_RESULT_BACKEND']=os.getenv('CELERY_RESULT_BACKEND')
	app.config['MONGO_URI']=os.getenv('MONGO_URI')
	app.config['MONGO_COL']=os.getenv('MONGO_COL')	

def configure_celery(app,celery):
        celery.conf.broker_url = app.config['CELERY_BROKER_URL']
        celery.conf.result_backend = app.config['CELERY_RESULT_BACKEND']
        TaskBase = celery.Task
        class AppContextTask(TaskBase):
                abstract=True
                def __call__(self,*args,**kwargs):
                        with app.app_context():
                                return TaskBase.__call__(self,*args,**kwargs)
        celery.Task = AppContextTask
        celery.finalize()

def configure_logging(debug=False):
        root = logging.getLogger()
        if debug:
                root.setLevel(logging.DEBUG)
        else:
                root.setLevel(logging.INFO)

