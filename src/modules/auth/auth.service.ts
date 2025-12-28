import bcrypt from "bcryptjs";
import { pool } from "../../config/db";
import jwt from'jsonwebtoken';
import config from "../../config";

const signUp = async (payload: Record<string, unknown>) => {
  const name = payload.name as string;
  const email = payload.email as string;
  const password = payload.password as string;
  const role = payload.role as string;
  const phone = payload.phone as string;


  if (!name || !email || !password || !role || !phone) {
    throw new Error("All fields are required");
  }

 
  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string" ||
    typeof role !== "string" ||
    typeof phone !== "string"
  ) {
    throw new Error("Invalid input type");
  }


  if (email !== email.toLowerCase()) {
    throw new Error("Email must be lowercase");
  }

 
  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters");
  }


  const existingUser = await pool.query(
    `SELECT id FROM users WHERE email = $1`,
    [email]
  );

  if (existingUser.rows.length > 0) {
    throw new Error("User already exists with this email");
  }


  const hashedPassword = await bcrypt.hash(password, 10);

 
  const result = await pool.query(
    `
    INSERT INTO users (name, email, password, role, phone)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, name, email, role, phone
    `,
    [name, email, hashedPassword, role, phone]
  );

  return result.rows[0];
};

const singIn = async(payload: Record<string, unknown>)=>{

      const {email,password} = payload
      const result = await pool.query(`
        SELECT * FROM users WHERE email = $1`, [email]
      )
      

      if(result.rows.length === 0 ){
        return null
      }
      const user =  result.rows[0]
      const match = await bcrypt.compare(password as string,user.password)

      if(!match){
        return false
      }

      const token = jwt.sign({id:user.id,name:user.name,email:user.email,role:user.role,},config.jwtSecret as string,{expiresIn:"14d"})
      console.log({token});

return {user,token}
}




export const authServices = {
  signUp,
  singIn
};
