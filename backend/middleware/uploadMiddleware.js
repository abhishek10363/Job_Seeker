     import multer from "multer";
     import path from "path";
     import fs from "fs";
    //  Ensure uploads directory status
    const uploadDir = 'uploads';
    if (!fs.existsSync(uploadDir))
        fs.mkdirSync(uploadDir);
    // set storage engine
    const storage = multer.diskStorage({
        destination(req, file, cb) {
          cb(null, 'uploads/');
        },
        filename(req, file, cb) {
          cb(null, `${Date.now()}-${file.originalname}`);
        },
      });
      
      // File filter (PDF only)
      const fileFilter = (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        if (ext === '.pdf') {
          cb(null, true);
        } else {
          cb(new Error('Only PDF files are allowed'), false);
        }
      };
    const upload = multer({storage,fileFilter});
    export default upload;