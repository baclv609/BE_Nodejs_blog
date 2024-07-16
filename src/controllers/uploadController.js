// import cloudinary from "../config/cloudinaryConfig.js";

// class uploadController {
//     async uploadsImages(req, res) {
//         try {
//             const images = req.files.map((file) => file.path);

//             const uploadedImages = [];

//             for (const image of images) {

//                 const result = await cloudinary.uploader.upload(image);
//                 uploadedImages.push({
//                     url: result.secure_url,
//                     publicId: result.public_id
//                 });
//             }
//             return res.status(200).json({
//                 message: "Images uploaded successfully",
//                 data: uploadedImages
//             })
//         } catch (error) {
//             res.status(500).json({
//                 name: error.name,
//                 message: error.message
//             });
//         }
//     }
// }
// export default uploadController;