const mongoose = require('mongoose');

module.exports = async () => {
    const url = "mongodb+srv://mohan1034:lzFqEOnYyyHiFJh3@cluster0.3r80h15.mongodb.net/socialMedia?retryWrites=true&w=majority";
    try {
        await mongoose.connect(url)
        console.log(`mongodb connected ${mongoose.connection.host} : ${mongoose.connection.port}`)
    } catch (error) {
        console.log("connection error", error.message)
        process.exit(1);
    }
    
}