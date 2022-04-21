let pages_id = ["landing_page", "about_page", "operators_page", "platforms_page", "patreon_page", "newsletter_page"]

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
    let direction = event.deltaY
    
    if (current_page == 0 && direction < 0) return
    if (current_page == pages.length - 1 && direction > 0) return

    if (scrolled == 1) return
    scrolled = 1

    scroll(direction)

    setTimeout(() => {
        scrolled = 0
    }, 300)
}

function scroll(direction) {
    direction == 100 ?
        current_page++
        : current_page--

    pages[current_page].scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})

    if(current_page == 0) return
    animation_test(pages_id[current_page])
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

window.addEventListener("mousedown", (e) => {
    if(e.buttons == 4) e.preventDefault()
})
