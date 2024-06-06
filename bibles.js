const bibles = {
    "en-US": {
        "description": "English (US)",
        "list": {}
    },
    "pt-BR": {
        "description": "Português (BR)",
        "list": {
            "ACF": "https://raw.githubusercontent.com/WilliamSampaio/pt-BR_ACF/master/data",
            "BKJ1611": "https://raw.githubusercontent.com/WilliamSampaio/pt-BR_BKJ1611/master/data"
        }
    }
}

const get_bible_index = function (base_url) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${base_url}/00.json`, false);
    xhr.send(null);
    if (xhr.status === 200) {
        return JSON.parse(xhr.responseText);
    } else {
        throw new Error(`Request failed (${xhr.status}): ${xhr.statusText}`);
    }
}

const get_chapter = function (lang, slug, book_id, chapter_id) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${bibles[lang].list[slug]}/${book_id}_${chapter_id}.json`, false);
    xhr.send(null);
    if (xhr.status === 200) {
        return JSON.parse(xhr.responseText);
    } else {
        throw new Error(`Request failed (${xhr.status}): ${xhr.statusText}`);
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

const populate_select_bibles = function (selector, lang) {
    select_el = document.querySelector(selector);
    if (select_el === null) return false;
    select_el.innerText = '';
    if (Object.keys(bibles[lang].list).length == 0) {
        select_el.setAttribute('disabled', true);
    } else {
        for (const key of Object.keys(bibles[lang].list)) {
            data = get_bible_index(bibles[lang].list[key])
            let opt = document.createElement('option');
            opt.value = data.slug;
            opt.innerText = data.bible;
            select_el.appendChild(opt);
        }
        select_el.removeAttribute('disabled');
    }
}

const populate_select_books = function (selector, lang, slug) {
    select_el = document.querySelector(selector);
    if (select_el === null) return false;
    select_el.innerText = '';
    try {
        data = get_bible_index(bibles[lang].list[slug])
        if (Object.keys(data.books).length == 0) {
            select_el.setAttribute('disabled', true);
        } else {
            for (const key of Object.keys(data.books).sort()) {
                let opt = document.createElement('option');
                opt.value = `${key}_${data.books[key][1]}`;
                opt.innerText = data.books[key][0];
                select_el.appendChild(opt);
            }
            select_el.removeAttribute('disabled');
        }
    } catch (err) {
        alert('Error!');
    }
}