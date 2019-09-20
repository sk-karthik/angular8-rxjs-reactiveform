const mongoose = require('mongoose')
var mongouri = process.env.MONGODB_URL;
console.log(mongouri);
var db = mongoose.connect(mongouri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    //  authSource: 'admin',
}).then(() => {
    console.log("Connected to Database");
}).catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
});


