from flask import Flask, render_template, jsonify, request
from flask_sqlalchemy import SQLAlchemy, get_debug_queries
from sqlalchemy.ext.automap import automap_base
from sqlalchemy import func
from flask_cors import CORS
from flask_marshmallow import Marshmallow

app = Flask(__name__, static_folder='../static/dist', template_folder='../static')
app.debug = True
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://postgres:pass@localhost:5432/test'
db = SQLAlchemy(app)

PAGESIZE = 10
# FIX
CORS(app)


# debug
def sql_debug(response):
    queries = list(get_debug_queries())
    query_str = ''
    total_duration = 0.0
    for q in queries:
        total_duration += q.duration
        stmt = str(q.statement % q.parameters).replace('\n', '\n       ')
        query_str += 'Query: {0}\nDuration: {1}ms\n\n'.format(stmt, round(q.duration * 1000, 2))

    print('=' * 80)
    print(' SQL Queries - {} Queries Executed in {:.2}ms'.format(len(queries), total_duration * 1000))
    print('=' * 80)
    print(query_str.rstrip('\n'))
    print('=' * 80 + '\n')

    return response


app.after_request(sql_debug)


# reflection

Base = automap_base()

Base.prepare(db.engine, reflect=True)

Food = Base.classes['food']
Vintages = Base.classes['vintages']
Wines = Base.classes['wines']
Grapes = Base.classes['grapes']
Styles = Base.classes['styles']
Regions = Base.classes['regions']

ma = Marshmallow(app)


class StyleSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name')


class FoodSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'seo_name', 'img')


class ReviewSchema(ma.Schema):
    class Meta:
        fields = ('id', 'user_id', 'vintage_id', 'note', 'rating')


food_schema = FoodSchema()
foods_schema = FoodSchema(many=True)


class WineSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'seo_name', 'style', 'region_id', 'winery_id')


wine_schema = WineSchema()
wines_schema = WineSchema(many=True)


class VintagesSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'seo_name', 'year', 'wine_id', 'img', 'wines')
    wines = ma.Nested(WineSchema)


class VintageSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'seo_name', 'year', 'wine_id', 'img', 'wines', 'reviews_collection')

    reviews_collection = ma.Nested(ReviewSchema, many=True)
    wines = ma.Nested(WineSchema)


vintage_schema = VintageSchema()


vintages_schema = VintagesSchema(many=True)


class GrapeSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'seo_name', 'styles_collection')
    styles_collection = ma.Nested(StyleSchema, many=True)


grape_schema = GrapeSchema()
grapes_schema = GrapeSchema(many=True)


@app.route('/api/vintage/<vintage_id>', methods=['GET'])
def get_vintage(vintage_id):
    vintage = db.session.query(Vintages).filter(Vintages.id == vintage_id).first()
    return jsonify(vintage_schema.dump(vintage).data)


@app.route('/api/list_food', methods=['GET', 'POST'])
def list_food():
    sample = db.session.query(Food).all()
    return jsonify(foods_schema.dump(sample).data)


@app.route('/api/list_grapes', methods=['GET', 'POST'])
def list_grapes():
    sample = db.session.query(Grapes).all()
    return jsonify(grapes_schema.dump(sample).data)


@app.route('/api/list_vintages', methods=['GET', 'POST'])
def list_vintages():
    filters = []
    ss = request.json.get('nameFilter', '').lower()
    type_filters = request.json.get('types', [])

    if type_filters:
        filters.append(
                db.session.query(Vintages)
                .join(Wines)
                .filter(Wines.type_id.in_(type_filters))
        )

    if ss:
        filters.append(
                db.session.query(Vintages)
                .filter(func.lower(Vintages.name).contains(ss))
        )

    sample = db.session.query(Vintages).intersect(*filters).all()
    return jsonify(vintages_schema.dump(sample).data)


if __name__ == '__main__':
    app.run()
