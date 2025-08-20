DROP TABLE IF EXISTS files;
DROP TABLE IF EXISTS folders;

CREATE TABLE folders(
  id serial primary key,
  name text not null unique
);

CREATE TABLE files(
  id serial primary key,
  name text not null,
  size int not null,
  folder_id int not null,
  FOREIGN KEY (folder_id) REFERENCES folders(id) ON DELETE CASCADE,
  UNIQUE (name, folder_id)
);