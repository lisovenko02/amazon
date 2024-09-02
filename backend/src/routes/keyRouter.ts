import express from 'express'

export const keyRouter = express.Router()

keyRouter.get('/paypal', (req, res) => {
  res.json({ clientId: process.env.PAYPAL_CL_ID || 'sb' })
})
