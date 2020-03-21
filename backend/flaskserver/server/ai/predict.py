import os
import pandas as pd
import xgboost as xgb
from sklearn.multiclass import OneVsRestClassifier
from sklearn.metrics import hamming_loss
from sklearn.pipeline import Pipeline
from doc_vectorizer.sen2vec import SpacyPrepV
from joblib import load

dir_name = os.path.dirname(os.path.abspath(__file__))
model = load(os.path.join(dir_name,'glove-cv-xgb.joblib'))
pipe = Pipeline(steps=[
			('vectorizer', SpacyPrepV()),
			('clf',model)
		])
