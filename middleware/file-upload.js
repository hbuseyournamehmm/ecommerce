const multer = require('multer')
const fs = require('fs')//fs vaneko file system which is used to read file and send to which destination
const path = require('path')//reads extension



const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        let fileDestination = 'public/uploads/'



        //check if directory exists
        if (!fs.existsSync(fileDestination)) {
            fs.mkdirSync(fileDestination, { recursive: true })
            // recursive:truecreates parent folder as well as sub folders
            cb(null, fileDestination)

        } else {
            cb(null, fileDestination)
        }
    },

    filename: (req, file, cb) => {
        let filename = path.basename(file.originalname, path.extname(file.originalname))
        let ext = path.extname(file.originalname)
        cb(null, filename + '_' + Date.now() + ext)
    },
})


let imageFileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|svg|JPG|JPEG|PNG|SVG)$/)) {
        return cb(new Error('You can upload an image file only'), false)
    }
    cb(null, true)



}
let upload = multer({
    storage: storage,
    fileFilter: imageFileFilter,
    limits: {

        fileSize: 2000000,//2mb
    },
})
module.exports = upload;