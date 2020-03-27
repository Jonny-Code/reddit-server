const mongoose = require("mongoose");
const mongoDB = process.env.MONGODB_URI || "mongodb://localhost/reddit-api-v2";
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);
mongoose.set("useFindAndModify", false);
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
module.exports = mongoose;
