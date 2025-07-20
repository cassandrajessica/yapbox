import mongoose from "mongoose";
const { Schema, model } = mongoose;
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String, 
        required: true,
    },
    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true
    }

});

// hash user password before saving
userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

const User = model("User", userSchema);

export default User;