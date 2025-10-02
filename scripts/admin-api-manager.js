/**
 * Safe Admin API Manager
 * Uses Supabase Admin API with service role key to manage admin users
 * This is safer than direct database edits
 */

const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const supabaseUrl = 'https://bpyqsxwbxsfozdzustgy.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJweXFzeHdieHNmb3pdenVzdGd5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTI3OTU5NywiZXhwIjoyMDc0ODU1NTk3fQ.Ljs6egHOepdaxg8PxGTcPI7sprg20-RavNZULp37I6M';

// Create admin client with service role key
const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

/**
 * Check if admin user exists
 */
async function checkAdminExists() {
  try {
    console.log('🔍 Checking if admin user exists...');
    
    // Check in auth.users
    const { data: authUsers, error: authError } = await supabaseAdmin.auth.admin.listUsers();
    if (authError) throw authError;
    
    const adminAuthUser = authUsers.users.find(user => user.email === 'admin@nclexkeys.com');
    
    // Check in public.users
    const { data: publicUsers, error: publicError } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('email', 'admin@nclexkeys.com');
    
    if (publicError) throw publicError;
    
    console.log('📊 Admin Status:');
    console.log(`   Auth User: ${adminAuthUser ? '✅ EXISTS' : '❌ NOT FOUND'}`);
    console.log(`   Public User: ${publicUsers.length > 0 ? '✅ EXISTS' : '❌ NOT FOUND'}`);
    
    if (adminAuthUser) {
      console.log(`   Auth ID: ${adminAuthUser.id}`);
      console.log(`   Email Confirmed: ${adminAuthUser.email_confirmed_at ? '✅ YES' : '❌ NO'}`);
    }
    
    if (publicUsers.length > 0) {
      console.log(`   Public ID: ${publicUsers[0].id}`);
      console.log(`   Role: ${publicUsers[0].role}`);
    }
    
    return { adminAuthUser, publicUser: publicUsers[0] || null };
  } catch (error) {
    console.error('❌ Error checking admin:', error.message);
    throw error;
  }
}

/**
 * Create or update admin user
 */
async function createOrUpdateAdmin() {
  try {
    console.log('🔧 Creating/updating admin user...');
    
    const { adminAuthUser, publicUser } = await checkAdminExists();
    
    let authUserId;
    
    if (adminAuthUser) {
      // Update existing auth user
      console.log('🔄 Updating existing auth user...');
      const { data, error } = await supabaseAdmin.auth.admin.updateUserById(
        adminAuthUser.id,
        {
          password: 'Admin2025',
          email_confirm: true
        }
      );
      
      if (error) throw error;
      authUserId = data.user.id;
      console.log('✅ Auth user updated successfully');
    } else {
      // Create new auth user
      console.log('🆕 Creating new auth user...');
      const { data, error } = await supabaseAdmin.auth.admin.createUser({
        email: 'admin@nclexkeys.com',
        password: 'Admin2025',
        email_confirm: true,
        user_metadata: {
          full_name: 'NCLEX Keys Admin',
          role: 'instructor'
        }
      });
      
      if (error) throw error;
      authUserId = data.user.id;
      console.log('✅ Auth user created successfully');
    }
    
    // Handle public user
    if (publicUser) {
      // Update existing public user
      console.log('🔄 Updating existing public user...');
      const { error } = await supabaseAdmin
        .from('users')
        .update({
          id: authUserId,
          full_name: 'NCLEX Keys Admin',
          role: 'instructor',
          phone_number: '+234-000-0000',
          updated_at: new Date().toISOString()
        })
        .eq('email', 'admin@nclexkeys.com');
      
      if (error) throw error;
      console.log('✅ Public user updated successfully');
    } else {
      // Create new public user
      console.log('🆕 Creating new public user...');
      const { error } = await supabaseAdmin
        .from('users')
        .insert({
          id: authUserId,
          email: 'admin@nclexkeys.com',
          full_name: 'NCLEX Keys Admin',
          role: 'instructor',
          phone_number: '+234-000-0000',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });
      
      if (error) throw error;
      console.log('✅ Public user created successfully');
    }
    
    console.log('🎉 Admin user setup completed successfully!');
    console.log('📋 Login Credentials:');
    console.log('   Email: admin@nclexkeys.com');
    console.log('   Password: Admin2025');
    console.log('   Role: instructor');
    
    return { success: true, authUserId };
  } catch (error) {
    console.error('❌ Error creating/updating admin:', error.message);
    throw error;
  }
}

/**
 * Delete admin user (if needed)
 */
async function deleteAdmin() {
  try {
    console.log('🗑️ Deleting admin user...');
    
    const { adminAuthUser, publicUser } = await checkAdminExists();
    
    if (publicUser) {
      const { error: publicError } = await supabaseAdmin
        .from('users')
        .delete()
        .eq('email', 'admin@nclexkeys.com');
      
      if (publicError) throw publicError;
      console.log('✅ Public user deleted');
    }
    
    if (adminAuthUser) {
      const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(adminAuthUser.id);
      if (authError) throw authError;
      console.log('✅ Auth user deleted');
    }
    
    console.log('✅ Admin user deleted successfully');
    return { success: true };
  } catch (error) {
    console.error('❌ Error deleting admin:', error.message);
    throw error;
  }
}

/**
 * Test admin login
 */
async function testAdminLogin() {
  try {
    console.log('🧪 Testing admin login...');
    
    const { data, error } = await supabaseAdmin.auth.signInWithPassword({
      email: 'admin@nclexkeys.com',
      password: 'Admin2025'
    });
    
    if (error) throw error;
    
    console.log('✅ Admin login test successful!');
    console.log(`   User ID: ${data.user.id}`);
    console.log(`   Email: ${data.user.email}`);
    console.log(`   Role: ${data.user.user_metadata?.role || 'N/A'}`);
    
    return { success: true, user: data.user };
  } catch (error) {
    console.error('❌ Admin login test failed:', error.message);
    throw error;
  }
}

/**
 * Main function to run the admin setup
 */
async function main() {
  try {
    console.log('🚀 Starting Admin API Manager...');
    console.log('=====================================');
    
    // Check current status
    await checkAdminExists();
    
    console.log('\n🔧 Setting up admin user...');
    await createOrUpdateAdmin();
    
    console.log('\n🧪 Testing admin login...');
    await testAdminLogin();
    
    console.log('\n🎉 Admin setup completed successfully!');
    console.log('=====================================');
    console.log('✅ You can now login with:');
    console.log('   Email: admin@nclexkeys.com');
    console.log('   Password: Admin2025');
    
  } catch (error) {
    console.error('\n❌ Admin setup failed:', error.message);
    process.exit(1);
  }
}

// Export functions for use in other scripts
module.exports = {
  checkAdminExists,
  createOrUpdateAdmin,
  deleteAdmin,
  testAdminLogin,
  main
};

// Run if called directly
if (require.main === module) {
  main();
}
