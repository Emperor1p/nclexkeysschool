-- Run this script whenever you need to generate more tokens
-- This creates 5 new tokens for each program

INSERT INTO enrollment_tokens (token, program_id) 
SELECT 
  'NCLEX2025-' || upper(substr(md5(random()::text || generate_series), 1, 6)),
  id
FROM programs
CROSS JOIN generate_series(1, 5);

-- After running, use script 003 to view all tokens
