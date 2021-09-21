import faker from "faker";
import { customersSeed } from './customers';
import { bondsSeed } from './bonds';
import { ordersSeed } from './orders';

import { Customer } from '../src/customers/customers.model';
import { Bond } from '../src/bonds/bonds.model';
import { Order } from '../src/orders/orders.model';

faker.locale = "pt_BR";

export async function seed(clearDatabase = false) {

  try {
    
    if (clearDatabase) {
      const deleteResult = await Promise.all([
        Bond.deleteMany({}),
        Customer.deleteMany({}),
        Order.deleteMany({}),
      ]);
      console.log({deleteResult});
    }
  

    const [bonds, customers] = await Promise.all([
      Bond.insertMany(bondsSeed(10)),
      Customer.insertMany(customersSeed(30))
    ]);    

    const orders = await Order.insertMany(ordersSeed(bonds, customers, 30))

    console.log({bonds, customers, orders});

    console.log('Seed ok!')

  } catch (error) {
    console.error(error);
  }
}