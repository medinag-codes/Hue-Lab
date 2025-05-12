var trash = document.querySelectorAll(".fa-trash");

console.log(trash)

// function to delete formula from database
Array.from(trash).forEach(function(element) {
  element.addEventListener('click', function(e){
    e.preventDefault()
    console.log(this)
    const name = this.parentNode.parentNode.querySelector('#name').innerText
  
    fetch('/formula', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'name' : name,
      })
    }).then(function (response) {
      window.location.reload()
    })
  })
})

let formulaTiles = Array.from(document.querySelectorAll('.formulaTiles'))
for(let i= 0; i < formulaTiles.length; i++){
  const ctx = formulaTiles[i].querySelector('#myChart');
  const config = JSON.parse(ctx.parentElement.querySelector('#chartData').innerText)
  new Chart(ctx, config)
}

