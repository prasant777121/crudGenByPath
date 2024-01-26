import multer from 'multer';

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads");
    },
    filename: function (req, file, cb) {
        cb(null, "image.jpg");
    }
});

var upload = multer({ storage: storage });

export { upload };