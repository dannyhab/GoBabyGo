var util = require('util');
var events = require('events');
var Relays = require('./relays');

var DriveCommands = {
  REMOTE: 		0,
  FORWARD:      1,
  BACK:     	2,
  RIGHT:      	3,
  LEFT:    		4
};

//init
function Car(relays) {
  events.EventEmitter.call(this);
  this.remote = false;
  this.forward = false;
  this.back = false;
  this.c_right = false;
  this.c_left = false;
  this.relays = relays;
}

util.inherits(Car, events.EventEmitter);

Car.prototype.exec_cmd = function(cmd, val) {
	console.log('executing command:', cmd, ' -> ', val);
	switch (cmd) {
        case DriveCommands.REMOTE:
            if (val) {
				this.relays.execDriveCmd(Relays.driveCmdEnum.REMOTE_UP);
			}
			else {
				this.relays.execDriveCmd(Relays.driveCmdEnum.REMOTE_DOWN);
			}
			this.remote = val;
            break;
		
		case DriveCommands.FORWARD:
            if (val) {
				this.relays.execDriveCmd(Relays.driveCmdEnum.FORWARD_UP);
			}
			else {
				this.relays.execDriveCmd(Relays.driveCmdEnum.FORWARD_DOWN);
			}
			this.forward = val;
            break;
		
		case DriveCommands.BACK:
            if (val) {
				this.relays.execDriveCmd(Relays.driveCmdEnum.BACK_UP);
			}
			else {
				this.relays.execDriveCmd(Relays.driveCmdEnum.BACK_DOWN);
			}
			this.back = val;
            break;
		
		case DriveCommands.RIGHT:
            if (val) {
				this.relays.execDriveCmd(Relays.driveCmdEnum.RIGHT_UP);
			}
			else {
				this.relays.execDriveCmd(Relays.driveCmdEnum.RIGHT_DOWN);
			}
			this.c_right = val;
            break;
		
		case DriveCommands.LEFT:
            if (val) {
				this.relays.execDriveCmd(Relays.driveCmdEnum.LEFT_UP);
			}
			else {
				this.relays.execDriveCmd(Relays.driveCmdEnum.LEFT_DOWN);
			}
			this.c_left = val;
            break;
		
	}
  
  
};

module.exports.Car = Car;
module.exports.DriveCommands = DriveCommands;

