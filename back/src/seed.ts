import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { hash } from 'argon2';

const prisma = new PrismaClient();

const image_ids = [1, 2, 3, 4, 5, 6, 23, 78, 123];

async function main() {
  const NUM_USERS = 100;

  for (let i = 0; i < NUM_USERS; i++) {
    const email = faker.internet.email();
    const nick_name = faker.internet.displayName();
    const avatar_url = faker.internet.url();
    const password = await hash('123456');
    const image_id_list = faker.helpers.arrayElements(image_ids); // arrayElements вместо arrayElement
    const crearedAt = faker.date.past({ years: 1 });

    await prisma.user.create({
      data: {
        email,
        nick_name,
        avatar_url,
        password,
        image_id_list,
        crearedAt,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect(); // добавлены скобки
  });
