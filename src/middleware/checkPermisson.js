import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import Users from "../models/Users.js";
dotenv.config()
const { SECRET_CODE } = process.env;

export const checkPermisson = async (req, res, next) => {
    try {
        //B1: Kiểm tra nguoi dung dang nhap hay chua 
        const token = req.headers.authorization?.split(" ")[1]
        //B2: Kiểm tra token    
        if (!token) {
            return res.status(401).json({
                message: "Bạn chưa đăng nhập!"
            })
        }
        //B3: Kiểm tra quyền của người dùng 
        const decoded = jwt.verify(token, SECRET_CODE) // giải mã token
        const user = await Users.findOne({ _id: decoded._id })
        if (!user) {
            return res.status(404).json({
                message: "Không tìm thấy tài khoản"
            })
        }
        if (user.role !== "admin") { // kiểm tra quyền của người dùng
            return res.status(403).json({
                message: "Bạn không có quyền truy cập"
            })
        }
        //B4: next 
        next()
    } catch (error) {
        return res.json({
            name: error.name,
            message: error.message
        })
    }
}