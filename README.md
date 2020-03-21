# personality-app
This app predicts user's Big 5 personality based on user's facebook posts using XGBoost machine learning.
A web app was created as an interface and to visualize the prediction results.

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

  
