const translation = {
    "en-US": {
        "txt_hallo": "Hello World",
        "txt_title": "Bible Online",
        "txt_navbar_about": "About",
        "txt_navbar_language": "Language",
        "txt_bibles_language": "Language:",
        "txt_bibles": "Select the bible:",
        "txt_books": "Select book:",
        "txt_chapter": "Chapter",
        "txt_chapters": "Chapters:"
    },
    "pt-BR": {
        "txt_hallo": "Olá Mundo",
        "txt_title": "Bíblia Online",
        "txt_navbar_about": "Sobre",
        "txt_navbar_language": "Idioma",
        "txt_bibles_language": "Idioma:",
        "txt_bibles": "Selecione a bíblia:",
        "txt_books": "Selecione o livro:",
        "txt_chapter": "Capítulo",
        "txt_chapters": "Capítulos:"
    }
}

const default_app_lang = navigator.language || navigator.userLanguage;

const url_params = new URLSearchParams(window.location.search);

if (sessionStorage.getItem("app_lang") === null) {
    sessionStorage.setItem("app_lang", url_params.get("lang") || default_app_lang);
} else if (url_params.get("lang") !== null) {
    sessionStorage.setItem("app_lang", url_params.get("lang"));
}

const translate = function () {
    for (const [key, value] of Object.entries(translation[sessionStorage.getItem("app_lang")])) {
        document.querySelectorAll(`.${key}`).forEach(el => {
            el.textContent = value;
        })
    }
}
