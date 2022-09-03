//
generateBaseImages = function(){
    const fs = require('fs')
    const { createCanvas, loadImage } = require('canvas')

    // ID1(ISO규격)   
    const width = 1200
    const height = 350

    const canvas = createCanvas(width, height)
    const context = canvas.getContext('2d')

    context.fillStyle = '#FFF'
    context.fillRect(0, 0, width, height)

    context.font = '35pt 굴림체'
    context.textAlign = 'left'
    context.textBaseline = 'top'
    context.fillStyle = '#3574d4'
    //context.fillStyle = '#FFFFFF'
    
    //진료카드
    context.fillStyle = '#000'
    context.textAlign = 'left'
    context.fillText('진료카드', 953, 54)

    //병원1 로고
    loadImage('./public/images/top1_logo.png').then(image => {
        context.drawImage(image, 126, 163, 546, 136)
    })

    //병원2 로고
    loadImage('./public/images/top2_logo.png').then(image => {
        // 바코드 이미지
        context.drawImage(image, 700, 163, 546, 136)
        const buffer = canvas.toBuffer('image/png')
        fs.writeFileSync('./public/images/baseCardImg.png', buffer)
    })

    console.log('create images');
}

generateBaseImages();
