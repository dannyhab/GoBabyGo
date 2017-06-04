var b = require('bonescript');
var util = require('util');
var events = require('events');

var driveCmdEnum = {
    REMOTE_UP: 0,
    REMOTE_DOWN: 1,
    FORWARD_UP: 2,
    FORWARD_DOWN: 3,
    BACK_UP: 4,
    BACK_DOWN: 5,
    RIGHT_UP: 6,
    RIGHT_DOWN: 7,
    LEFT_UP: 8,
    LEFT_DOWN: 9
};

function Relays() {
    events.EventEmitter.call(this);
	//relays states
	var rm_plus_state = b.LOW; //low = from gear, high = from app
	var rm_minus_state = b.LOW; //low = from gear, high = from app
	var remote_accel_plus_state = b.LOW; //low = gnd, high = vcc
	var remote_accel_minus_state = b.LOW; //low = gnd, high = vcc
	var remote_steer_plus_state = b.LOW; //low = gnd, high = vcc
	var remote_steer_minus_state = b.LOW; //low = gnd, high = vcc
	//relay pins
	var rm_plus_sel = "P9_41";
    var rm_minus_sel = "P9_15";
    var remote_accel_plus_sel = "P9_23"; 
    var remote_accel_minus_sel = "P9_25";
    var remote_steer_plus_sel = "P9_27";
    var remote_steer_minus_sel = "P9_17";
    //initialize pins as outputs and start in '0'
    console.log("setting output mode for pin: " + rm_plus_sel);
    b.pinMode(rm_plus_sel, b.OUTPUT);
    console.log("setting output mode for pin: " + rm_minus_sel);
    b.pinMode(rm_minus_sel, b.OUTPUT);
    console.log("setting output mode for pin: " + remote_accel_plus_sel);
    b.pinMode(remote_accel_plus_sel, b.OUTPUT);
    console.log("setting output mode for pin: " + remote_accel_minus_sel);
    b.pinMode(remote_accel_minus_sel, b.OUTPUT);
    console.log("setting output mode for pin: " + remote_steer_plus_sel);
    b.pinMode(remote_steer_plus_sel, b.OUTPUT);
    console.log("setting output mode for pin: " + remote_steer_minus_sel);
    b.pinMode(remote_steer_minus_sel, b.OUTPUT);
    console.log("Initialized output pins");
    b.digitalWrite(rm_plus_sel, rm_plus_state);
    b.digitalWrite(rm_minus_sel, rm_minus_state);
    b.digitalWrite(remote_accel_plus_sel, remote_accel_plus_state);
    b.digitalWrite(remote_accel_minus_sel, remote_accel_minus_state);
    b.digitalWrite(remote_steer_plus_sel, remote_steer_plus_state);
    b.digitalWrite(remote_steer_minus_sel, remote_steer_minus_state);
    console.log("All outputs set to low");
}

util.inherits(Relays, events.EventEmitter);

Relays.prototype.execDriveCmd = function(drive_cmd) {
    console.log('Relays - executing command: ', drive_cmd);
    switch (drive_cmd) {
        case driveCmdEnum.REMOTE_UP:
            this.rm_plus_state = b.HIGH;
            this.rm_minus_state = b.HIGH;
            console.log('setting rm_plus_sel (P9_40) to high')
            b.digitalWrite(this.rm_plus_sel, this.rm_plus_state);
            console.log('setting rm_minus_sel (P9_15) to high')
            b.digitalWrite(this.rm_minus_sel, this.rm_minus_state);
            console.log("Remote state up");
            break;
        
        case driveCmdEnum.REMOTE_DOWN:
            this.rm_plus_state = b.LOW;
            this.rm_minus_state = b.LOW;
            b.digitalWrite(this.rm_plus_sel, this.rm_plus_state);
            console.log('setting rm_plus_sel (P9_40) to low')
            b.digitalWrite(this.rm_minus_sel, this.rm_minus_state);
            console.log('setting rm_minus_sel (P9_15) to low')
            console.log("Remote state down");
            break;
        
        case driveCmdEnum.FORWARD_UP:
            this.remote_accel_plus_state = b.HIGH;
            console.log('setting remote_accel_plus_state (P9_23) to high')
            b.digitalWrite(this.remote_accel_plus_sel, this.remote_accel_plus_state);
            console.log("Forward state up");
            break;
        
        case driveCmdEnum.FORWARD_DOWN:
            this.remote_accel_plus_state = b.LOW;
            console.log('setting remote_accel_plus_state (P9_23) to low')
            b.digitalWrite(this.remote_accel_plus_sel, this.remote_accel_plus_state);
            console.log("Forward state down");
            break;
        
        case driveCmdEnum.BACK_UP:
            this.remote_accel_minus_state = b.HIGH;
            console.log('setting remote_accel_minus_state (P9_25) to high')
            b.digitalWrite(this.remote_accel_minus_sel, this.remote_accel_minus_state);
            console.log("Back state up");
            break;
        
        case driveCmdEnum.BACK_DOWN:
            this.remote_accel_minus_state = b.LOW;
            console.log('setting remote_accel_minus_state (P9_25) to low')
            b.digitalWrite(this.remote_accel_minus_sel, this.remote_accel_minus_state);
            console.log("Back state down");
            break;
            
        case driveCmdEnum.RIGHT_UP:
            this.remote_steer_plus_state = b.HIGH;
            console.log('setting remote_steer_plus_state (P9_27) to high')
            b.digitalWrite(this.remote_steer_plus_sel, this.remote_steer_plus_state);
            console.log("Right state up");
            break;
        
        case driveCmdEnum.RIGHT_DOWN:
            this.remote_steer_plus_state = b.LOW;
            console.log('setting remote_steer_plus_state (P9_27) to low')
            b.digitalWrite(this.remote_steer_plus_sel, this.remote_steer_plus_state);
            console.log("Right state down");
            break;
            
        case driveCmdEnum.LEFT_UP:
            this.remote_steer_minus_state = b.HIGH;
            console.log('setting remote_steer_minus_state (P9_30) to high')
            b.digitalWrite(this.remote_steer_minus_sel, this.remote_steer_minus_state);
            console.log("Left state up");
            break;
        
        case driveCmdEnum.LEFT_DOWN:
            this.remote_steer_minus_state = b.LOW;
            console.log('setting remote_steer_minus_state (P9_30) to low')
            b.digitalWrite(this.remote_steer_minus_sel, this.remote_steer_minus_state);
            console.log("Left state down");
            break;
            
    }
    
}

module.exports.Relays = Relays;
module.exports.driveCmdEnum = driveCmdEnum;