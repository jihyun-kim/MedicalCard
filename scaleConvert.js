//  스케일 변경
//  85.6 : 54  ===>  1200:737

function scaleConvert(x, y){
    let ax = 85.6, ay = 54;
    let cx = 1200, cy = 737;

    let sx = cx * x / ax;
    let sy = cy * y / ay;
    
    return [Math.round(sx), Math.round(sy)];
}

let resultByArr = scaleConvert(30, 40);
console.log(resultByArr);