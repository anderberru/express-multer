var express = require('express');
var router = express.Router();
const multer  = require('multer')
//const upload = multer({ dest: 'uploads/' })

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      const name = file.originalname.split('.')
      cb(null, name[0] + "-" + uniqueSuffix + "." + name[1])
    }
  })
  


function fileFilter (req, file, cb) {

    // The function should call `cb` with a boolean
    // to indicate if the file should be accepted
    if (file.originalname.split('.')[1] === "png" || file.originalname.split('.')[1] === "jpg"){
        // To reject this file pass `false`, like so:
        cb(null, true)
    } else {
        // To accept the file pass `true`, like so:
        cb(new Error('Error: File must be a png'), false)
    }
  
    // You can always pass an error if something goes wrong:
    //cb(new Error('I don\'t have a clue!'))
  
}

const upload = multer({ storage: storage, fileFilter: fileFilter, limits:{fileSize: 2*1024*1024} })

/* GET home page. */
router.get('/', function(req, res, next) {
    res.redirect('form.html');
});

router.post('/', upload.single('avatar'), function (req, res, next) {
    console.log(req.file)
    // req.body will hold the text fields, if there were any
    res.send("Jasota")
})


module.exports = router;
