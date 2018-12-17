CREATE SCHEMA "public";

CREATE TABLE countries ( 
	code                 text  NOT NULL ,
	name                 text   ,
	CONSTRAINT pk_countries_code PRIMARY KEY ( code )
 );

CREATE TABLE food ( 
	id                   integer  NOT NULL ,
	name                 text  NOT NULL ,
	seo_name             text   ,
	img                  text   ,
	CONSTRAINT pk_food_id PRIMARY KEY ( id )
 );

CREATE TABLE grapes ( 
	id                   integer  NOT NULL ,
	name                 text   ,
	seo_name             text   ,
	CONSTRAINT pk_grapes_id PRIMARY KEY ( id )
 );

CREATE TABLE regions ( 
	id                   integer  NOT NULL ,
	name                 text   ,
	seo_name             text   ,
	country_code         text   ,
	CONSTRAINT pk_regions_id PRIMARY KEY ( id ),
	CONSTRAINT regions_fk0 FOREIGN KEY ( country_code ) REFERENCES countries( code ) ON DELETE SET NULL ON UPDATE CASCADE
 );

CREATE TABLE styles ( 
	id                   integer  NOT NULL ,
	name                 text   ,
	CONSTRAINT pk_styles_id PRIMARY KEY ( id )
 );

CREATE TABLE users ( 
	id                   integer  NOT NULL ,
	pass                 text  NOT NULL ,
	"alias"              text  NOT NULL ,
	img                  text   ,
	CONSTRAINT pk_users_id PRIMARY KEY ( id )
 );

CREATE TABLE wineries ( 
	id                   integer  NOT NULL ,
	name                 text   ,
	seo_name             text   ,
	CONSTRAINT pk_wineries_id PRIMARY KEY ( id )
 );

CREATE TABLE wines ( 
	id                   integer  NOT NULL ,
	name                 text   ,
	seo_name             text   ,
	"style"              integer   ,
	region_id            integer   ,
	winery_id            integer   ,
	type_id              integer  NOT NULL ,
	ratings_sum          float8 DEFAULT 0  ,
	ratings_count        float8 DEFAULT 0  ,
	CONSTRAINT pk_wines_id PRIMARY KEY ( id ),
	CONSTRAINT wines_fk0 FOREIGN KEY ( "style" ) REFERENCES styles( id ) ON DELETE SET NULL ON UPDATE CASCADE,
	CONSTRAINT wines_fk1 FOREIGN KEY ( region_id ) REFERENCES regions( id ) ON DELETE SET NULL ON UPDATE CASCADE,
	CONSTRAINT wines_fk2 FOREIGN KEY ( winery_id ) REFERENCES wineries( id ) ON DELETE SET NULL ON UPDATE CASCADE
 );

CREATE TABLE style_food_pairings ( 
	style_id             integer  NOT NULL ,
	food_id              integer  NOT NULL ,
	CONSTRAINT _1 PRIMARY KEY ( style_id, food_id ),
	CONSTRAINT style_food_pairings_fk0 FOREIGN KEY ( style_id ) REFERENCES styles( id ) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT style_food_pairings_fk1 FOREIGN KEY ( food_id ) REFERENCES food( id ) ON DELETE CASCADE ON UPDATE CASCADE
 );

CREATE TABLE style_grapes_pairings ( 
	style_id             integer  NOT NULL ,
	grape_id             integer  NOT NULL ,
	CONSTRAINT _0 PRIMARY KEY ( style_id, grape_id ),
	CONSTRAINT style_grapes_pairings_fk0 FOREIGN KEY ( style_id ) REFERENCES styles( id ) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT style_grapes_pairings_fk1 FOREIGN KEY ( grape_id ) REFERENCES grapes( id ) ON DELETE CASCADE ON UPDATE CASCADE
 );

CREATE TABLE vintages ( 
	id                   integer  NOT NULL ,
	name                 text   ,
	seo_name             text   ,
	"year"               text   ,
	wine_id              integer   ,
	img                  text   ,
	price                float8   ,
	ratings_sum          float8 DEFAULT 0  ,
	ratings_count        float8 DEFAULT 0  ,
	CONSTRAINT pk_vintages_id PRIMARY KEY ( id ),
	CONSTRAINT vintages_fk0 FOREIGN KEY ( wine_id ) REFERENCES wines( id ) ON DELETE SET NULL ON UPDATE CASCADE
 );

CREATE TABLE reviews ( 
	id                   integer  NOT NULL ,
	user_id              integer  NOT NULL ,
	vintage_id           integer  NOT NULL ,
	note                 text  NOT NULL ,
	rating               float8  NOT NULL ,
	CONSTRAINT pk_reviews_id PRIMARY KEY ( id ),
	CONSTRAINT reviews_fk0 FOREIGN KEY ( user_id ) REFERENCES users( id ) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT reviews_fk1 FOREIGN KEY ( vintage_id ) REFERENCES vintages( id ) ON DELETE CASCADE ON UPDATE CASCADE
 );

CREATE OR REPLACE FUNCTION public.inc_rev_f()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
	UPDATE vintages SET ratings_count = ratings_count + 1, ratings_sum = ratings_sum + NEW.rating WHERE vintages.id = NEW.vintage_id;
	UPDATE wines SET ratings_count = ratings_count + 1, ratings_sum = ratings_sum + NEW.rating WHERE wines.id = (SELECT vintages.wine_id FROM vintages WHERE vintages.id = NEW.vintage_id LIMIT 1);
	RETURN NULL;
END;
$function$;

CREATE TRIGGER inc_rev AFTER INSERT ON reviews
                FOR EACH ROW EXECUTE PROCEDURE inc_rev_f();

CREATE OR REPLACE FUNCTION public.dec_rev_f()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
	UPDATE vintages SET ratings_count = ratings_count - 1, ratings_sum = ratings_sum - OLD.rating WHERE vintages.id = OLD.vintage_id;
	UPDATE wines SET ratings_count = ratings_count - 1, ratings_sum = ratings_sum - OLD.rating WHERE wines.id = (SELECT vintages.wine_id FROM vintages WHERE vintages.id = OLD.vintage_id LIMIT 1);
	RETURN NULL;
END;
$function$;

CREATE TRIGGER dec_rev BEFORE DELETE ON reviews
                FOR EACH ROW EXECUTE PROCEDURE dec_rev_f();

