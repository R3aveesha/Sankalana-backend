const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const bcrypt = require('bcryptjs');
const Admin = require('./models/Admin');

dotenv.config({ path: path.join(__dirname, '.env') });

async function setupAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: 'admin@sankalana.com' });

    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    // Create default admin
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const admin = new Admin({
      email: 'admin@sankalana.com',
      password: hashedPassword,
      name: 'Sankalana Admin',
      role: 'super_admin',
      isActive: true,
    });

    await admin.save();
    console.log('✓ Admin user created successfully');
    console.log('Email: admin@sankalana.com');
    console.log('Password: admin123');
    console.log('\n⚠️  Change these credentials after first login!');

    process.exit(0);
  } catch (error) {
    console.error('Error setting up admin:', error);
    process.exit(1);
  }
}

setupAdmin();
