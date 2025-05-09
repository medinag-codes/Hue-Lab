
const video = document.getElementById('video');
const picture = document.getElementById('picture');

const canvas = document.getElementById('canvas');
const ctx = picture.getContext('2d');
let rgb = ""
let hex = ""

// 🎥 Start camera
if(navigator.mediaDevices.getUserMedia){
    navigator.mediaDevices.getUserMedia({video:true})
        .then(function(stream){
            video.srcObject = stream;
        }) 
        .catch (function (error){
            console.log("Something went wrong!")
        })
        document.querySelector('#swatchContainer').classList.add('hidden')
    }
//capture picture from video and draw it in the canvas
document.querySelector('.captureBtn').addEventListener('click', captureColor)      
function captureColor() {
ctx.drawImage(video, 0, 0, picture.width, picture.height);
document.querySelector('#camera-wrapper').classList.add('hidden')
document.querySelector('#matchContainer').classList.remove('hidden')
}
//open eye dropper tool and select a pigment from skin
document.querySelector('#pickColor').addEventListener('click', pickColor)

async function pickColor() {
  
  if (!window.EyeDropper) {
    alert('Your browser does not support EyeDropper API.');
    return;
  }

  const eyeDropper = new EyeDropper();
  try {
    const result = await eyeDropper.open();
    hex = result.sRGBHex;
    document.getElementById('swatch').style.backgroundColor = hex;
    rgb = hexToRgb(hex);
    // video.srcObject = null
    document.querySelector('#swatchContainer').classList.remove('hidden')
    document.querySelector('#matchContainer').classList.add('hidden')
  } catch (err) {
    console.error(err);
  }
}

//generate the cosmetic formula based on the hex color
function generateFoundationFormula(rgb) {
  //array of the r,g,b components
  const [r, g, b] = rgb;
  //normalize r, g, b
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  //estimate how much of each pigment to add for the skintone
  const white = Math.max(0, 1 - (rn + gn + bn) / 3);
  const red = rn;
  const yellow = (rn + gn) / 2;
  const black = 1 - Math.max(rn, gn, bn);

  const total = white + red + yellow + black;
  
  return [
    { pigment: "Titanium Dioxide (White)", percent: (white / total * 100).toFixed(1) },
    { pigment: "Red Iron Oxide", percent: (red / total * 100).toFixed(1) },
    { pigment: "Yellow Iron Oxide", percent: (yellow / total * 100).toFixed(1) },
    { pigment: "Black Iron Oxide", percent: (black / total * 100).toFixed(1) }
  ];
}

//Save email, formula, shade name and hex color to the database
document.querySelector('#formulate').addEventListener('click', saveFormula)

function saveFormula(){
  const formula = generateFoundationFormula(rgb);
  const email = document.querySelector('#email').innerText
  const name = document.querySelector('#shadeName').value

  // Show formula text
  formula.map(f => `${f.percent}% ${f.pigment}`).join('\n')
  fetch('/formula', {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      'email': email,
      'name' : name,
      'hex': hex,
      'formula': formula,
      'isDeleted' : false
    })
  }).then(data => {
    console.log(data)
//hacked it to redirect to profile page client side
    window.location.href = '/profile'
  })
}

//function to convert hex to rgb format
function hexToRgb(hex) {
  hex = hex.replace("#", "");
  if (hex.length === 3) {
    hex = hex.split('').map(h => h + h).join('');
  }
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return [r, g, b];
}
