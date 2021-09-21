import faker from "faker";

export function customersSeed(dataNumber: number = 1): any[] {
  return Array(dataNumber).fill(null).map(() => {
    const name = faker.name.findName();
    const email = faker.internet.email(name);
    const document = faker.helpers.replaceSymbolWithNumber('###########');
    return {
      name,
      email,
      document
    };
  });
}