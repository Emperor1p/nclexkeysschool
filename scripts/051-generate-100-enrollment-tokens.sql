-- Generate 100 Enrollment Tokens
-- This script creates 100 enrollment tokens for easy distribution

-- Step 1: Check existing tokens
SELECT 'Step 1: Checking existing tokens' as info;
SELECT COUNT(*) as existing_tokens FROM enrollment_tokens;

-- Step 2: Generate 100 new enrollment tokens
SELECT 'Step 2: Generating 100 enrollment tokens' as info;

-- Insert 100 enrollment tokens
INSERT INTO enrollment_tokens (token, program_id, is_used, created_at)
SELECT 
    'NCLEX2025-' || LPAD(ROW_NUMBER() OVER (ORDER BY generate_series)::text, 4, '0') as token,
    (SELECT id FROM programs LIMIT 1) as program_id,  -- Use first available program
    false as is_used,
    NOW() as created_at
FROM generate_series(1, 100);

-- Step 3: Verify the tokens were created
SELECT 'Step 3: Verification' as info;
SELECT 
    COUNT(*) as total_tokens,
    COUNT(CASE WHEN is_used = false THEN 1 END) as unused_tokens,
    COUNT(CASE WHEN is_used = true THEN 1 END) as used_tokens
FROM enrollment_tokens;

-- Step 4: Show first 10 tokens as preview
SELECT 'Step 4: Preview of first 10 tokens' as info;
SELECT token, is_used, created_at 
FROM enrollment_tokens 
ORDER BY created_at DESC 
LIMIT 10;

-- Step 5: Show all tokens (for copying)
SELECT 'Step 5: All tokens (copy this list)' as info;
SELECT token FROM enrollment_tokens 
WHERE token LIKE 'NCLEX2025-%'
ORDER BY token;

