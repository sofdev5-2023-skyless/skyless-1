CREATE TABLE IF NOT EXISTS bd_schema.schedule (
    id_schedule TEXT PRIMARY KEY,
	schedule VARCHAR(255)
) TABLESPACE pg_default;