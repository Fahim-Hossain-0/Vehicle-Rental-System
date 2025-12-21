import dotenv from "dotenv"
import path from "path"

dotenv.config({ path: path.join(process.cwd(), ".env") })

 const config = {
    connectionStr: process.env.connection_Str,
    port: process.env.port,

}

export default config