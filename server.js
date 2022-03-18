var express = require('express');
var cors = require('cors');
require('dotenv').config();
const multer  = require('multer'); 
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

var app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.use('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  const {originalname, mimetype, size} = req.file;
  res.json({
    name: originalname,
    type: mimetype,
    size
  })
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
