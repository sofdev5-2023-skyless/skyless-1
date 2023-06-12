CREATE TABLE IF NOT EXISTS bd_schema.doctor_schedule (
    id int PRIMARY KEY,
    id_doctor text NOT NULL,
	schedule VARCHAR(255)
) TABLESPACE pg_default;