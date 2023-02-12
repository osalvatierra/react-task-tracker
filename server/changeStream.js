
async function monitorListingsUsingEventEmitter(client, timeInMs = 60000, pipeline = [] ) {
    const collection = client.db("task-app").collection("tasks");

    const changeStream = collection.watch(pipeline);

    changeStream.on('change', (next) => {
        console.log(next);
    });

    await closeChangeStream(timeInMs, changeStream);
}

function closeChangeStream(timeInMs = 60000, changeStream) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Closing the change stream");
            changeStream.close();
            resolve();
        }, timeInMs)
    })
};