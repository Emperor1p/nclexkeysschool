-- Updated programs to match new regional pricing structure
-- Insert programs with regional pricing
INSERT INTO programs (name, description, price, duration, features) VALUES
(
  'Nigeria - Standard',
  'NCLEX preparation program for Nigerian students with comprehensive study materials and support.',
  30000.00,
  '1 month',
  ARRAY['Video Lectures', 'Practice Questions', 'Study Materials', 'WhatsApp Support', 'Telegram Community']
),
(
  'African - Standard',
  'NCLEX preparation program for African students with comprehensive study materials and support.',
  35000.00,
  '1 month',
  ARRAY['Video Lectures', 'Practice Questions', 'Study Materials', 'WhatsApp Support', 'Telegram Community']
),
(
  'USA/Canada - Standard',
  'NCLEX preparation program for USA/Canada students with comprehensive study materials and support.',
  60.00,
  '1 month',
  ARRAY['Video Lectures', 'Practice Questions', 'Study Materials', 'WhatsApp Support', 'Telegram Community']
),
(
  'Europe - Standard',
  'NCLEX preparation program for European students with comprehensive study materials and support.',
  35.00,
  '1 month',
  ARRAY['Video Lectures', 'Practice Questions', 'Study Materials', 'WhatsApp Support', 'Telegram Community']
),
(
  'Nigeria - One on One Push',
  'Premium NCLEX program for Nigerian students with personalized one-on-one coaching and intensive support.',
  60000.00,
  '1 month',
  ARRAY['One-on-One Coaching', 'Video Lectures', 'Practice Questions', 'Study Materials', 'Priority WhatsApp Support', 'Telegram Community', 'Personalized Study Plan']
),
(
  'African - One on One Push',
  'Premium NCLEX program for African students with personalized one-on-one coaching and intensive support.',
  65000.00,
  '1 month',
  ARRAY['One-on-One Coaching', 'Video Lectures', 'Practice Questions', 'Study Materials', 'Priority WhatsApp Support', 'Telegram Community', 'Personalized Study Plan']
),
(
  'USA/Canada - One on One Push',
  'Premium NCLEX program for USA/Canada students with personalized one-on-one coaching and intensive support.',
  100.00,
  '1 month',
  ARRAY['One-on-One Coaching', 'Video Lectures', 'Practice Questions', 'Study Materials', 'Priority WhatsApp Support', 'Telegram Community', 'Personalized Study Plan']
),
(
  'Europe - One on One Push',
  'Premium NCLEX program for European students with personalized one-on-one coaching and intensive support.',
  50.00,
  '1 month',
  ARRAY['One-on-One Coaching', 'Video Lectures', 'Practice Questions', 'Study Materials', 'Priority WhatsApp Support', 'Telegram Community', 'Personalized Study Plan']
);

-- Generate 5 pre-made tokens for each program (40 tokens total)
-- These tokens are ready to be distributed to students immediately
INSERT INTO enrollment_tokens (token, program_id) 
SELECT 
  'NCLEX2025-' || upper(substr(md5(random()::text || generate_series), 1, 6)),
  id
FROM programs
CROSS JOIN generate_series(1, 5);

-- View all available tokens (run this query separately to see your tokens)
-- SELECT 
--   et.token,
--   p.name as program_name,
--   p.price,
--   et.is_used,
--   et.used_by,
--   et.used_at
-- FROM enrollment_tokens et
-- JOIN programs p ON et.program_id = p.id
-- ORDER BY p.name, et.token;
