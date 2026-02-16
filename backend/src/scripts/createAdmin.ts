import { pool } from "../db";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

async function createAdmin() {
  const username = "admin";
  const email = "admin@microcrm.local";
  const password = "admin123";

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users (username, email, password, role)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (email) 
       DO UPDATE SET password = EXCLUDED.password, role = EXCLUDED.role
       RETURNING id, username, email, role`,
      [username, email, hashedPassword, "admin"]
    );

    console.log("✅ Admin user created/updated successfully:");
    console.log(`   Email: ${email}`);
    console.log(`   Password: ${password}`);
    console.log(`   Role: admin`);
    console.log(`   ID: ${result.rows[0].id}`);

    await pool.end();
  } catch (error) {
    console.error("❌ Error creating admin user:", error);
    process.exit(1);
  }
}

createAdmin();
