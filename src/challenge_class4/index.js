const URL = `https://api.thecatapi.com/v1/images/search`;


    fetch(URL)
        .then(res => res.json())
        .then(data => {
        const img = document.querySelector('img');
        img.src = data[0].url
        })


const button = document.createElement('button');
button.innerText = 'reload'

document.body.append(button);

button.addEventListener('click', () => {
    fetch(URL)
        .then(res => res.json())
        .then(data => {
        const img = document.querySelector('img');
        img.src = data[0].url
        })
})


