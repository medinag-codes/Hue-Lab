var trash = document.querySelectorAll(".fa-trash");
console.log(trash)
// function to delete formula from database

Array.from(trash).forEach(function(element) {
  element.addEventListener('click', function(e){
    e.preventDefault()
    const name = this.parentNode.childNodes[1].childNodes[1].innerText
    // const hex = 
    console.log(name)
  
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