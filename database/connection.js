const mongoose = require("mongoose");
const DB = process.env.DATA_BASE
// const DB = "mongodb+srv://balwantgaur:9460941037@cluster0.ogswyws.mongodb.net/BasicDB?retryWrites=true&w=majority";

mongoose.connect(DB, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
})
    .then(() => {
        console.log("Connection Successful~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
       
    })
    .catch((err) => {
        console.log("No Connection~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~", err);
        
    }); 