# personality-app
This app predicts user's Big 5 personality based on user's facebook posts using XGBoost machine learning.
A web app was created as an interface and to visualize the prediction results.

# Demo
[<img src="https://i.gyazo.com/24c9b55197fb2a1404b4e3077a19d7fa.png" width="50%">](https://streamable.com/fucnp4)

---
# Requirements
1. Machine Learning with Python
```
* XGBoost
* Spacy
* Keras (pipeline) 
```
2. Backend
```
* Python
* MongoDB
* Redis
* Celery
* Flask
```
3. Frontend
```
* Node.js/npm
* React
```

---
# Getting Started

## Train your model
Prepare your dataset

Get the vector of each post using SpaCy

Train the xgboost model until it match the desired evaluation metric score 

Pickle the model and put it inside **backend/flaskserver/server/ai** to serve incoming prediction requests

## Set the environment variables
Backend environment variables in **backend/flaskserver**
```
UPLOAD_FOLDER=static/uploads
CELERY_BROKER_URL=*your celery broker url (in this case redis uri)*
CELERY_RESULT_BACKEND=*your celery result url (in this case redis uri)*
MONGO_URI=*your mongo uri*
MONGO_COL=*the name of your mongo collection*
```

Frontend environment variables in **frontend/peep**
These environment variables was created for Okta Open ID
```
REACT_APP_CLIENT_ID=*your okta client id*
REACT_APP_ISSUER=*your okta app issuer*
REACT_APP_REDIRECT_URI=*your redirect uri after successful authentication*
REACT_APP_TESTING_DISABLEHTTPSCHECK=false
```

## Backend
Install dependencies with pipenv:
```
pipenv install
```

Run your mongo and redis daemon

Run the flask server:
```
pipenv run python entrypoint_api.py --port 3000 --debug
```
Run celery worker:
```
pipenv run celery worker -A entrypoint_celery:celery -c -1 -l debug
```

## Frontend 
Install dependencies:
```
npm install
```

Run the web app frontend:
```
npm run
```

  
