import express from 'express';
import ticketDetailController from './td.controller';
const tdRoute = express.Router();

tdRoute.post('/', ticketDetailController.addBooking);

export default tdRoute;
