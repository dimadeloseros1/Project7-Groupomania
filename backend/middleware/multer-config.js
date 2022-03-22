const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',
    'image/png': 'png',
    'image/gif': 'gif'
};

const limits = {
    fileSize: 5 * 1024 * 1024,
    //5 242 880byte/Octets = 5Mo
};

const types = Object.keys(MIME_TYPES)

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        console.log("log MULTER :" ,req, file)
        if (types.includes(file.mimetype)) {
            if (file.fieldname === "posts") {
                callback(null, 'images/posts');
            } else if (file.fieldname === "profile"){
                callback(null,'images/profile')
            } else if (file.fieldname === "comment"){
                console.log(file)
                callback(null,'images/comment')
            }
        } else {
            callback(new Error("Only jpg, jpeg, png, gif"), true)
        }
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        const nameEdit = name.slice(".", -4)
        callback(null, nameEdit + Date.now() + '.' + extension);
    },
});

module.exports = multer({limits, storage}).fields([{name: 'posts', maxCount: 1}, {name: 'profile', maxCount: 1},
    {name: "comment", maxCount: 1}]);