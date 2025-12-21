import express, { Request, Response }  from 'express'
import config from './config'
import { Pool } from 'pg'


const app = express()
const port = config.port || 5000

const pool = new Pool({
  connectionString:`${config.connectionStr}`
  
})

const initDB = async () => {
  try {
    // UUID generator
    await pool.query(`CREATE EXTENSION IF NOT EXISTS "pgcrypto"`);

    // USERS
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) NOT NULL UNIQUE CHECK (email = lower(email)),
        password TEXT NOT NULL CHECK (length(password) >= 6),
        phone VARCHAR(15) NOT NULL,
      
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `);

    // VEHICLES
    await pool.query(`
      CREATE TABLE IF NOT EXISTS vehicles (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        vehicle_name VARCHAR(50) NOT NULL,
        type VARCHAR(10) NOT NULL CHECK (type IN ('car', 'bike', 'van', 'SUV')),
        registration_number VARCHAR(30) NOT NULL UNIQUE,
        daily_rent_price NUMERIC(10,2) NOT NULL CHECK (daily_rent_price > 0),
        availability_status VARCHAR(10) NOT NULL
          CHECK (availability_status IN ('available', 'booked')),
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);

    // BOOKINGS
    await pool.query(`
      CREATE TABLE IF NOT EXISTS bookings (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        customer_id UUID NOT NULL
          REFERENCES users(id) ON DELETE CASCADE,
        vehicle_id UUID NOT NULL
          REFERENCES vehicles(id) ON DELETE CASCADE,
        rent_start_date DATE NOT NULL,
        rent_end_date DATE NOT NULL
          CHECK (rent_end_date > rent_start_date),
        total_price NUMERIC(10,2) NOT NULL
          CHECK (total_price > 0),
        status VARCHAR(10) NOT NULL
          CHECK (status IN ('active', 'cancelled', 'returned')),
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);

    console.log("✅ All tables created successfully");
  } catch (error) {
    console.error("❌ initDB error:", error);
  }
};

initDB();



app.use(express.json())


app.get('/', (req:Request, res:Response) => {
  res.send('Hello World!')
})

app.post('/',(req:Request,res:Response)=>{

console.log(req.body);
  res.status(201).json({
    success:true,
    message:'api is work'
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
