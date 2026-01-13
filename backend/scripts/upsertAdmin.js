const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const email = process.env.ADMIN_EMAIL || process.argv[2];
const password = process.env.ADMIN_PASSWORD || process.argv[3];
const name = process.env.ADMIN_NAME || process.argv[4] || 'Admin User';
const role = process.env.ADMIN_ROLE || process.argv[5] || 'super_admin';

if (!email || !password) {
  console.error('Usage: ADMIN_EMAIL=<email> ADMIN_PASSWORD=<password> node scripts/upsertAdmin.js [name] [role]');
  process.exit(1);
}

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('Missing MONGODB_URI in environment');
  process.exit(1);
}

async function run() {
  await mongoose.connect(MONGODB_URI);
  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await Admin.findOneAndUpdate(
    { email: email.toLowerCase() },
    {
      email: email.toLowerCase(),
      password: hashedPassword,
      name,
      role,
      isActive: true,
    },
    { upsert: true, new: true }
  );

  console.log('Upserted admin:', admin.email);
  await mongoose.disconnect();
  process.exit(0);
}

run().catch((err) => {
  console.error('Error upserting admin:', err.message);
  process.exit(1);
});
