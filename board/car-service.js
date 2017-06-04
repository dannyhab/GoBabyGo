var util = require('util');
var bleno = require('bleno');

var remote_char = require('./car_remote_char')
var forward_char = require('./car_forward_char')
var back_char = require('./car_back_char')
var right_char = require('./car_right_char')
var left_char = require('./car_left_char')

function CarService(car) {
    bleno.PrimaryService.call(this, {
        uuid: '4A98DFDF1CC4E7C1C757F1267DD021E8',
        characteristics: [
            new remote_char(car),
            new forward_char(car),
            new back_char(car),
			new right_char(car),
			new left_char(car)
        ]
    });
}

util.inherits(CarService, bleno.PrimaryService);

module.exports = CarService;
