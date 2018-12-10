from flask import Flask, render_template, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.automap import automap_base
from flask_marshmallow import Marshmallow
from flask_cors import CORS, cross_origin


app = Flask(__name__, static_folder='../static/dist', template_folder='../static')

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://postgres:pass@localhost:5432/test'
db = SQLAlchemy(app)

# FIXME
CORS(app)

# reflection

db.Model = automap_base(db.Model)

db.Model.prepare(db.engine, reflect=True)

Food = db.Model.classes['food']
Vintages = db.Model.classes['vintages']

ma = Marshmallow(app)


class FoodSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'seo_name', 'img')


food_schema = FoodSchema()
foods_schema = FoodSchema(many=True)


class VintageSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'seo_name', 'year', 'wine_id', 'img')


vintage_schema = VintageSchema()
vintages_schema = VintageSchema(many=True)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/api/list_food', methods=["GET"])
def list_food():
    sample = db.session.query(Food).all()
    return jsonify(foods_schema.dump(sample).data)


@app.route('/api/list_vintages', methods=["GET"])
def list_vintages():
    sample = db.session.query(Vintages).all()
    return jsonify(vintages_schema.dump(sample).data)


if __name__ == '__main__':
    app.run()