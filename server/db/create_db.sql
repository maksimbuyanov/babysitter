CREATE
DATABASE IF NOT EXISTS babysitterdb;

USE
babysitterdb;

CREATE TABLE sleeps
(
    id         BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    value      VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE temperatures
(
    time        TIMESTAMP NOT NULL COMMENT 'timestamp',
    temperature TINYINT unsigned NOT NULL COMMENT 'degrees Celsius',
    PRIMARY KEY (time)
);

CREATE TABLE humidity
(
    time     TIMESTAMP NOT NULL COMMENT 'timestamp',
    humidity TINYINT unsigned NOT NULL COMMENT 'percent',
    PRIMARY KEY (time)
)
