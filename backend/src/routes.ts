import express from 'express';
import Bonds from './features/bonds/bonds.controller'
import Orders from './features/orders/orders.controller'
import Customers from './features/customers/customers.controller'
import Dashboard from './features/dashboard/dashboard.controller'

const router = express.Router();
router.get('/dashboard', Dashboard.brief)
router.get('/bonds', Bonds.list)
router.get('/customers', Customers.list)
router.get('/orders', Orders.list)

export default router;