const bibles = {
    "en-US": {
        "description": "English (US)",
        "list": []
    },
    "pt-BR": {
        "description": "Português (BR)",
        "list": [
            "https://raw.githubusercontent.com/WilliamSampaio/pt-BR_ACF/main/data/",
            "https://raw.githubusercontent.com/WilliamSampaio/pt-BR_BKJ1611/main/data/"
        ]
    }
}

const ajax_bible_index = function (base_url) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${base_url}/00.json`, false);
    xhr.send(null);
    if (xhr.status === 200) {
        return JSON.parse(xhr.responseText);
    } else {
        throw new Error('Request failed: ' + xhr.statusText);
    }
}

const populate_select_lang_availables = function (selector) {
    select_el = document.querySelector(selector);
    if (select_el === null) return false;
    for (const [key, obj] of Object.entries(bibles)) {
        let opt = document.createElement('option');
        opt.value = key;
        opt.innerText = obj.description;
        if (key == sessionStorage.getItem("app_lang")) {
            opt.setAttribute('selected', true);
        }
        select_el.appendChild(opt);
    }
}
