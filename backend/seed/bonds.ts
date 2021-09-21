
import faker from "faker";

export function bondsSeed(dataNumber: number = 1): any[] {
  return Array(dataNumber).fill(null).map((_, i) => {
    const title = `Bonds ${i} - ${faker.company.bsAdjective()}`;
    const description = faker.lorem.text();
    const price = faker.datatype.float({ min: 50, max: 9999, precision: .2 });
    return {
      title,
      description,
      price
    };
  });
}