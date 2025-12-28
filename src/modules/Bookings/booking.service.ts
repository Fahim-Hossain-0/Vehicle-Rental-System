import { pool } from "../../config/db";

const createBooking = async (payload: Record<string, unknown>) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload as any;

  const startDate = new Date(rent_start_date);
  const endDate = new Date(rent_end_date);


  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    throw new Error("Invalid date format");
  }

  if (startDate >= endDate) {
    throw new Error("End date must be after start date");
  }

  const days = Math.ceil(
    (endDate.getTime() - startDate.getTime()) / 86400000
  );

  if (days <= 0) {
    throw new Error("Invalid rental duration");
  }


  const vehicleRes = await pool.query(
    `SELECT daily_rent_price FROM vehicles WHERE id=$1 AND availability_status='available'`,
    [vehicle_id]
  );

  if (!vehicleRes.rowCount) {
    throw new Error("Vehicle not available");
  }

  const dailyPrice = vehicleRes.rows[0].daily_rent_price;
  const total_price = dailyPrice * days;


  await pool.query("BEGIN");

  try {

    const bookingRes = await pool.query(
      `
      INSERT INTO bookings
      (customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status)
      VALUES ($1,$2,$3,$4,$5,'active')
      RETURNING *
      `,
      [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price]
    );


    await pool.query(
      `UPDATE vehicles SET availability_status='booked' WHERE id=$1`,
      [vehicle_id]
    );

    await pool.query("COMMIT");
    return bookingRes.rows[0];

  } catch (error) {
    await pool.query("ROLLBACK");
    throw error;
  }
};

const getAllBooking = async (user: any) => {
  const { id, role } = user
  // const {user,customer_id}= payload as any
  if (!user) {
    throw new Error("unauthorized")
  }

  let result;

  if (role === "admin") {
    result = await pool.query(`SELECT * FROM bookings`);
  } else if (role === "customer") {
    
    result = await pool.query(`SELECT * FROM bookings WHERE customer_id = $1`, [id]);
  } else {
    throw new Error("Role not allowed");
  }

  const bookings =result.rows

  for(let booking of bookings){
    const vehicles =await pool.query(`
      SELECT vehicle_name,registration_number, daily_rent_price FROM vehicles WHERE id = $1
      `,[booking.vehicle_id]
    )
    booking.vehicle = vehicles.rows[0]

  }


  return bookings

}



const updateBooking = async (
  bookingId: string,
  payload: Record<string, unknown>,
  user: any
) => {
  const { id: userId, role } = user;
  const { status } = payload as any;


  if (!status) {
    throw new Error("Status is required");
  }


  const bookingRes = await pool.query(
    `SELECT * FROM bookings WHERE id = $1`,
    [bookingId]
  );

  if (bookingRes.rowCount === 0) {
    throw new Error("Booking not found");
  }

  const booking = bookingRes.rows[0];


  if (role === "customer") {
    if (booking.customer_id !== userId) {
      throw new Error("You can only update your own booking");
    }

    if (status !== "cancelled") {
      throw new Error("Customer can only cancel booking");
    }
  }

  if (role === "admin") {
    if (status !== "returned") {
      throw new Error("Admin can only mark booking as returned");
    }
  }

  // 4️⃣ Transaction
  await pool.query("BEGIN");

  try {
    // Update booking status
    const updatedBookingRes = await pool.query(
      `
      UPDATE bookings
      SET status = $1
      WHERE id = $2
      RETURNING *
      `,
      [status, bookingId]
    );

    const updatedBooking = updatedBookingRes.rows[0];

   
    let vehicleData = null;

    if (role === "admin" && status === "returned") {
      const vehicleRes = await pool.query(
        `
        UPDATE vehicles
        SET availability_status = 'available'
        WHERE id = $1
        RETURNING availability_status
        `,
        [booking.vehicle_id]
      );

      vehicleData = vehicleRes.rows[0];
    }

    await pool.query("COMMIT");

    // 6️⃣ Response shape
    if (vehicleData) {
      return {
        ...updatedBooking,
        vehicle: vehicleData,
      };
    }

    return updatedBooking;
  } catch (error) {
    await pool.query("ROLLBACK");
    throw error;
  }
};




export const bookingService = {
  createBooking,
  getAllBooking,
  updateBooking,
};

