import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true,
        minLength: 2
    },
    lastName: {
        type: String,
        require: true,
        minLength: 2
    },
    phone: {
        type: Number,
        require: true,
        minLength: 10
    },
    password: {
        type: String,
        require: true,
    },
    confirmPassword: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        unique: true,   // email phải là duy nhất
        require: true,
    },
    role: {
        type: String,
        default: "member",
    }
}, {
    timestamps: true,   
    versionKey: false
})
export default mongoose.model('Users', userSchema);