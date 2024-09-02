import express, { Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { productRouter } from './routes/productRouter'
import { seedRouter } from './routes/seedRouter'
import { userRouter } from './routes/userRouter'
import { orderRouter } from './routes/orderRouter'
import { keyRouter } from './routes/keyRouter'
import path from 'path'

dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/mazon'

mongoose.set('strictQuery', true)

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('connected to mongodb')
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message)
  })

const app = express()

app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:5173'],
  })
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/products', productRouter)
app.use('/api/users', userRouter)
app.use('/api/orders', orderRouter)
app.use('/api/keys', keyRouter)
app.use('/api/seed', seedRouter)

app.use(express.static(path.join(__dirname, '../../frontend/dist')))

app.get('*', (req: Request, res: Response) =>
  res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'))
)

const PORT: number = parseInt((process.env.PORT || '4000') as string, 10)
app.listen(PORT, () => {
  console.log('server started')
})
