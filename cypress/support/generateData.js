import { fakerPT_BR as faker } from '@faker-js/faker';

export function generateUserData() {
  const firstName = faker.person.firstName();
  const lastName  = faker.person.lastName();
  const email     = faker.internet.email({ firstName, lastName });
  const password  = faker.internet.password();

  return { firstName, lastName, email, password }
}
