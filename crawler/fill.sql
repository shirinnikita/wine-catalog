COPY food FROM '/home/nikita/wine-catalog/crawler/food.csv' DELIMITER '#' CSV;
COPY grapes FROM '/home/nikita/wine-catalog/crawler/grapes.csv' DELIMITER '#' CSV;
COPY styles FROM '/home/nikita/wine-catalog/crawler/styles.csv' DELIMITER '#' CSV;
COPY wineries FROM '/home/nikita/wine-catalog/crawler/wineries.csv' DELIMITER '#' CSV;
COPY countries FROM '/home/nikita/wine-catalog/crawler/countries.csv' DELIMITER '#' CSV;
COPY regions FROM '/home/nikita/wine-catalog/crawler/regions.csv' DELIMITER '#' CSV;
COPY style_grapes_pairings FROM '/home/nikita/wine-catalog/crawler/style_grapes_pairings.csv' DELIMITER '#' CSV;
COPY style_food_pairings FROM '/home/nikita/wine-catalog/crawler/style_food_pairings.csv' DELIMITER '#' CSV;
COPY wines FROM '/home/nikita/wine-catalog/crawler/wines.csv' DELIMITER '#' CSV;
COPY vintages FROM '/home/nikita/wine-catalog/crawler/vintages.csv' DELIMITER '#' CSV;
COPY users FROM '/home/nikita/wine-catalog/crawler/users.csv' DELIMITER '#' CSV;
COPY reviews FROM '/home/nikita/wine-catalog/crawler/reviews.csv' DELIMITER '#' CSV;