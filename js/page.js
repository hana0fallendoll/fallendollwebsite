const consent_cookie = "projecth_cookies"

const show_popup = () => !localStorage.getItem(consent_cookie)
const save_cookie = () => localStorage.setItem(consent_cookie, true)
const popup = document.getElementsByClassName("cookies")

window.onload = () => {
    if(show_popup()) {
        popup[0].style.display = "flex"
    }
}

let animation_queue = []

function animation_test(page_id) {
    let elements_to_animate = document.getElementById(page_id).getElementsByClassName("animate_on_scroll")

    for(i = 0; i < elements_to_animate.length; i++) {
        animation_queue.push(elements_to_animate[i])

        if(i == elements_to_animate.length - 1) animate()
    }
}

function animate() {
    for(i = 0; i < animation_queue.length; i++) {
        animation_queue[i].classList.remove("animate_on_scroll")

        if(i == animation_queue.length - 1) animation_queue = []
    }
}
