import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import { UserInfo } from "./../types/user";

export const generateUser = (): UserInfo => {
  const name = faker.name.firstName("male");
  const surname = faker.name.lastName("male");
  const birthday = faker.date
    .past(40, dayjs().add(-20, "years").toISOString())
    .toISOString();
  return {
    birthday,
    email: faker.internet.email(name, surname),
    name,
    surname,
    profession: faker.company.companyName(),
  };
};


export const generateUsers = (count: number) => Array(count).fill(null).map(() => generateUser())
