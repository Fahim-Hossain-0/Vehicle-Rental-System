import express, { Request, Response }  from 'express'
import config from './config'
import { Pool } from 'pg'
import initDB from './config/db'
import { userRouters } from './modules/user/user.routes'
import { authRouters } from './modules/auth/auth.routes'


const app = express()
const port = config.port || 5000


initDB();



app.use(express.json())


app.get('/', (req:Request, res:Response) => {
  res.send('Hello World!')
})
// auth
app.use('/api/v1',authRouters)
// user

app.use('/api/v1',userRouters)


// app.post('/api/v1/users',(req:Request,res:Response)=>{

// console.log(req.body);
//   res.status(201).json({
//     success:true,
//     message:'api is work'
//   })
// })

app.listen(config.port, () => {
  console.log(`Example app listening on port ${port}`)
})
