function toggle_element(element_id, default_display_mode, display_mode_to_toggle_between) {
    let element = document.getElementById(element_id)

    element.style.display == default_display_mode ?
        element.style.display = display_mode_to_toggle_between
        : element.style.display = default_display_mode
}

function reload_embed(element_id) {
    let element = document.getElementById(element_id)
    element.src = element.src
}
