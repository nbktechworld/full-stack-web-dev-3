-- Role: full_stack_user3
-- DROP ROLE IF EXISTS full_stack_user3;

CREATE ROLE full_stack_user3 WITH
  LOGIN
  NOSUPERUSER
  INHERIT
  NOCREATEDB
  NOCREATEROLE
  NOREPLICATION
  ENCRYPTED PASSWORD 'changeme';