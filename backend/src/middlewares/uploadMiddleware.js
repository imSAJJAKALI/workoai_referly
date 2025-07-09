// import multer from 'multer';
// import multerS3 from 'multer-s3';
// import s3 from '../config/aws.js';
// import path from 'path';

// const fileFilter = (req, file, cb) => {
//   const ext = path.extname(file.originalname).toLowerCase();
//   if (ext === '.pdf') cb(null, true);
//   else cb(new Error('Only .pdf files are allowed!'), false);
// };

// export const upload = multer({
//   fileFilter,
//   storage: multerS3({
//     s3, // ✅ This MUST come from aws-sdk v2
//     bucket: process.env.AWS_BUCKET_NAME || 'workoai',
//     acl: 'public-read',
//     key: (req, file, cb) => {
//       cb(null, `resumes/${Date.now()}-${file.originalname}`);
//     },
//   }),
// });


// middlewares/uploadMiddleware.js
import multer from "multer";

// Store file in memory instead of disk
export const upload = multer({ storage: multer.memoryStorage() });
