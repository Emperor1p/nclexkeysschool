/**
 * Simple script to run admin setup using the API manager
 */

const { createOrUpdateAdmin, checkAdminExists, testAdminLogin } = require('./admin-api-manager');

async function runSetup() {
  try {
    console.log('🚀 NCLEX Keys Admin Setup');
    console.log('==========================');
    
    // Step 1: Check current status
    console.log('\n📊 Step 1: Checking current admin status...');
    await checkAdminExists();
    
    // Step 2: Create/update admin
    console.log('\n🔧 Step 2: Setting up admin user...');
    await createOrUpdateAdmin();
    
    // Step 3: Test login
    console.log('\n🧪 Step 3: Testing admin login...');
    await testAdminLogin();
    
    console.log('\n🎉 SUCCESS! Admin setup completed!');
    console.log('==================================');
    console.log('✅ Login credentials:');
    console.log('   Email: admin@nclexkeys.com');
    console.log('   Password: Admin2025');
    console.log('   Role: instructor');
    console.log('\n🌐 You can now login at: http://localhost:3000/login');
    
  } catch (error) {
    console.error('\n❌ Setup failed:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Make sure your .env.local file exists with correct Supabase keys');
    console.log('2. Check your internet connection');
    console.log('3. Verify your Supabase project is active');
    process.exit(1);
  }
}

// Run the setup
runSetup();
