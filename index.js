require("dotenv").config();

var bot = require('./output/bot');
require('./web')(bot);
