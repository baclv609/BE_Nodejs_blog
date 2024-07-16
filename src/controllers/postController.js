import Posts from '../models/Posts.js';
import { postValid } from '../validation/post.js';

class postController {
    // [GET] /posts
    async allPosts(req, res) {
        try {
            // const allPosts = await Posts.find().populate("categoryId")
            const { _page = 1, _limit = 10, _sort = "createdAt", _order = "esc" } = req.query;
            const options = {
                page: _page, // trang hiện tại
                limit: _limit, // giới hạn số lượng sản phẩm trên 1 trang
                sort: { [_sort]: _order === "asc" ? 1 : - 1 } // _sort là tên trường cần sắp xếp, _order là thứ tự sắp xếp
            }
            const allPosts = await Posts.paginate({}, options)
            // console.log(allPosts);

            if (!allPosts.docs || allPosts.docs.length === 0) {
                return res.status(404).json({
                    message: "Không tìm thấy sản phẩm"
                })
            }
            return res.status(200).json({
                message: "Đã tìm thấy sản phẩm",
                datas: allPosts
            })
        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    }

    // [GET] /posts/:id
    async getDetail(req, res) {
        try {
            const id = req.params.id;
            const post = await Posts.findById(id).populate("categoryId");
            if (!post) {
                return res.status(404).json({
                    message: "Product not found",
                });
            }
            return res.status(200).json({
                message: "Product found",
                data: post,
            });
        } catch (error) {
            return res.status(500).json({
                message: "An error occurred while fetching the product",
            });
        }
    }
    // [POST] /posts
    async create(req, res) {
        try {
            const { error } = postValid.validate(req.body) // kiem tra xem du lieu co dung dinh dang khong
            if (error) {
                return res.status(400).json({
                    message: error.message
                })
            }
            const createPost = Posts.create(req.body)
            if (!createPost) {
                return res.status(500).json({
                    message: "Tao san pham khong thanh cong",
                })
            }
            return res.status(200).json({
                message: "Them thanh cong san pham",
                datas: createPost
            })
        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    }

    //[PUT] update
    async update(req, res) {
        try {
            // console.log(req.body)
            const { error } = postValid.validate(req.body, { abortEarly: false })
            if (error) {
                return res.status(400).json({
                    message: error.message
                })
            }
            const id = req.params.id;
            const post = await Posts.findByIdAndUpdate(id, req.body)
            if (!post) {
                return res.status(404).json({
                    message: "Cap nhat Khong thanh cong"
                })
            }
            return res.status(200).json({
                message: "Cap nhat thanh cong",
                datas: post
            })
        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    }

    // [DELETE] /posts/:id
    async deletePost(req, res) {
        try {
            const id = req.params.id;
            const post = await Posts.findByIdAndDelete(id)
            if (!post) {
                return res.status(404).json({
                    message: "Xoa Khong thanh cong"
                })
            }
            return res.status(200).json({
                message: "Xoa thanh cong",
            })
        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    }
}
export default new postController();