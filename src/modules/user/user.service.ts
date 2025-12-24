import { pool } from "../../config/db"
import bcrypt from "bcryptjs";
const getAllUsers = async()=>{
    const result = await pool.query(`SELECT * FROM users`)
    return result
}

// const updateUser = async(payload:Record<string,unknown>,id:string)=>{
//    let { name, email, password, phone, role } = payload as any

//     // Hash password only if provided
//     if (password) {
//         password = await bcrypt.hash(password, 10)
//     } else {
//         password = null
//     }
//    const result = await pool.query(
//       `UPDATE users SET name=COALESCE($1, name), email= COALESCE($2, email), phone= COALESCE($3, phone), role= COALESCE($4, role) WHERE id=$5 RETURNING *`,
//       [name ?? null, email ?? null, phone ?? null, role ?? null, id]
//     );

//          delete result.rows[0].password;
//     return result.rows[0];
// }

const updateUser = async (payload: Record<string, unknown>, id: string) => {
    let { name, email, password, phone, role } = payload as any

    if (password) {
        password = await bcrypt.hash(password, 10)
    } else {
        password = null
    }

    const result = await pool.query(
        `
        UPDATE users
        SET
            name = COALESCE($1, name),
            email = COALESCE($2, email),
            password = COALESCE($3, password),
            phone = COALESCE($4, phone),
            role = COALESCE($5, role)
        WHERE id = $6
        RETURNING *
        `,
        [name ?? null, email ?? null, password, phone ?? null, role ?? null, id]
    )

    // Remove password from returned rows
    if (result.rows.length > 0) {
        delete result.rows[0].password
    }

    return result // ✅ return full result.rows object
}


const deleteUser = async(id:string)=>{
    const result = await pool.query(`
         DELETE FROM users WHERE id=$1
        `,[id])

        return result
}

export const userServices = {
    getAllUsers,
    updateUser,
    deleteUser
}