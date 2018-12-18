from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy, get_debug_queries
from sqlalchemy.ext.automap import automap_base
from sqlalchemy import func
from flask_cors import CORS
from flask_marshmallow import Marshmallow
from sqlalchemy.sql import select
from sqlalchemy.sql.expression import literal

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
Users = Base.classes['users']

ma = Marshmallow(app)


class UserSchema(ma.Schema):
    class Meta:
        fields = ('id', 'pass', 'alias', 'img')


class MockFoodSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'seo_name', 'img')


class MockGrapeSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'seo_name')


class StyleSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'food_collection', 'grapes_collection')

    food_collection = ma.Nested(MockFoodSchema, many=True)
    grapes_collection = ma.Nested(MockGrapeSchema, many=True)


class ReviewSchema(ma.Schema):
    class Meta:
        fields = ('id', 'user_id', 'vintage_id', 'note', 'rating', 'users')

    users = ma.Nested(UserSchema)


class WineSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'seo_name', 'style', 'region_id', 'winery_id', 'styles')

    styles = ma.Nested(StyleSchema)


class VintagesSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'seo_name', 'year', 'wine_id', 'img', 'wines', 'ratings_count', 'ratings_sum', 'price')

    wines = ma.Nested(WineSchema)


class VintageSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'seo_name', 'year', 'wine_id', 'img', 'wines', 'ratings_count', 'ratings_sum', 'price',
                  'reviews_collection')

    reviews_collection = ma.Nested(ReviewSchema, many=True)
    wines = ma.Nested(WineSchema)


class FoodSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'seo_name', 'img')


class GrapeSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'seo_name', 'styles_collection')

    styles_collection = ma.Nested(StyleSchema, many=True)


@app.route('/api/list_regions', methods=['GET', 'POST'])
def list_regions():
    sample = db.session.query(Regions).all()
    return jsonify(FoodSchema(many=True).dump(sample).data)


@app.route('/api/list_wines', methods=['GET', 'POST'])
def list_wines():
    sample = db.session.query(Wines).all()
    return jsonify(WineSchema(many=True).dump(sample).data)


@app.route('/api/vintage/<vintage_id>', methods=['GET'])
def get_vintage(vintage_id):
    vintage = db.session.query(Vintages).filter(Vintages.id == vintage_id).first()
    return jsonify(VintageSchema().dump(vintage).data)


@app.route('/api/gv/<grapes_id>', methods=['GET'])
def food_filter(grapes_id):
    sample = (
        db.session.query(Vintages)
            .join(Wines)
            .join(Styles)
            .filter(Styles.grapes_collection.any(Grapes.id == grapes_id))
            .all()
    )
    return jsonify(VintagesSchema(many=True).dump(sample).data)


@app.route('/api/st/<st_id>', methods=['GET'])
def st_filter(st_id):
    sample = (
        db.session.query(Vintages)
            .join(Wines)
            .filter(Wines.style == st_id)
            .all()
    )
    return jsonify(VintagesSchema(many=True).dump(sample).data)


@app.route('/api/fd/<food_id>', methods=['GET'])
def grapes_filter(food_id):
    sample = (
        db.session.query(Vintages)
            .join(Wines)
            .join(Styles)
            .filter(Styles.food_collection.any(Food.id == food_id))
            .all()
    )
    return jsonify(VintagesSchema(many=True).dump(sample).data)


@app.route('/api/register', methods=['GET', 'POST'])
def register():
    insert_user = Users.__table__.insert().from_select(
        ['id', 'pass', 'alias'],
        select(
            [func.max(Users.id) + 1] + [literal(request.json.get('pass')), literal(request.json.get('username'))]
        )
    )
    db.session.execute(insert_user)
    db.session.commit()
    return 'OK'


@app.route('/api/wn/<wine_id>', methods=['GET'])
def wine_filter(wine_id):
    sample = (
        db.session.query(Vintages)
            .filter(Vintages.wine_id == wine_id)
            .all()
    )
    return jsonify(VintagesSchema(many=True).dump(sample).data)


@app.route('/api/list_food', methods=['GET', 'POST'])
def list_food():
    sample = db.session.query(Food).all()
    return jsonify(FoodSchema(many=True).dump(sample).data)


@app.route('/api/list_styles', methods=['GET', 'POST'])
def list_styles():
    sample = db.session.query(Styles).all()
    return jsonify(StyleSchema(many=True).dump(sample).data)


@app.route('/api/list_grapes', methods=['GET', 'POST'])
def list_grapes():
    sample = db.session.query(Grapes).all()
    return jsonify(MockGrapeSchema(many=True).dump(sample).data)


@app.route('/api/list_vintages', methods=['GET', 'POST'])
def list_vintages():
    filters = []

    substring = request.json.get('nameFilter', '').lower()
    wine_types = [int(k) for k, v in request.json.get('wine_types', {}).items() if v]
    min_rating = float(request.json.get('min_rating', 0))
    min_price = float(request.json.get('price_from', 0))
    max_price = float(request.json.get('price_to', 9999999))
    sort_type = int(request.json.get('sort_by'))

    if wine_types:
        filters.append(
            db.session.query(Vintages)
                .join(Wines)
                .filter(Wines.type_id.in_(wine_types))
        )
    if min_rating:
        filters.append(
            db.session.query(Vintages)
                .filter(Vintages.ratings_count > 0)
                .filter(Vintages.ratings_sum / Vintages.ratings_count > min_rating)
        )

    if substring:
        filters.append(
            db.session.query(Vintages)
                .filter(func.lower(Vintages.name).contains(substring))
        )

    filters.append(
        db.session.query(Vintages)
            .filter(Vintages.price.between(min_price, max_price))
    )

    query = db.session.query(Vintages).intersect(*filters)

    if sort_type == 1:
        query = query.order_by(Vintages.price.asc())
    elif sort_type == 2:
        query = query.order_by(Vintages.price.desc())
    elif sort_type == 3:
        query = query.filter(Vintages.ratings_count > 0).order_by((Vintages.ratings_sum / Vintages.ratings_count).asc())
    elif sort_type == 4:
        query = query.filter(Vintages.ratings_count > 0).order_by(
            (Vintages.ratings_sum / Vintages.ratings_count).desc())
    elif sort_type == 5:
        query = query.order_by(Vintages.ratings_count.asc())
    elif sort_type == 6:
        query = query.order_by(Vintages.ratings_count.desc())

    return jsonify(VintagesSchema(many=True).dump(query.all()).data)


if __name__ == '__main__':
    app.run()
