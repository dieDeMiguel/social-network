-- -------------------------------------------------------------
-- TablePlus 3.12.8(368)
--
-- https://tableplus.com/
--
-- Database: social-network
-- Generation Time: 2021-05-22 16:13:19.8380
-- -------------------------------------------------------------


-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS friendships_id_seq;

-- Table Definition
CREATE TABLE "public"."friendships" (
    "id" int4 NOT NULL DEFAULT nextval('friendships_id_seq'::regclass),
    "sender_id" int4 NOT NULL,
    "recipient_id" int4 NOT NULL,
    "accepted" bool DEFAULT false,
    "created_at" timestamp NOT NULL DEFAULT now(),
    CONSTRAINT "friendships_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "public"."users"("id"),
    CONSTRAINT "friendships_recipient_id_fkey" FOREIGN KEY ("recipient_id") REFERENCES "public"."users"("id"),
    PRIMARY KEY ("id")
);

INSERT INTO "public"."friendships" ("id", "sender_id", "recipient_id", "accepted", "created_at") VALUES
(5, 151, 34, 't', '2021-04-18 21:11:27.817685'),
(6, 131, 34, 't', '2021-04-18 21:17:57.554645'),
(9, 201, 34, 't', '2021-04-19 17:15:19.543853'),
(11, 201, 3, 't', '2021-04-19 17:15:27.476239'),
(12, 3, 201, 't', '2021-04-19 17:15:37.436652'),
(17, 99, 201, 't', '2021-04-19 17:17:04.515047'),
(20, 206, 200, 'f', '2021-05-22 15:40:08.530772');
