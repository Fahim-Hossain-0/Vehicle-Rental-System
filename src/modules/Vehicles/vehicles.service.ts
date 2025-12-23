
import { pool } from "../../config/db"

const createVehicles = async (payload: Record<string, unknown>) => {
    const { vehicle_name, type, registration_number, daily_rent_price, availability_status } = payload

    if (typeof daily_rent_price !== "number") {
    throw new Error("Daily rent price must be a number");
  }

  if (daily_rent_price < 0) {
    throw new Error("Price must be positive");
  }

    const result = await pool.query(`
        INSERT INTO vehicles(vehicle_name,type,registration_number,daily_rent_price,availability_status) VALUES ($1,$2,$3,$4,$5) RETURNING *
        `,[vehicle_name,type,registration_number,daily_rent_price,availability_status])
        return result.rows[0]
}

export const vehicleService = {
    createVehicles
}