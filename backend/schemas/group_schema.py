from marshmallow import Schema, fields

class GroupSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True)
    members = fields.List(fields.Int())