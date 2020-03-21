import json
from functools import wraps 
from flask import request,g,abort
from jwt import decode,exceptions
import logging
logging.basicConfig(level=logging.INFO)

logger = logging.getLogger('HELLO WORLD')
def login_required(f):
	@wraps(f)
	def wrapper(*args,**kwargs):
		authorization = request.headers.get('authorization',None)
		if not authorization:
			return json.dumps({'error':'no authorization token provided'},403,{'content-type':'application/json'})
		try :
			logger.info(authorization)
			token = authorization.split(' ')[1]
			logger.info(token)
			resp = decode(token,None,verify=False,algorithm=['HS256'])
			g.user = resp['sub']
		except exceptions.DecodeError as identifier:
			return json.dumps({'error':'invalid authorization token'},403,{'content-type':'application/json'})
		return f(*args,**kwargs)

	return wrapper	

