let navigator_bar = document.getElementById("navigator")

function navigator_switch_theme(dark) {
    dark ?
        navigator_bar.classList.add("dark")
        : navigator_bar.classList.remove("dark")
}