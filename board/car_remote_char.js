var util = require('util');
var bleno = require('bleno');
var Car = require('./car');




function car_remote_char(car) {
  bleno.Characteristic.call(this, {
    uuid: '4A98DF001CC4E7C1C757F1267DD021E8',
    properties: ['notify', 'read', 'write'],
    descriptors: [
      new bleno.Descriptor({
        uuid: 'DF10',
        value: 'Determines if the car is in manual or remote control.'
      })
    ]
  });

  this.car = car;
}

util.inherits(car_remote_char, bleno.Characteristic);

car_remote_char.prototype.onWriteRequest = function(data, offset, withoutResponse, callback) { 
  
  if (offset) {
    callback(this.RESULT_ATTR_NOT_LONG);
  }
  else if (data.length != 1) {
    callback(this.RESULT_INVALID_ATTRIBUTE_LENGTH);
  }
  else {
	this.car.remote = data.readInt8(0);
	//self.updateValueCallback(data);
	this.car.exec_cmd(Car.DriveCommands.REMOTE, this.car.remote);
    callback(this.RESULT_SUCCESS);
  }
  
};

car_remote_char.prototype.onReadRequest = function(offset, callback) {
  if (offset) {
    callback(this.RESULT_ATTR_NOT_LONG, null);
  }
  else {
    var data = new Buffer(1);
    data.writeInt8(this.car.remote, 0);
    callback(this.RESULT_SUCCESS, data);
  }
};

module.exports = car_remote_char;