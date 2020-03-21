import os
import json
from . import mongo
from celery import Celery
from server.peeps import Peep
from server.ai import pipe
from werkzeug.utils import secure_filename

celery = Celery(__name__,autofinalize=False)

@celery.task()
def input_db_task(inputFileDir,userName,collectionName):
	"""
	This function takes the filepath of the json file, parse it to marshmallow
	then load it into mongodb
	"""
	with open(inputFileDir) as f:
		inputDict = json.load(f)
	filteredList = [
			{
				'timestamp':x['timestamp'],
				'post':x['data'][0]['post']
			} 
			for x in inputDict 
			if((x.get('title')) and ('status' in x['title']))
			]
	filteredDict = {'statuses':filteredList,'email':userName}
	peepSchema = Peep().load(filteredDict)
	mongo.db[collectionName].insert(peepSchema)
	return [x['post'] for x in filteredList]
	
@celery.task()
def predict_post_task(inputList):
	"""
	This function takes a list of string and output probabilities for 5
	personalities as follow Extraversion, Neuroticism, Agreeableness, Conscientiousnes,
	Openness
	"""
	predictResult = pipe.predict_proba(inputList)
	predictResultMean = predictResult.mean(axis=0)
	return {'result':predictResultMean.tolist(),'status':'Success'}
