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

ma = Marshmallow(app)


class FoodSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'seo_name', 'img')


food_schema = FoodSchema()
foods_schema = FoodSchema(many=True)


class WineSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'seo_name', 'style', 'region_id', 'winery_id')


wine_schema = WineSchema()
wines_schema = WineSchema(many=True)


class VintageSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'seo_name', 'year', 'wine_id', 'img', 'wines')
    wines = ma.Nested(WineSchema, many=False)


vintage_schema = VintageSchema()
vintages_schema = VintageSchema(many=True)


@app.route('/api/list_food', methods=['GET', 'POST'])
def list_food():
    sample = db.session.query(Food).all()
    return jsonify(foods_schema.dump(sample).data)


@app.route('/api/list_vintages', methods=['GET', 'POST'])
def list_vintages():
    ss = request.json.get('nameFilter', '').lower()
    print(ss)
    sample = db.session.query(Vintages).filter(func.lower(Vintages.name).contains(ss)).all()
    return jsonify(vintages_schema.dump(sample).data)


if __name__ == '__main__':
    app.run()
