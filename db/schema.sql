DROP TABLE IF EXISTS filez;
DROP TABLE IF EXISTS folders;

CREATE TABLE folders(
  id serial primary key,
  name text not null unique
)

CREATE TABLE files(
  id serial primary key,
  name text not null,
  size int not null,
  folder_id int references folders(id) ON DELETE CASCADE,
  UNIQUE (name, folder_id)
);