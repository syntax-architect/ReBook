-- 1. Drop ALL existing policies that depend on owner_id first
DROP POLICY IF EXISTS "Allow authenticated full access to shops" ON shops;
DROP POLICY IF EXISTS "Allow public full access to shops" ON shops;
DROP POLICY IF EXISTS "Owners can manage their shop" ON shops;
DROP POLICY IF EXISTS "Public can view shops" ON shops;

DROP POLICY IF EXISTS "Allow authenticated full access to services" ON services;
DROP POLICY IF EXISTS "Allow public full access to services" ON services;
DROP POLICY IF EXISTS "Public can view active services" ON services;
DROP POLICY IF EXISTS "Owners can manage services" ON services;

DROP POLICY IF EXISTS "Allow public full access to bookings" ON bookings;
DROP POLICY IF EXISTS "Allow authenticated full access to bookings" ON bookings;
DROP POLICY IF EXISTS "Allow public insert to bookings" ON bookings;
DROP POLICY IF EXISTS "Owners can manage bookings" ON bookings;

-- 2. Alter owner_id to TEXT (to support Clerk's string IDs instead of Supabase UUIDs)
ALTER TABLE shops DROP CONSTRAINT IF EXISTS shops_owner_id_fkey;
ALTER TABLE shops ALTER COLUMN owner_id TYPE TEXT USING owner_id::text;
ALTER TABLE shops ADD COLUMN IF NOT EXISTS industry TEXT DEFAULT 'salon';
ALTER TABLE shops ADD COLUMN IF NOT EXISTS working_hours JSONB DEFAULT '{"monday": {"open": "09:00", "close": "18:00", "is_closed": false}, "tuesday": {"open": "09:00", "close": "18:00", "is_closed": false}, "wednesday": {"open": "09:00", "close": "18:00", "is_closed": false}, "thursday": {"open": "09:00", "close": "18:00", "is_closed": false}, "friday": {"open": "09:00", "close": "18:00", "is_closed": false}, "saturday": {"open": "10:00", "close": "16:00", "is_closed": false}, "sunday": {"open": "09:00", "close": "18:00", "is_closed": true}}'::jsonb;
ALTER TABLE shops ADD COLUMN IF NOT EXISTS subscription_status TEXT DEFAULT 'trialing' CHECK (subscription_status IN ('trialing', 'active', 'past_due', 'cancelled'));
ALTER TABLE shops ADD COLUMN IF NOT EXISTS trial_ends_at TIMESTAMPTZ;
ALTER TABLE shops ADD COLUMN IF NOT EXISTS razorpay_subscription_id TEXT UNIQUE;

-- 3. Update RLS for shops
CREATE POLICY "Public can view shops" ON shops 
FOR SELECT TO public 
USING (true);

CREATE POLICY "Owners can manage their shop" ON shops 
FOR ALL TO authenticated 
USING (owner_id = (auth.jwt()->>'sub')) 
WITH CHECK (owner_id = (auth.jwt()->>'sub'));

-- 4. Update RLS for services

CREATE POLICY "Public can view active services" ON services 
FOR SELECT TO public 
USING (is_active = true);

CREATE POLICY "Owners can manage services" ON services 
FOR ALL TO authenticated 
USING (shop_id IN (SELECT id FROM shops WHERE owner_id = (auth.jwt()->>'sub')));

-- 5. Update RLS for bookings (SECURITY FIX)

-- Public can ONLY insert (e.g. from the public booking page)
CREATE POLICY "Allow public insert to bookings" ON bookings 
FOR INSERT TO public 
WITH CHECK (true);

-- Authenticated can view and update (Dashboard access)
CREATE POLICY "Owners can manage bookings" ON bookings 
FOR ALL TO authenticated 
USING (shop_id IN (SELECT id FROM shops WHERE owner_id = (auth.jwt()->>'sub')));
