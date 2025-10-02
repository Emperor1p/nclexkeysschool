-- Query to view all enrollment tokens
-- Run this anytime you want to see available tokens to give to students

SELECT 
  et.token as "Enrollment Token",
  p.name as "Program Name",
  p.price as "Price",
  CASE 
    WHEN et.is_used THEN 'Used ✓'
    ELSE 'Available ✓'
  END as "Status",
  et.used_at as "Used Date"
FROM enrollment_tokens et
JOIN programs p ON et.program_id = p.id
ORDER BY p.name, et.is_used, et.token;
