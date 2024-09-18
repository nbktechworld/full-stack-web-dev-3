-- Table: public.messages

-- DROP TABLE IF EXISTS public.messages;

CREATE TABLE IF NOT EXISTS public.messages
(
    id bigint NOT NULL DEFAULT nextval('messages_id_seq'::regclass),
    body character varying(255) COLLATE pg_catalog."default" NOT NULL,
    user_id bigint NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    CONSTRAINT messages_pkey PRIMARY KEY (id),
    CONSTRAINT messages_user_id_fk FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.messages
    OWNER to full_stack_user3;
-- Index: fki_messages_user_id_fk

-- DROP INDEX IF EXISTS public.fki_messages_user_id_fk;

CREATE INDEX IF NOT EXISTS fki_messages_user_id_fk
    ON public.messages USING btree
    (user_id ASC NULLS LAST)
    TABLESPACE pg_default;