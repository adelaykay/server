import express from 'express'
import { connect } from 'mongoose'
import userRoutes from './routes/user.js'
import dotenv from 'dotenv'

dotenv.config()
const app = express()

app.use(express.json())
const port = process.env.PORT || 3000

// Routes middleware
app.use('/api/users', userRoutes)

// Connect to mongodb
connect(process.env.MONGO_URI).then(console.log('Connected to mongodb'))

app.listen(port, () => {
  console.log('Listening on port', port)
})
