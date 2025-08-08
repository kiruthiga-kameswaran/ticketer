import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create Assignees
  const assignee1 = await prisma.assignee.create({
    data: {
      name: 'Alice Johnson',
      email: 'alice@example.com',
      password: 'securepass123',
    },
  });

  const assignee2 = await prisma.assignee.create({
    data: {
      name: 'Bob Smith',
      email: 'bob@example.com',
      password: 'anotherpass456',
    },
  });

  // Create Tickets
  await prisma.ticketSchema.createMany({
    data: [
      {
        title: 'Fix Login Bug',
        description: 'User login fails on mobile.',
        priority: 'Urgent',
        progress: 50,
        status: 'Incomplete',
        active: 'Yes',
        assigneeId: assignee1.id,
      },
      {
        title: 'Update Dashboard UI',
        description: 'Redesign the dashboard for better UX.',
        priority: 'Mid',
        progress: 20,
        status: 'Assigned',
        active: 'Yes',
        assigneeId: assignee2.id,
      },
      {
        title: 'Write Unit Tests',
        description: 'Add tests for user service.',
        priority: 'Low',
        progress: 100,
        status: 'Done',
        active: 'No',
        assigneeId: assignee1.id,
      },
    ],
  });
}

main()
  .then(() => {
    console.log('Seeding complete.');
  })
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
