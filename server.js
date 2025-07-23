import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRoutes from './routes/authRoutes.js'
import taskRoutes from './routes/taskRoutes.js'




dotenv.config()


const app = express()

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://proyecto-fronted-fullstack.vercel.app'
  ],
  credentials: true
}))


app.use(express.json())
app.use('/api/tasks', taskRoutes)
app.use('/api/auth', authRoutes)

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.log(err))

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`))
