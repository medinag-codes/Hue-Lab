var trash = document.getElementsByClassName("fa-trash-o");
const video = document.getElementById('video');
const picture = document.getElementById('picture');

const canvas = document.getElementById('canvas');
const ctx = picture.getContext('2d');

// 🎥 Start camera
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => video.srcObject = stream)
  .catch(err => console.error("Camera access denied:", err));

document.querySelector('.captureBtn').addEventListener('click', captureColor)      
function captureColor() {
ctx.drawImage(video, 0, 0, picture.width, picture.height);

}

document.querySelector('#pickColor').addEventListener('click', pickColor)

async function pickColor() {
  if (!window.EyeDropper) {
    alert('Your browser does not support EyeDropper API.');
    return;
  }

  const eyeDropper = new EyeDropper();
  try {
    const result = await eyeDropper.open();
    const hex = result.sRGBHex;
    document.getElementById('swatch').style.backgroundColor = hex;

    const rgb = hexToRgb(hex);
    console.log("RGB:", rgb);

    const formula = generateFoundationFormula(rgb);
    console.log("Formula:", formula);

    // Display formula
    document.getElementById('formula').textContent =
      formula.map(f => `${f.percent}% ${f.pigment}`).join('\n');

  } catch (err) {
    console.error(err);
  }
}

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

function generateFoundationFormula(rgb) {
  const [r, g, b] = rgb;
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;

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

Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const hex = this.parentNode.parentNode.childNodes[3].innerText
        const formula = this.parentNode.parentNode.childNodes[5].innerText
        fetch('formuula', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'name': name,
            'hex': hex,
            'formula' : formula
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
