const mongoose = require('mongoose');
const { Schema } = mongoose;
// The above line is called destructuring.
// It means mongoose object has a property called Schema.
// Line 2 is equivalent to "const Schema = mongoose.Schema"

const userSchema = new Schema ({
    googleID: String
});

mongoose.model('users', userSchema);