const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')

const trainerSchema = new Schema({
    username: {
        type: String,
        //This makes sure that the user gives a username.
        required: "A username is required",
        //This ensures that each username is true.
        unique: true,
        //This gets rid of the white space
        trim: true
    },
    email: {
        type: String,
        required: "An email is required",
        unique: true,
        //This ensures that random characters are not punched in. It must follow this format.The first half in the array is regular expression, regex. Anything followed by an at symbol followed by anything followed by a period followed by anything.
        match: [/.+@.+\..+/, "Must match an emal format"]
    },
    password: {
        type: String,
        required: "A password is required",
        minlength: 8
    },
    //This is an association we are setting up
    book: [
        {
            type: Schema.Types.ObjectID,
            ref: 'Book'
        }
    ]
})

//Setting up a middleware to hook into different stages of a model. We will be using the pre middleware to hook into before this gets saved.
trainerSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
        //This is the number that determines the random charachters that are hashed into a password
        const saltRounds = 10
        this.password = await bcrypt.hash(this.password, saltRounds)
    }

    next()
})

userSchema.methods.isCorrectPassword = function(password) {
    //This is reffering to the document that you are calling this method from
    return bcrypt.compare(password, this.password) 
}

const User = model('User', userSchema)

module.exports = User