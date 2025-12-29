import express, { Request, Response } from 'express'
import config from './config'
import initDB from './config/db'
import { userRouters } from './modules/user/user.routes'
import { authRouters } from './modules/auth/auth.routes'
import { vehiclesRouter } from './modules/Vehicles/vehicles.routes'
import { bookingRouter } from './modules/Bookings/booking.routes'

const app = express()

initDB();

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})
// auth
app.use('/api/v1', authRouters)
// user
app.use('/api/v1', userRouters)
// vehicles
app.use('/api/v1', vehiclesRouter)
// booking
app.use('/api/v1', bookingRouter)

export default app