import mongoose, { mongo } from "mongoose";
import dotenv from 'dotenv';
dotenv.config();


mongoose.connect(process.env.URI)

const ObjectId = mongoose.Types.ObjectId;
const { Schema } = mongoose;

const userSchema = new Schema({
    email : {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String,
})

const adminSchema = new Schema({
    email : {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String,
})

const courseSchema = new Schema({
    email : {type: String, unique: true},
    title: String,
    description: String,
    price: Number,
    imageUrl: String,
    creatorId: ObjectId,
})

const purchaseSchema = new Schema({
    courseId: ObjectId,
    userId: ObjectId,
})


const userModel = mongoose.model("user", userSchema);
const adminModel = mongoose.model("admin", adminSchema);
const courseModel = mongoose.model('course', courseSchema);
const purchaseModel =  mongoose.model('purchase', purchaseSchema)

export {
    userModel,
    adminModel,
    courseModel,
    purchaseModel,
}