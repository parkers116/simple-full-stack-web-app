CREATE EXTENSION "uuid-ossp";

CREATE TABLE public.todo_list (
	id uuid DEFAULT uuid_generate_v4 (),
	item_name VARCHAR NOT NULL,
	item_desc VARCHAR,
	date_created VARCHAR NOT NULL,
	PRIMARY KEY (id)
);