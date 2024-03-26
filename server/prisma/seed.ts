import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: 'user@mail.com' },
    update: {},
    create: {
      username: 'User',
      email: 'user@mail.com',
    },
  });

  const list1 = await prisma.list.upsert({
    where: { title: 'List 1' },
    update: {},
    create: {
      title: 'List 1',
      order: 100,
      author: {
        connect: {
          id: user.id,
        },
      },
    },
  });

  const list2 = await prisma.list.upsert({
    where: { title: 'List 2' },
    update: {},
    create: {
      title: 'List 2',
      order: 200,
      author: {
        connect: {
          id: user.id,
        },
      },
    },
  });

  const task1 = await prisma.task.upsert({
    where: { id: 'some-unique' },
    update: {},
    create: {
      title: 'Task 1',
      description: "Task 1's description",
      status: 'IN_PROGRESS',
      priority: 'LOW',
      dueDate: new Date(),
      order: 100,
      author: {
        connect: {
          id: user.id,
        },
      },
      list: {
        connect: {
          id: list1.id,
        },
      },
    },
  });

  const task2 = await prisma.task.upsert({
    where: { id: 'some-unique' },
    update: {},
    create: {
      title: 'Task 2',
      description: "Task 2's description",
      status: 'COMPLETED',
      priority: 'HIGH',
      dueDate: new Date(),
      order: 200,
      author: {
        connect: {
          id: user.id,
        },
      },
      list: {
        connect: {
          id: list2.id,
        },
      },
    },
  });

  const activityList1 = await prisma.activityLog.upsert({
    where: { id: 'some-unique' },
    update: {},
    create: {
      entityType: 'LIST',
      action: 'CREATE',
      prevValue: null,
      newValue: null,
      authorId: user.id,
      listId: list1.id,
    },
  });

  const activityList2 = await prisma.activityLog.upsert({
    where: { id: 'some-unique' },
    update: {},
    create: {
      entityType: 'LIST',
      action: 'RENAME',
      prevValue: 'Previous List 2',
      newValue: list2.title,
      authorId: user.id,
      listId: list2.id,
    },
  });

  const activityTask1 = await prisma.activityLog.upsert({
    where: { id: 'some-unique' },
    update: {},
    create: {
      entityType: 'TASK',
      action: 'CREATE',
      prevValue: null,
      newValue: null,
      authorId: user.id,
      taskId: task1.id,
    },
  });

  const activityTask2 = await prisma.activityLog.upsert({
    where: { id: 'some-unique' },
    update: {},
    create: {
      entityType: 'TASK',
      action: 'CHANGE_STATUS',
      prevValue: 'IN_PROGRESS',
      newValue: task2.status,
      authorId: user.id,
      taskId: task2.id,
    },
  });

  console.log({
    user,
    list1,
    list2,
    task1,
    task2,
    activityList1,
    activityList2,
    activityTask1,
    activityTask2,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
