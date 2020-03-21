from marshmallow import Schema,fields
class Post(Schema):
	timestamp = fields.Int()
	post = fields.Str()
class Peep(Schema):
	statuses=fields.List(fields.Nested(Post))
	email=fields.Str()	
