import Category from '../models/Category.js';
import { categoryValid } from '../validation/category.js';

class categoryController {
    async getAll(req, res) {
        try {
            const categories = await Category.find({}).populate("posts");
            if (!categories) return res.status(400).json({ message: "Không có danh mục nào" })
            return res.json({
                message: "Tất cả danh mục",
                datas: categories
            });
        } catch (error) {
            return res.status(400).json({ error: error.name, message: error.message });
        }
    }
    async getDetail(req, res) {
        try {
            const categorie = await Category.findById(req.params.id).populate("posts");
            if (!categorie) return res.status(400).json({ message: "Không tìm thấy danh mục" })
            return res.status(200).json({
                message: "Danh mục",
                datas: categorie
            });
        } catch (error) {
            return res.status(400).json({
                error: error.name,
                message: error.message
            });
        }
    }

    async create(req, res) {
        try {
            // validation
            const { error } = categoryValid.validate(req.body, { abortEarly: false })
            if (error) {
                const errors = error.details.map(err => err.message)
                return res.status(400).json({
                    message: errors
                })
            }
            const category = await Category.create(req.body);
            if (!category) {
                return res.status(400).json({ message: "Tạo danh mục thất bại" })
            }

            // update posts 
            const updateCategory = await Category.findByIdAndUpdate(category.categoryId, {
                $addToSet: { posts: category._id } // thêm id của post vào mảng posts của category
            })

            if (!updateCategory) return res.status(400).json({ message: "Cập nhật danh mục thất bại" });
            return res.status(200).json({
                message: "Tạo danh mục thành công!",
                data: category
            });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    async update(req, res) {
        try {
            // validation
            const { error } = categoryValid.validate(req.body, { abortEarly: false })
            if (error) {
                const errors = error.details.map(err => err.message)
                return res.status(400).json({
                    message: errors
                })
            }

            const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!category) return res.status(400).json({ message: "Cập nhật danh mục thất bại" })
            return res.status(200).json({
                message: "Cập nhật danh mục thành công",
                data: category
            });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const category = await Category.findByIdAndDelete(req.params.id);
            if (!category) return res.status(400).json({ message: "Xóa danh mục thất bại" })
            return res.status(200).json({
                message: "Xóa danh mục thành công",
                data: category
            });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}
export default new categoryController();