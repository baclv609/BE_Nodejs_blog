import Users from '../models/Users.js';
import { loginValidation, userValidation } from '../validation/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const { SECRET_CODE, ACCESS_TOKEN_LIFE } = process.env

class authController {
    // [GET] /auth
    async listAccount(req, res) {
        try {
            const listAccount = await Users.find();
            if (!listAccount) {
                return res.status(404).json({
                    message: "Không tìm thấy tài khoản"
                })
            }
            return res.status(200).json({
                message: "Đã tìm thấy tài khoản",
                data: listAccount
            })
        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    }

    // [POST] /auth/register
    async register(req, res) {
        try {
            //B1: validation
            const { error } = userValidation.validate(req.body, { abortEarly: true });
            if (error) {
                const errorMessages = error.details.map(error => error.message);
                // error.details là một mảng chứa các lỗi, mỗi lỗi là một object 
                return res.status(400).json({
                    message: errorMessages // trả về mảng chứa các lỗi
                })
            }
            //B2: kiem tra xem email da ton tai chua
            const userExit = await Users.findOne({ email: req.body.email })
            if (userExit) {
                return res.status(400).json({
                    message: "Email đã được đăng ký, bạn có muốn đăng nhập không?"
                })
            }
            //B3: Mã hóa password
            const hashedPassword = await bcrypt.hash(req.body.password, 10); // 10 là số lần mã hóa
            // hash là một hàm băm, dùng để mã hóa password

            //B4: khởi tạo user trong db
            const user = await Users.create({
                // ...req.body,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                phone: req.body.phone,
                email: req.body.email,
                role: req.body.role,
                password: hashedPassword // dải password bằng đoan mã mã hóa
            })
            //B5: Thông báo cho người dùng đăng ký thành công 
            // xóa mật khẩu đi 
            if (user) {
                user.password = undefined
                user.confirmPassword = undefined

                return res.status(200).json({
                    message: "Đăng ký account thành công!",
                    user
                })
            } else {
                return res.status(500).json({
                    message: "Đăng ký account thất bại!"
                })
            }

        } catch (error) {
            return res.status(500).json({
                name: error.name,
                message: error.message
            })
        }
    }

    // [POST] /auth/login
    async login(req, res) {
        try {
            // B1: validation
            const { error } = loginValidation.validate(req.body, { abortEarly: true });
            if (error) {
                const errorMessages = error.details.map(error => error.message);
                return res.status(400).json({
                    message: errorMessages
                })
            }
            // B2: kiểm tra xem email đã tồn tại chưa
            const user = await Users.findOne({ email: req.body.email })

            if (!user) {
                return res.status(404).json({
                    message: "Email này chưa được đăng ký, bạn có muốn đăng ký không!"
                })
            }
            // B3: so sánh password
            const isMath = await bcrypt.compare(req.body.password, user.password)
            if (!isMath) {
                return res.status(400).json({
                    message: "Mật khẩu không đúng!"
                })
            }

            // B4: tạo jwt token 
            const accessToken = jwt.sign({ _id: user._id }, SECRET_CODE, { expiresIn: ACCESS_TOKEN_LIFE })

            const resExpiresIn = Math.floor(Date.now() / 1000) + 3600; // expiresIn là 1 hour

            // B5: trả về token cho người dùng

            if (accessToken) {
                user.password = undefined
                user.confirmPassword = undefined
                return res.status(200).json({
                    message: "Thành công",
                    user,
                    accessToken,
                    expiresIn: resExpiresIn,
                })
            }
        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    }

    async refreshToken(req, res) {
        try {
            const { access_token } = req.body;
            var decoded = jwt.verify(access_token, SECRET_CODE);

            const accecsToken_refesh = jwt.sign({ _id: decoded._id }, SECRET_CODE, { expiresIn: ACCESS_TOKEN_LIFE });
            const resExpiresIn = Math.floor(Date.now() / 1000) + 3600; // Ví dụ expiresIn là 1 hour

            // Trả về `accessToken` mới và thời gian hết hạn mới
            return res.status(200).json({
                message: "Refresh token thành công",
                accessToken: accecsToken_refesh,
                expiresIn: resExpiresIn,
            });
        } catch (error) {
            return res.status(500).json({
                message: "Lỗi refresh token: " + error.message,
            });
        }
    }

    async userinfo(req, res) {
        // lấy token từ header
        const { access_token } = await req.body;

        // kiểm tra token
        if (!access_token) {
            return res.status(401).json({
                message: "Token không hợp lệ" // không có token
            });
        }

        try {
            // giải mã token
            const decoded = jwt.verify(access_token, SECRET_CODE);
            const user = await Users.findOne({ _id: decoded._id })


            let permissions = [];
            if (user.role === 'admin') {
                permissions = ['user.list', 'user.create', 'user.update', 'user.delete'];
            } else {
                permissions = ['user.list'];
            }
            // check permissions 
            const data = {
                user: {
                    _id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    phone: user.phone,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                    email: user.email,
                    role: user.role
                },
                // trả về thông tin user và permissons 
                permissions
            };

            // Return user information and permissions
            res.status(200).json({
                message: "Thành công",
                data: data
            });
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                // Token đã hết hạn
                return res.status(401).json({ message: "Token đã hết hạn" });
            } else {
                // Lỗi khác liên quan đến JWT
                return res.status(401).json({ message: "Token không hợp lệ 3" });
            }
        }
    }
}
export default new authController();  