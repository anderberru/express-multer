var express = require('express');
var router = express.Router();
const multer  = require('multer')
var url = require('url');
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
    console.log(file)
    if (file.originalname.split('.')[1] === "png" || file.originalname.split('.')[1] === "jpg"){
        // To reject this file pass `false`, like so:
        
        cb(null, true)
    } else {
        // To accept the file pass `true`, like so:
        cb(new Error('Error: File must be a png or jpg'), false)
    }
  
    // You can always pass an error if something goes wrong:
    //cb(new Error('I don\'t have a clue!'))
  
}

const upload = multer({ dest: 'uploads/', storage: storage, fileFilter: fileFilter, limits:{fileSize: 2*1024*1024} })

/* GET home page. */
router.get('/', function(req, res, next) {
    res.redirect('form.html');
});

router.post('/', upload.single('avatar'), function (req, res, next) {
    
    // req.body will hold the text fields, if there were any
    //res.send("Jasota")
    var fullUrl = url.format({protocol: req.protocol, host: req.get('host'), pathname: "/" + req.file.destination + req.file.filename})
    //var fullUrl = req.protocol + '://' + req.get('host') + "/" + req.file.destination + req.file.filename;
    let mezua = "Kaixo " + req.body.name + ": " + fullUrl
    res.json({message : mezua})
    
})



module.exports = router;
