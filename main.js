var util = require('util');

//
// Require bleno peripheral library.
// https://github.com/sandeepmistry/bleno
//
var bleno = require('bleno');

var car = require('./car');

var relays = require('./relays');
//
// The BLE Services
//
var CarService = require('./car-service');
//var BatteryService = require('./battery-service');

var name = 'gbg-car';
var r = new relays.Relays();
var car_service = new CarService(new car.Car(r));
//var battery_service = new BatteryService();

// Wait until the BLE radio powers on before attempting to advertise.
// If you don't have a BLE radio, then it will never power on!

bleno.on('stateChange', function(state) {
  if (state == 'poweredOn') {
    //
    // We will also advertise the service ID in the advertising packet,
    // so it's easier to find.
    //
    /*bleno.startAdvertising(name, [car_service.uuid, battery_service.uuid], function(err) {
      if (err) {
        console.log(err);
      }
    });*/
    bleno.startAdvertising(name, [car_service.uuid], function(err) {
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
    console.log('Started advertising');
    //
    // Once we are advertising, it's time to set up our services,
    // along with our characteristics.
    //
    bleno.setServices([
      car_service
	    //battery_service
    ]);
    console.log('setServices complete for service uuid: ' + car_service.uuid);
  }
});

if (bleno.state == 'poweredOn') {
  /*bleno.startAdvertising(name, [car_service.uuid, battery_service.uuid], function(err) {
      if (err) {
        console.log(err);
      }
    });*/
  bleno.startAdvertising(name, [car_service.uuid], function(err) {
      if (err) {
        console.log(err);
      }
    });
}

