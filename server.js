
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config()

const app = express()
app.use(morgan('dev'))
app.use(express.json())
app.use(cors({
  origin: [process.env.CLIENT_URL, process.env.CLIENT_URL_LOCAL].filter(Boolean),
  credentials: true
}))


app.use('/api/tasks', require('./routes/taskRoutes'))
app.use('/api/auth', require('./routes/authRoutes'))

app.get('/api/health', (req, res) => res.json({ ok: true }))

app.use((req, res) => res.status(404).json({ message: 'Not found' }))
app.use((err, req, res, next) => res.status(err.status || 500).json({ message: err.message || 'Server error' }))

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`API on :${PORT}`))
