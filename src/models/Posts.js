import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const newBlogSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        minLength: 5
    },
    content: {
        type: String,
        require: true,
    },
    author: {
        type: String,
    },
    tags: {
        type: Array,
        items: { type: String },
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        require: true
    }

}, {
    timestamps: true,
    versionKey: false
})

newBlogSchema.plugin(mongoosePaginate); // thêm plugin mongoose paginate vào schema

// tạo ra 1 model tên là blog
export default mongoose.model('Posts', newBlogSchema); 