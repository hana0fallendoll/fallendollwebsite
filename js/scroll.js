let fallendoll = document.getElementById("fallendoll") // gets the fallen doll landing page.
let fallen_doll_fade_elements = fallendoll.getElementsByClassName("fade") // gets the fade element within it.
let fallen_doll_fade_element = fallen_doll_fade_elements[0] // gets the first fade element

let pages_id = ["landing", "fallendoll", "what"]

let pages = []

get_pages()

window.addEventListener("wheel", e => e.preventDefault(), { passive: false })

// When scroll input is detected, scroll_page
window.onwheel = scroll_page

// When window resizes, resize()
window.onresize = resize

let current_page = 0

let scrolled = 0
function scroll_page(event) {
    if (scrolled == 1) return
    scrolled = 1

    let direction = event.deltaY

    scroll(direction)

    setTimeout(() => {
        scrolled = 0
    }, 300)
}

function scroll(direction) {
    if (current_page == 0 && direction < 0) return

    if (current_page == pages.length - 1 && direction > 0) return

    direction == 100 ?
        current_page++
        : current_page--

    pages[current_page].scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})

    if(current_page == 1) fallen_doll_fade_element.style.opacity = 0;
}

function resize() {
    pages[current_page].scrollIntoView()
}

function get_pages() {
    for(let i = 0; i < pages_id.length; i++) {
        let current_element = document.getElementById(pages_id[i])
        pages.push(current_element)
    }    
}

// All keys that can scroll the page in an array.
let keys = ["Space", "ArrowUp", "ArrowDown"]

// Check for all keys that are pressed.
window.addEventListener("keydown", (e) => {
    // If the key that's pressed matches one of the keys in the array, e.preventDefault()
    if (keys.includes(e.code)) e.preventDefault()
})
