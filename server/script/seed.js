'use strict';

const db = require('../database');
const { User, Clue, Team } = require('../database/models');

async function seed() {
    await db.sync({ force: true });
    console.log('db synced!');

    const users = await Promise.all([
        User.create({ name: 'Tayne Femple', teamId: '2' }),
        User.create({ name: 'Flo Jo', teamId: '2' }),
        User.create({ name: 'Marky Mark', teamId: '1' }),
        User.create({ name: 'Kerry Washingon', teamId: '1' }),
    ]);

    const clues = await Promise.all([
        Clue.create({ celebName: 'Sean Connery', hint: 'Hates Alex Trebek' }),
        Clue.create({ celebName: 'Big Bird' }),
        Clue.create({ celebName: 'Carl Sagan', hint: 'space guy' }),
        Clue.create({ celebName: 'Barack Obama', hint: '' }),
        Clue.create({ celebName: 'Michelle Obama', hint: '' }),
        Clue.create({ celebName: 'Malia Obama', hint: '' }),
        Clue.create({ celebName: 'Malala', hint: '' }),
    ]);

    const team = await Team.bulkCreate([{ score: 0 }, { score: 0 }]);

    console.log(`seeded ${users.length} users`);
    console.log(`seeded ${clues.length} clues`);
    console.log('created 2 teams');
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
