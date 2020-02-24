// TODO: join rooms!

const io = require('socket.io')();

function sendInitialLocation(client) {
	// 400 in case of ride not started;
	// client.emit('location_update',400);
	// client.emit('location_update','list of locations and ride info');
}

function initializeDriver(client, driver) {
	// client.join(driver.number);
	console.log(driver)

	client.on('location_update', location => {
		console.log('location update', location)
		// io.to(driver.number).broadcast('location update!');
	});
	client.on('end_journey', () => {
		// journey ended.
		console.log('end journey', driver)
	});
}

function initializeRider(client, rider) {
	// client.join(rider.number);
	sendInitialLocation(client);
}

function attatchListeners(client) {
	client.on('disconnect', () => {
		console.log(client.id, 'disconnected')
		client.removeAllListeners();
	})
	client.on('register_driver', driver => {
		initializeDriver(client, driver);
	});

	client.on('register_rider', rider => {
		initializeRider(client, rider);
	});

}

io.on('connection', client => {
	attatchListeners(client);
	console.log(client.id, 'connected')
});



io.listen(process.env.PORT | 8080);