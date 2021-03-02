module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log(
            `A socket connection to the server has been made: ${socket.id}`
        );

        socket.on('round over', (socket) => {
            console.log('Got ROUND OVER message! Emitting to players');
            io.emit('round over');
        });

        socket.on('remove clue', (clue) => {
            console.log(
                'Got remove clue message! Emitting to players to remove' +
                    JSON.stringify(clue)
            );
            io.emit(JSON.stringify(clue));
        });

        socket.on('disconnect', () => {
            console.log(`Connection ${socket.id} has left the building`);
        });
    });
};
