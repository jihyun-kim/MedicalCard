var bwipjs = require('bwip-js')
var fs = require('fs')

exports.generateBarcodeImg = function(code){
    return new Promise((resolve, rejects) => {
        //console.log("img code",code);
        bwipjs.toBuffer({
            bcid:        'code128',       // Barcode type
            text:        code,//'SANJ95270',    // Text to encode
            scale:       5,               // 3x scaling factor
            height:      15,              // Bar height, in millimeters
            //barcolor:    0xFFFFFF , 
            includetext: false,            // Show human-readable text
            //textxalign:  'center',        // Always good to set this
            //textfont:    'Inconsolata',   // Use your custom font
            //textsize:    21               // Font size, in points
        }, function (err, png) {
            if (err) {
                // Decide how to handle the error
                // `err` may be a string or Error object
            } else {
                //console.log("begin to write.");
                // `png` is a Buffer
                // png.length           : PNG file length
                png.readUInt32BE(600);// PNG image width
                png.readUInt32BE(450);// PNG image height
                var wstream = fs.createWriteStream("./public/images/barcodes/" + code + '.png');
                wstream.write(png);
                //wstream.write('Another line\n');
                wstream.end();
                //console.log("barcode done");
                resolve(20);
            }
        });
    });
};
