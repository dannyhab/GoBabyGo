var util = require('util');

//
// Require bleno peripheral library.
// https://github.com/sandeepmistry/bleno
//
var bleno = require('../node_modules/bleno');

var car = require('../dannyofer/gbg_project/car');
//
// The BLE Services
//
var CarService = require('../dannyofer/gbg_project/car-service');
var BatteryService = require('../dannyofer/gbg_project/battery-service');

var name = 'gbg-car';
var car_service = new CarService(new car.Car());
var battery_service = new BatteryService();

// Wait until the BLE radio powers on before attempting to advertise.
// If you don't have a BLE radio, then it will never power on!


bleno.on('stateChange', function(state) {
  if (state == 'poweredOn') {
    //
    // We will also advertise the service ID in the advertising packet,
    // so it's easier to find.
    //
    bleno.startAdvertising(name, [car_service.uuid, battery_service.uuid], function(err) {
      if (err) {
        console.log(err);
      }
    });
  }
  else {
    bleno.stopAdvertising();
  }
});



bleno.on('advertisingStart', function(err) {
  if (!err) {
    console.log('advertising...');
    //
    // Once we are advertising, it's time to set up our services,
    // along with our characteristics.
    //
    bleno.setServices([
      car_service,
	  battery_service
    ]);
  }
});


