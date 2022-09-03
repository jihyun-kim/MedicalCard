var express = require('express'); 
var router = express.Router();
var barcode = require('./poles2');
var bodyParser = require('body-parser');
const path = require("path");
var idnoImage = require('./genImage2');
var fs = require("fs");

/* GET */
router.get('/', function(req, res, next) {    
    var idno = req.query.idno;
    var name = req.query.name;
    barcode.generateBarcodeImg(idno).then((data)=>{
        console.log(data);
    });

    res.render('medcard', { idno:idno, name:name });
});  

router.get('/Barcodes', (req, res) => {
    var idno = req.query.idno;
    var name = req.query.name;
    var fileName = idno + '.png';
    var filePath = path.join(__dirname, '../public/images/barcodes', fileName);   
    
    //console.log('GET Barcodes fielPath', idno, name, filePath);
    
    fs.readFile(filePath, (err, data) => {
      if(err) { res.send() }
      res.send(data)
    });

    idnoImage.generateImages(idno, name).then((data)=>{
        console.log(data);
    });
});

/* POST */
router.post('/', function(req, res, next) {
    var idno = req.body.idno;

    var fileName = idno + '.png';
    var filePath = path.join(__dirname, '../public/images/datas', fileName);     

    //console.log("## post request", idno, name , filePath); 
    res.download(filePath, function(err){
        if(err){
            res.json({err:err});
        }else{
            res.end();
        }
    });
});

module.exports = router; 

