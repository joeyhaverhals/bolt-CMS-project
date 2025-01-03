-- Create blogs table
CREATE TABLE blogs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author TEXT NOT NULL,
  publish_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  featured_image_url TEXT
);

-- Create testimonials table
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  testimonial_text TEXT NOT NULL,
  rating INT CHECK (rating BETWEEN 1 AND 5),
  date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create faqs table
CREATE TABLE faqs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT NOT NULL
);

-- Create services table
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  pricing JSONB
);

-- Enable Row Level Security
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- Create policies for admin access
CREATE POLICY "Admin access to blogs" ON blogs
  FOR ALL
  TO authenticated
  USING (auth.role() = 'admin');

CREATE POLICY "Admin access to testimonials" ON testimonials
  FOR ALL
  TO authenticated
  USING (auth.role() = 'admin');

CREATE POLICY "Admin access to faqs" ON faqs
  FOR ALL
  TO authenticated
  USING (auth.role() = 'admin');

CREATE POLICY "Admin access to services" ON services
  FOR ALL
  TO authenticated
  USING (auth.role() = 'admin');
