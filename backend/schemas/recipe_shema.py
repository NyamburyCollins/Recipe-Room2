from marshmallow import Schema, fields

class RecipeSchema(Schema):
    id = fields.Int(dump_only=True)
    title = fields.Str(required=True)
    ingredients = fields.Str(required=True)
    instructions = fields.Str(required=True)
    country = fields.Str()
    serves = fields.Int()
    rating_avg = fields.Float()