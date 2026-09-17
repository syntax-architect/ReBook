-- Rebook SaaS Optimization Indexes

-- 1. Index for foreign key lookups in the services table
-- Almost all queries for services will filter by shop_id (e.g. public booking page)
CREATE INDEX IF NOT EXISTS idx_services_shop_id ON services(shop_id);

-- 2. Index for foreign key lookups in the bookings table
-- The dashboard timeline will always filter by shop_id
CREATE INDEX IF NOT EXISTS idx_bookings_shop_id ON bookings(shop_id);

-- 3. Index for booking status
-- Dashboard queries often filter out 'completed' or 'cancelled'
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);

-- 4. Index for booking dates
-- Queries to fetch "Today's" or "Upcoming" bookings require range queries on scheduled_at
CREATE INDEX IF NOT EXISTS idx_bookings_scheduled_at ON bookings(scheduled_at);
