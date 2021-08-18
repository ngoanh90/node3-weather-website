console.log('this is server side javascript!')



const weatherForm = document.querySelector('form')
const address = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    message1.textContent = 'Loading...'
    fetch('http://localhost:3000/weather?address='+address.value).then((response) => {
        response.json().then(({error, message} = {}) => {
            if (error) {
                message1.textContent = error
            }else {
                message1.textContent = message
            }
        })
    })
})