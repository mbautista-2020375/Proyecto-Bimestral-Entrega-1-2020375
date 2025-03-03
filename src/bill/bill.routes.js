import express from 'express';
import { createBill, getAllBills, getBillById, updateBill, deleteBill } from './bill.controller.js'; 
import { validateJwt } from '../../middlewares/validate.jwt.js';
import { isAdmin } from '../../middlewares/is.admin.js';
import { createBillValidator, updateBillValidator } from '../../validators/bill.validators.js';

const api = express.Router();

api.post('/createbill/',[validateJwt, isAdmin, createBillValidator] ,createBill);
api.get('/bills/', [validateJwt, isAdmin], getAllBills);
api.get('/bill/:id', [validateJwt, isAdmin], getBillById);
api.put('/editbill/:id', [validateJwt, isAdmin, updateBillValidator], updateBill);
api.delete('/deletebill/:id', [validateJwt, isAdmin], deleteBill);

export default api;
