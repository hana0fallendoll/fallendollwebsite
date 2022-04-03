let landing_page = document.getElementById("landing") // gets the home screen

let fallendoll = document.getElementById("fallendoll") // gets the fallen doll landing page.
let fallen_doll_fade_elements = fallendoll.getElementsByClassName("fade") // gets the fade element within it.
let fallen_doll_fade_element = fallen_doll_fade_elements[0] // gets the first fade element

let what = document.getElementById("what")

let ease_in_out = (ease) => {
    // Make a cubic bezier for Ease-In-Out animation curve.

    return ease < .5 ?
        4 * ease ** 3
        : (ease - 1) * (2 * ease - 2) ** 2 + 1
}

// When window resizes, check_if_resize()
window.onresize = check_if_resize

// All the pages in an array
let pages = [landing_page, fallendoll, what]

// When the page resizes, they break and are both not fully visible.
// So we have this variable that acts as a backup, so when the pages break, we can scroll back to the page.
let page

// Variable to count the visible pages in the viewport.
let visible_pages = 0;

function check_if_resize() {
    // Reset when the function triggers.
    visible_pages = 0

    // Don't run function if scrolling.
    if(scrolled == 1) return


    // Loop through all the pages.
    for(let i = 0; i < pages.length; i++) {
        // If a page is FULLY visible, execute code.
        if(is_element_fully_in_view(pages[i])) {
            // Increases visible_pages by 1 and saves the visible page into our backup variable
            visible_pages += 1
            page = pages[i]
        }
    }

    // If no pages are FULLY visible in the viewport, scroll to the backup page.
    if(visible_pages == 0) page.scrollIntoView()
}

function save_page() {
    // Reset when the function triggers.
    visible_pages = 0

    // Don't run function if scrolling.
    if(scrolled == 1) return


    // Loop through all the pages.
    for(let i = 0; i < pages.length; i++) {
        // If a page is FULLY visible, execute code.
        if(is_element_fully_in_view(pages[i])) {
            // Increases visible_pages by 1 and saves the visible page into our backup variable
            visible_pages += 1
            page = pages[i]
        }
    }
}

// Prevent mouse input but not page scroll
// Difference between preventing "scroll" and "wheel" is that wheel only prevents input, not scrolling.

window.addEventListener("wheel", e => e.preventDefault(), { passive: false })
window.addEventListener("")

// When scroll input is detected, scroll_page
window.onwheel = scroll_page

let scrolled = 0
function scroll_page(event) {
    /*
        Wheel input -> ScrollFunction()

        ScrollFunction() {
            LINES 1 - 6 (LINES IN FUNCTION)
            ----------------------------------------------------------------------------
            if (has scrolled in past 600 milliseconds, dont execute anything below
            Check if Browser resized (gets the current page and save into variable)
            (not actually checking for resize)


            LINES 8 - 12
            ----------------------------------------------------------------------------
            Get direction of scroll by event.deltaY (event.deltaY == 100 || -100)
            
            if(ScrollUp) scroll up by height of browser
                else scroll down by height of browser

            
            LINES 14
            ----------------------------------------------------------------------------
            Check if Fallen Doll landing page is in view, if so, make it visible
        }
    */

    // Function dependencies: scroll_by() check_if_resize()

    if (scrolled == 1) return
    scrolled = 1
    setTimeout(() => { 
        scrolled = 0
        save_page()
    }, 600)

    let direction = event.deltaY

    direction == 100 ?
        scroll_by(document.body, get_window_height(true), 500, ease_in_out)
        : scroll_by(document.body, get_window_height(false), 500, ease_in_out)

    check_for_fade(fallendoll)
}

function check_for_fade(element) {
    // Every time the user scrolls, fade out the white to make the page visible. (So it appears before the user fully scrolls down)

    /* 
        If the user is not on the page after 500 milliseconds, revert it back to white.
        Set the transition duration to 0ms so it fades instantly.
        After that, reset the transition duration back to 500ms so when the user scrolls back, it animates.
    */

    // Function dependencies: is_element_fully_in_view()

    setTimeout(() => {
        fallen_doll_fade_element.style.opacity = 0
    }, 200);
}

function is_element_fully_in_view(element) {
    // Check if element is FULLY in view
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function get_window_height(positive) {
    /*
        GetWindowHeight() {
            LINES 1 - 4 (LINES IN FUNCTION)
            ----------------------------------------------------------------------------
            Make a new variable called height.

            if(first argument(positive) is TRUE) {
                set height to the height of the window. (positive)
            } else {
                set height to the height of the window. (negative)
            }

            LINES 6 - 7
            ----------------------------------------------------------------------------
            Parse the height value into an integer and store it in a new variable. 
            (This fixes bugs like instant scrolling with no animation)

            Return the new variable.
        }
    */

    let height

    positive ?
        height = window.innerHeight
        : height = `-${window.innerHeight}`

    let parsed = parseInt(height)
    return parsed
}

function scroll_by(element, scroll_amount, animation_duration, easing_function) {
    // I am to lazy to explain everything

    // Function dependencies: ease_in_out()

    /* 
        Parameters: (element) Element you want to scroll
                    (scroll_amount) how much you want to scroll, 
                    (animation_duration) how long the scroll aimation is in milleseconds
                    (easing_function) cubic bezier function.
    */

    let start_time
    let current_scroll_position = element.scrollTop
    let client_height = element.clientHeight
    let maximum_scroll = element.scrollHeight - client_height
    let scroll_destination = Math.min(Math.max(current_scroll_position + scroll_amount, 0), maximum_scroll)

    function scroll (timestamp) {
        start_time = start_time || timestamp
        let elapsed = timestamp - start_time
        element.scrollTop = current_scroll_position + (scroll_destination - current_scroll_position) * easing_function(elapsed / animation_duration)
        elapsed <= animation_duration && window.requestAnimationFrame(scroll)
    }

    if (current_scroll_position != scroll_destination) window.requestAnimationFrame(scroll)
}

// All keys that can scroll the page in an array.
let keys = ["Space", "ArrowUp", "ArrowDown"]

// Check for all keys that are pressed.
window.addEventListener("keydown", (e) => {
    // If the key that's pressed matches one of the keys in the array, e.preventDefault()
    if (keys.includes(e.code)) e.preventDefault()
})