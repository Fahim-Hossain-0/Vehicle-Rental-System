import { Pool } from "pg";
import config from ".";

export const pool = new Pool({
  connectionString: config.connectionStr,
});

const initDB = async () => {
  try {
    await pool.query(`
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,

        name VARCHAR(100) NOT NULL,

        email VARCHAR(150) NOT NULL UNIQUE
        CHECK (email = lower(email)),

        password TEXT NOT NULL
        CHECK (length(password) >= 6),

        phone VARCHAR(15) NOT NULL,

        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);
    await pool.query(`
  CREATE TABLE IF NOT EXISTS vehicles (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    vehicle_name VARCHAR(50) NOT NULL,
    type VARCHAR(10) NOT NULL CHECK (type IN ('car', 'bike', 'van', 'SUV')),
    registration_number VARCHAR(30) NOT NULL UNIQUE,
    daily_rent_price NUMERIC(10,2) NOT NULL CHECK (daily_rent_price > 0),
    availability VARCHAR(10) NOT NULL CHECK (availability IN ('available', 'booked')),
    created_at TIMESTAMP DEFAULT NOW()
  );
`);


    console.log("✅ users table created successfully");
  } catch (error) {
    console.error("❌ initDB error:", error);
  }
};

export default initDB;
