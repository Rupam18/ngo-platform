
import { PrismaClient } from '../ngo-backend/node_modules/@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Successfully imported PrismaClient.');

    // Attempt to check if we can conceptually use the type (runtime check of checking the model property)
    // In pure JS/TS runtime, types are erased, but if the client is broken, this might throw.
    // We can check if the model delegate exists on the client instance.

    if (prisma.campaign) {
        console.log('prisma.campaign model delegate exists.');
        console.log('Runtime check passed: Prisma Client is correctly generated and usable.');
    } else {
        console.error('ERROR: prisma.campaign model delegate is MISSING.');
        process.exit(1);
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
