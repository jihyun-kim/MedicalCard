const { rejects } = require('assert');
const { resolve } = require('path');


exports.generateImages = function(idno, name){
	return new Promise((resolve, rejects) => {

		
		console.log("idno ", idno);
		const fs = require('fs')
		const { createCanvas, loadImage } = require('canvas')
		const path = require("path");

		// ID1(ISO규격)   85.6 : 54  ===>  1200:737
		const width = 1200
		const height = 737


		const canvas = createCanvas(width, height)
		const context = canvas.getContext('2d')

		//context.fillStyle = '#000'
		context.fillStyle = '#FFF'
		context.fillRect(0, 0, width, height)

		context.font = '35pt 굴림체'
		context.textAlign = 'center'
		context.textBaseline = 'top'
		context.fillStyle = '#3574d4'
		//context.fillStyle = '#FFFFFF'
		
		// first line
		//진료카드
		context.fillStyle = '#000'
		//context.font = 'bold 30pt Arial'
		context.textAlign = 'left'
		context.fillText('진료카드', 953, 54)

		loadImage('./public/images/top_logo.png').then(image => {
			// 바코드 이미지
			context.drawImage(image, 126, 163, 546, 136)
		})


		//등록번호
		context.fillStyle = '#000'
		//context.font = 'bold 30pt Arial'
		context.textAlign = 'left'
		context.fillText(idno, 140, 450)

		// 이름
		//const text = name;
		//const textWidth = context.measureText(text).width
		//context.fillRect(600 - textWidth / 2 - 10, 170 - 5, textWidth + 20, 120)
		context.fillStyle = '#000'
		context.textAlign = 'left'
		context.fillText(name, 616, 450)

		//
		var fileName = idno + '.png';
		var filePath = path.join(__dirname, '../public/images/barcodes', fileName);  
		
		//console.log('filePath', filePath)

		loadImage(filePath).then(image => {
			// 바코드 이미지
			context.drawImage(image, 602, 545, 490, 136)
			const buffer = canvas.toBuffer('image/png')
			fs.writeFileSync('./public/images/datas/' + idno + '.png', buffer)
		})

		//console.log("Image done");
		resolve(10);
	});
};
