const API_URL_RANDOM = `https://api.thecatapi.com/v1/images/search?limit=3&api_key=live_sqpsENmpAyvX0fYFNDybBeUHdldOJYrBdy3666fkep6Po2Dp3db9YiYEPE17XOLs`;

const API_URL_FAVOURITES = `https://api.thecatapi.com/v1/favourites?&api_key=live_sqpsENmpAyvX0fYFNDybBeUHdldOJYrBdy3666fkep6Po2Dp3db9YiYEPE17XOLs`;

const span_error = document.getElementById('error');

async function load_random_michis() {
    const res = await fetch(API_URL_RANDOM);
    const data = await res.json();

    console.log('ran');
    console.log(data);

    if (res.status !== 200){
        span_error.innerText = `Hubo un error: ${res.status}`;
    } else{
        const img0 = document.querySelector('#img0');
        
        const save_michi = document.querySelector('#save_michi')
        
        img0.src = data[0].url
    
        save_michi.onclick = () => save_fav_michi(data[0].id);
    }
}

async function load_fav_michis() {
    const res = await fetch(API_URL_FAVOURITES);
    const data = await res.json();

    console.log('fav');
    console.log(data);

    if (res.status !== 200){
        span_error.innerText = `Hubo un error: ${res.status} ${data.message}`;
    } else{
        data.forEach(michi => {
            const section = document.querySelector('#favourites_michis')
            const article = document.createElement('article')
            const img = document.createElement('img')
            const button = document.createElement('button')
            const button_text = document.createTextNode('sacar al michi de favoritos');
            button.append(button_text);
            img.src = michi.image.url
            img.width = 150;
            article.append(img);
            article.append(button);
            section.append(article);
            
        })
    }
}

async function save_fav_michi(id) {
    const res = await fetch(API_URL_FAVOURITES, {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
        },
        body : JSON.stringify({
            image_id : id
        }),
    });
    
    const data = await res.json();
    console.log('save')
    console.log(res)

    if (res.status !== 200){
        span_error.innerText = `Hubo un error: ${res.status} ${data.message}`;
    }
}

load_random_michis();
load_fav_michis();

