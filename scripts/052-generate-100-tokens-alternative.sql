-- Generate 100 Enrollment Tokens - Alternative Format
-- This script creates 100 enrollment tokens with different formats

-- Step 1: Clear existing tokens (optional - remove this if you want to keep existing ones)
-- DELETE FROM enrollment_tokens;

-- Step 2: Generate 100 tokens with format: TOKEN-XXXX
SELECT 'Step 2: Generating 100 tokens with TOKEN-XXXX format' as info;

INSERT INTO enrollment_tokens (token, program_id, is_used, created_at)
SELECT 
    'TOKEN-' || LPAD(ROW_NUMBER() OVER (ORDER BY generate_series)::text, 4, '0') as token,
    (SELECT id FROM programs LIMIT 1) as program_id,
    false as is_used,
    NOW() as created_at
FROM generate_series(1, 100);

-- Step 3: Generate 100 tokens with format: ENROLL-XXXX
SELECT 'Step 3: Generating 100 tokens with ENROLL-XXXX format' as info;

INSERT INTO enrollment_tokens (token, program_id, is_used, created_at)
SELECT 
    'ENROLL-' || LPAD(ROW_NUMBER() OVER (ORDER BY generate_series)::text, 4, '0') as token,
    (SELECT id FROM programs LIMIT 1) as program_id,
    false as is_used,
    NOW() as created_at
FROM generate_series(1, 100);

-- Step 4: Generate 100 tokens with format: KEY-XXXX
SELECT 'Step 4: Generating 100 tokens with KEY-XXXX format' as info;

INSERT INTO enrollment_tokens (token, program_id, is_used, created_at)
SELECT 
    'KEY-' || LPAD(ROW_NUMBER() OVER (ORDER BY generate_series)::text, 4, '0') as token,
    (SELECT id FROM programs LIMIT 1) as program_id,
    false as is_used,
    NOW() as created_at
FROM generate_series(1, 100);

-- Step 5: Show all tokens grouped by format
SELECT 'Step 5: All tokens grouped by format' as info;
SELECT 
    CASE 
        WHEN token LIKE 'TOKEN-%' THEN 'TOKEN Format'
        WHEN token LIKE 'ENROLL-%' THEN 'ENROLL Format'
        WHEN token LIKE 'KEY-%' THEN 'KEY Format'
        ELSE 'Other Format'
    END as token_format,
    COUNT(*) as count
FROM enrollment_tokens 
GROUP BY 
    CASE 
        WHEN token LIKE 'TOKEN-%' THEN 'TOKEN Format'
        WHEN token LIKE 'ENROLL-%' THEN 'ENROLL Format'
        WHEN token LIKE 'KEY-%' THEN 'KEY Format'
        ELSE 'Other Format'
    END;

-- Step 6: Show all tokens for copying
SELECT 'Step 6: All tokens (copy this list)' as info;
SELECT token FROM enrollment_tokens 
ORDER BY token;

