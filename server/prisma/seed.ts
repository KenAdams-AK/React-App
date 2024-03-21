import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // create users
  const user = await prisma.user.upsert({
    where: { email: 'user@mail.com' },
    update: {},
    create: {
      name: 'User',
      email: 'user@mail.com',
    },
  });

  // create lists
  const list1 = await prisma.list.upsert({
    where: { title: 'List 1' },
    update: {},
    create: {
      title: 'List 1',
      order: 1,
      user: {
        connect: {
          id: user.id,
        },
      },
      tasks: {
        connectOrCreate: {
          where: { id: 'some-unique-id' },
          create: {
            title: 'Task 1',
            description: "Task 1's description",
            status: 'IN_PROGRESS',
            priority: 'LOW',
            dueDate: new Date(),
            order: 1,
            user: {
              connect: {
                id: user.id,
              },
            },
          },
        },
      },
    },
  });

  const list2 = await prisma.list.upsert({
    where: { title: 'List 2' },
    update: {},
    create: {
      title: 'List 2',
      order: 2,
      user: {
        connect: {
          id: user.id,
        },
      },
      tasks: {
        connectOrCreate: {
          where: { id: 'some-unique-id' },
          create: {
            title: 'Task 2',
            description: "Task 2's description",
            status: 'COMPLETED',
            priority: 'HIGH',
            dueDate: new Date(),
            order: 2,
            user: {
              connect: {
                id: user.id,
              },
            },
          },
        },
      },
    },
  });

  // create activities log
  const activity = await prisma.activityLog.upsert({
    where: { id: 'some-unique-id' },
    update: {},
    create: {
      action: 'CREATE',
      entityType: 'TASK',
      entityId: 'some-unique-id',
      entityTitle: 'Task 1',
      userId: user.id,
    },
  });

  console.log({ user, list1, list2, activity });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
