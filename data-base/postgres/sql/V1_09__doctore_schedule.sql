CREATE TABLE IF NOT EXISTS bd_schema.doctor_schedule (
    id SERIAL PRIMARY KEY,
    id_doctor text NOT NULL,
	schedule VARCHAR(255) NOT NULL,
    occupied bool
) TABLESPACE pg_default;