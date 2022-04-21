let pages = document.getElementsByClassName("page")

function switch_page(id) {
    let page = document.getElementById(id)

    for(let i = 0; i < pages.length; i++){
        pages[i].classList.remove("visible")
    }

    page.classList.add("visible")
}
