import express from 'express';
import Bonds from './bonds/bonds.controller'
import Orders from './orders/orders.controller'
import Customers from './customers/customers.controller'
import Dashboard from './dashboard/dashboard.controller'

const router = express.Router();
router.get('/dashboard', Dashboard.brief)
router.get('/bonds', Bonds.list)
router.get('/customers', Customers.list)
router.get('/orders', Orders.list)

export default router;