import mongoose from "mongoose";

const newCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        minLength: 5,
        defaultValue: "Uncategorized"
    },
    slug: {
        type: String,
        require: true,
        defaultValue: "Uncategorized"
    },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Posts'
        }
    ]
}, {
    versionKey: false,
    timestamps: true
});
export default mongoose.model('Category', newCategorySchema);