-- 1. Add owner_id and industry to shops table
ALTER TABLE shops ADD COLUMN IF NOT EXISTS owner_id TEXT;
ALTER TABLE shops ADD COLUMN IF NOT EXISTS industry TEXT DEFAULT 'salon';

-- 2. Update RLS for shops
DROP POLICY IF EXISTS "Allow authenticated full access to shops" ON shops;
CREATE POLICY "Allow public full access to shops" ON shops 
FOR ALL TO public 
USING (true) 
WITH CHECK (true);

-- 3. Update RLS for services
DROP POLICY IF EXISTS "Allow authenticated full access to services" ON services;
CREATE POLICY "Allow public full access to services" ON services 
FOR ALL TO public 
USING (true) 
WITH CHECK (true);

-- 4. Update RLS for bookings (SECURITY FIX)
DROP POLICY IF EXISTS "Allow public full access to bookings" ON bookings;
DROP POLICY IF EXISTS "Allow authenticated full access to bookings" ON bookings;

-- Public can ONLY insert (e.g. from the public booking page)
CREATE POLICY "Allow public insert to bookings" ON bookings 
FOR INSERT TO public 
WITH CHECK (true);

-- Authenticated can view and update (Dashboard access)
CREATE POLICY "Allow authenticated full access to bookings" ON bookings 
FOR ALL TO authenticated 
USING (true) 
WITH CHECK (true);
