const { PrismaClient } = require('./ngo-backend/node_modules/@prisma/client');
const prisma = new PrismaClient();

async function test() {
  try {
    const campaign = await prisma.campaign.create({
      data: {
        title: "Test Campaign",
        goal: 50000,
        status: "ACTIVE"
      }
    });
    console.log("Success:", campaign);
  } catch (error) {
    console.error("Error:", error);
  }
}
test();
