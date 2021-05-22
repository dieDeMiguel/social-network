-- -------------------------------------------------------------
-- TablePlus 3.12.8(368)
--
-- https://tableplus.com/
--
-- Database: social-network
-- Generation Time: 2021-05-22 16:13:40.1080
-- -------------------------------------------------------------


-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS password_reset_codes_id_seq;

-- Table Definition
CREATE TABLE "public"."password_reset_codes" (
    "id" int4 NOT NULL DEFAULT nextval('password_reset_codes_id_seq'::regclass),
    "code" varchar(6) NOT NULL,
    "email" varchar(50) NOT NULL,
    "created_at" timestamp NOT NULL DEFAULT now(),
    PRIMARY KEY ("id")
);

INSERT INTO "public"."password_reset_codes" ("id", "code", "email", "created_at") VALUES
(1, 'da8f1a', 'diedemiguel@gmail.com', '2021-04-19 17:10:31.996434'),
(2, 'afe448', 'diedemiguel@gmail.com', '2021-05-20 13:22:55.531821'),
(3, '81738d', 'diedemiguel@gmail.com', '2021-05-20 13:28:08.962368'),
(4, '5c7759', 'diedemiguel@gmail.com', '2021-05-20 13:29:21.589539'),
(5, '662c92', 'diedemiguel@gmail.com', '2021-05-20 13:30:49.030615'),
(6, 'b887e4', 'diedemiguel@gmail.com', '2021-05-20 13:31:31.603083');
