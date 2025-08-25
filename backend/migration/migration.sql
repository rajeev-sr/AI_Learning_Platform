-- create table users
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username text UNIQUE NOT NULL,
  email text UNIQUE NOT NULL,
  password text NOT NULL
);

-- create table categories
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name text UNIQUE NOT NULL
);

-- create table questions
CREATE TABLE questions (
  id SERIAL PRIMARY KEY,
  category_id int REFERENCES categories(id) NOT NULL,
  topic text NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  sampleTestCase text NOT NULL,
  explanation text NOT NULL
);


