const { rejects } = require('assert');
const { resolve } = require('path');

exports.generateImages = function(idno, name){
	return new Promise((resolve, rejects) => {
		//console.log("idno ", idno);
		const fs = require('fs')
		const { createCanvas, loadImage } = require('canvas')
		const path = require("path");

		// ID1(ISO규격)   85.6 : 54  ===>  1200:737
		const width = 1200
		const height = 737

		const canvas = createCanvas(width, height)
		const context = canvas.getContext('2d')

		//context.fillStyle = '#FFF'
		//context.fillRect(0, 0, width, height)
		roundRect(0, 0, width, height, 50, context);

		context.font = '35pt 굴림체'
		context.textAlign = 'left'
		context.textBaseline = 'top'
		context.fillStyle = '#3574d4'

		//바탕 이미지
		loadImage('./public/images/under_logo.png').then(image => {
			context.drawImage(image, 10, 500, 600, 220)
		})

		// 기본 배경 
		loadImage('./public/images/baseCardImg.png').then(image => {
			context.drawImage(image, 10, 10, 1100, 300)
		})

		//등록번호
		context.fillStyle = '#000'
		context.fillText(idno, 140, 450)

		// 이름
		context.fillStyle = '#000'
		context.fillText(name, 616, 450)

		loadImage('./public/images/barcodes/' + idno + '.png').then(image => {
			// 바코드 이미지
			context.drawImage(image, 602, 545, 490, 136)
			const buffer = canvas.toBuffer('image/png')
			fs.writeFileSync('./public/images/datas/' + idno + '.png', buffer)
		})

		//console.log("Image done");
		resolve(10);
	});
};

// round rectange
function roundRect(x, y, w, h, radius, context)
{
  //var canvas = document.getElementById("canvas6");
  //var context = canvas.getContext("2d");
  var r = x + w;
  var b = y + h;
  context.beginPath();
  context.strokeStyle="white";
  context.fillStyle= 'white';
  context.lineWidth="4";
  context.moveTo(x+radius, y);
  context.lineTo(r-radius, y);
  context.quadraticCurveTo(r, y, r, y+radius);
  context.lineTo(r, y+h-radius);
  context.quadraticCurveTo(r, b, r-radius, b);
  context.lineTo(x+radius, b);
  context.quadraticCurveTo(x, b, x, b-radius);
  context.lineTo(x, y+radius);
  context.quadraticCurveTo(x, y, x+radius, y);
  context.stroke();
  context.fill();
}
