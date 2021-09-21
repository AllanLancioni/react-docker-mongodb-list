import faker from "faker";

export function ordersSeed(bonds: any[], customers: any[], dataNumber: number = 1): any[] {
  return Array(dataNumber).fill(null).map(() => {
    const boughtAt = faker.date.past(1);
    return {
      customer: customers[faker.datatype.number({ min: 0, max: customers.length - 1 })]._id,
      bond: bonds[faker.datatype.number({ min: 0, max: bonds.length - 1 })]._id,
      boughtAt,
      paidAt: faker.datatype.boolean() ? faker.date.soon(10, boughtAt) : null
    };
  });
}