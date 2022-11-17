const API_URL_RANDOM = `https://api.thecatapi.com/v1/images/search?limit=3&api_key=live_sqpsENmpAyvX0fYFNDybBeUHdldOJYrBdy3666fkep6Po2Dp3db9YiYEPE17XOLs`;

const API_URL_FAVOURITES = `https://api.thecatapi.com/v1/favourites`;

const API_URL_FAVOURITES_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}`;

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
    const res = await fetch(API_URL_FAVOURITES, {
        method : 'GET',
        headers : {
            'X-API-KEY': 'live_sqpsENmpAyvX0fYFNDybBeUHdldOJYrBdy3666fkep6Po2Dp3db9YiYEPE17XOLs',
        },

    }
        );
    const data = await res.json();

    console.log('fav');
    console.log(data);

    if (res.status !== 200){
        span_error.innerText = `Hubo un error: ${res.status} ${data.message}`;
    } else{
        const section = document.querySelector('#favourites_michis')
        section.innerHTML = '';
        const h2 = document.createElement('h2');
        const h2_text = document.createTextNode('Michis Favourites');
        h2.append(h2_text);
        section.append(h2)

        data.forEach(michi => {
            const article = document.createElement('article')
            const img = document.createElement('img')
            const button = document.createElement('button')
            const button_text = document.createTextNode('Remove michi from favourites');
            button.append(button_text);
            button.onclick = () => remove_fav_michi(michi.id);
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
            'X-API-KEY': 'live_sqpsENmpAyvX0fYFNDybBeUHdldOJYrBdy3666fkep6Po2Dp3db9YiYEPE17XOLs',
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
    } else {
        console.log(`Michis has been save it`);
        load_fav_michis();
    }
}

async function remove_fav_michi(id){
    const res = await fetch(API_URL_FAVOURITES_DELETE(id), {
        method : 'DELETE',
    });
    
    const data = await res.json();

    if (res.status !== 200){
        span_error.innerText = `Hubo un error: ${res.status} ${data.message}`;
    } else {
        console.log(`Michis has been delete it`);
        load_fav_michis();
    }
}

async function upload_michis_photo() {
    const form = document.getElementById('upload_file_form');
    const form_data = new FormData(form);    
    console.log(form_data.get('file'))
}
load_random_michis();
load_fav_michis();

