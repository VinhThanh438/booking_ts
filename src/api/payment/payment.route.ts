import express from 'express'
import paymentController from './payment.controller'
const Router = express.Router()

Router.post('/', paymentController.confirmPayment)

export default Router