'use strict';

const db = require('../database');
const { User, Clue } = require('../database/models');

async function seed() {
    await db.sync({ force: true });
    console.log('db synced!');

    const users = await Promise.all([
        User.create({ name: 'Tayne Femple', team: 'Masters' }),
        User.create({ name: 'Flo Jo', team: 'Masters' }),
        User.create({ name: 'Marky Mark', team: 'Losers' }),
        User.create({ name: 'Kerry Washingon', team: 'Losers' }),
    ]);

    const clues = await Promise.all([
        Clue.create({ name: 'Sean Connery', hint: 'Hates Alec Trebek' }),
        Clue.create({ name: 'Big Birde' }),
        Clue.create({ name: 'Carl Sagan', hint: 'space guy' }),
        Clue.create({ name: 'Barack Obama', hint: '' }),
        Clue.create({ name: 'Barack Obama', hint: '' }),
        Clue.create({ name: 'Barack Obama', hint: '' }),
    ]);

    console.log(`seeded ${users.length} users`);
    console.log(`seeded ${clues.length} clues`);
    console.log(`seeded successfully`);
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
    console.log('seeding...');
    try {
        await seed();
    } catch (err) {
        console.error(err);
        process.exitCode = 1;
    } finally {
        console.log('closing db connection');
        await db.close();
        console.log('db connection closed');
    }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
    runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
