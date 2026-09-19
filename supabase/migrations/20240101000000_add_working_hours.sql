ALTER TABLE shops 
ADD COLUMN IF NOT EXISTS working_hours JSONB DEFAULT '{
  "monday": {"open": "09:00", "close": "18:00", "is_closed": false},
  "tuesday": {"open": "09:00", "close": "18:00", "is_closed": false},
  "wednesday": {"open": "09:00", "close": "18:00", "is_closed": false},
  "thursday": {"open": "09:00", "close": "18:00", "is_closed": false},
  "friday": {"open": "09:00", "close": "18:00", "is_closed": false},
  "saturday": {"open": "10:00", "close": "16:00", "is_closed": false},
  "sunday": {"open": "09:00", "close": "18:00", "is_closed": true}
}'::jsonb;
