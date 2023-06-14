ALTER TABLE bd_schema.appointment_form
ADD COLUMN hour_temp integer;

UPDATE bd_schema.appointment_form
SET hour_temp = CAST(hour AS integer);

ALTER TABLE bd_schema.appointment_form
DROP COLUMN hour;

ALTER TABLE bd_schema.appointment_form
RENAME COLUMN hour_temp TO hour;

ALTER TABLE bd_schema.appointment_form
ADD CONSTRAINT fk_hour
FOREIGN KEY (hour)
REFERENCES bd_schema.doctor_schedule(id)