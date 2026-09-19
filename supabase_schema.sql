-- Create Enum for Booking Status
CREATE TYPE booking_status AS ENUM ('new', 'confirmed', 'reminded', 'completed', 'no_show', 'cancelled');

-- 1. Shops Table
CREATE TABLE shops (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    city TEXT,
    phone TEXT,
    automation_enabled BOOLEAN DEFAULT false,
    subscription_status TEXT DEFAULT 'trialing',
    razorpay_subscription_id TEXT UNIQUE,
    working_hours JSONB DEFAULT '{"monday": {"open": "09:00", "close": "18:00", "is_closed": false}, "tuesday": {"open": "09:00", "close": "18:00", "is_closed": false}, "wednesday": {"open": "09:00", "close": "18:00", "is_closed": false}, "thursday": {"open": "09:00", "close": "18:00", "is_closed": false}, "friday": {"open": "09:00", "close": "18:00", "is_closed": false}, "saturday": {"open": "10:00", "close": "16:00", "is_closed": false}, "sunday": {"open": "09:00", "close": "18:00", "is_closed": true}}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Services Table
CREATE TABLE services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    shop_id UUID NOT NULL REFERENCES shops(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    duration_minutes INT NOT NULL,
    price INT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Bookings Table
CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    shop_id UUID NOT NULL REFERENCES shops(id) ON DELETE CASCADE,
    service_id UUID NOT NULL REFERENCES services(id) ON DELETE RESTRICT,
    customer_name TEXT NOT NULL,
    customer_phone TEXT,
    scheduled_at TIMESTAMPTZ NOT NULL,
    status booking_status DEFAULT 'new',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE shops ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Simple MVP Policies (Allow read access to public, allow all for authenticated)
CREATE POLICY "Allow public read access to shops" ON shops FOR SELECT USING (true);
CREATE POLICY "Allow public read access to services" ON services FOR SELECT USING (true);
CREATE POLICY "Allow public insert to bookings" ON bookings FOR INSERT WITH CHECK (true);

-- Authenticated Users full access
CREATE POLICY "Allow authenticated full access to shops" ON shops FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated full access to services" ON services FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated full access to bookings" ON bookings FOR ALL TO authenticated USING (true) WITH CHECK (true);
