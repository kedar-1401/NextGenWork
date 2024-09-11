const mongoose = require("mongoose")


const connectDatabase =async  () => {

    try {
        mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDb Connected...");
        
   } catch (error) {
        console.log("Failed");
        process.exit(0);
   }

}

module.exports = connectDatabase
