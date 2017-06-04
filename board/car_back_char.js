var util = require('util');
var bleno = require('bleno');
var Car = require('./car');

function car_forward_char(car) {
  bleno.Characteristic.call(this, {
    uuid: '4A98DF021CC4E7C1C757F1267DD021E8',
    properties: ['notify', 'write'],
    descriptors: [
      new bleno.Descriptor({
        uuid: 'DF11',
        value: 'Activates the acceleration engine forward.'
      })
    ]
  });

  this.car = car;
}

util.inherits(car_forward_char, bleno.Characteristic);

car_forward_char.prototype.onWriteRequest = function(data, offset, withoutResponse, callback) { 
  
  if (offset) {
    callback(this.RESULT_ATTR_NOT_LONG);
  }
  else if (data.length != 1) {
    callback(this.RESULT_INVALID_ATTRIBUTE_LENGTH);
  }
  else {
	this.car.forward = data.readInt8(0);
	//self.updateValueCallback(data);
	this.car.exec_cmd(Car.DriveCommands.BACK, this.car.forward);
    callback(this.RESULT_SUCCESS);
  }
  
};

module.exports = car_forward_char;