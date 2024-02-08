const videoRefs = [
    824804225, 824804225, 824804225, 824804225, 824804225, 824804225, 824804225,
    824804225,
]
let player
const sliderContainer = document.getElementById("sliderContainer")
sliderContainer.style.height = "260px"
videoRefs.forEach((videoRef, index) => {
    const videoBlock = document.createElement("div")
    const videoBlockTwo = document.createElement("div")
    videoBlock.id = `video${index + 1}`
    videoBlock.style.position = "relative"
    videoBlock.style.width = "240px"
    videoBlock.style.height = "240px"
    videoBlockTwo.classList.add("button_inflame")
    videoBlockTwo.id = index
    videoBlock.appendChild(videoBlockTwo)
    sliderContainer.appendChild(videoBlock)

    const player = new Vimeo.Player(`video${index + 1}`, {
        id: videoRef,
    })
    player.ready()
    sliderContainer.style.width = 240 * 4 + "px"
})

const buttonsIframe = document.querySelectorAll(".button_inflame")
const popUpWrapper = document.getElementById("popUpWrapper")
const popUpContainer = document.getElementById("popUpContainer")
const rightArrow = document.getElementById("right")
const leftArrow = document.getElementById("left")
const paginationContainer = document.getElementById("paginationContainer")
const videoBlock = document.getElementById("videoBlock")
const closeButton = document.getElementById("close")

buttonsIframe.forEach((el) =>
    el.addEventListener("click", (event) => openPopUp(event.target.id))
)
closeButton.addEventListener("click", () => {
    popUpWrapper.classList.remove("show")
    popUpContainer.innerHTML = ""
    paginationContainer.innerHTML = ""
    rightArrow.style.zIndex = 1100
    leftArrow.style.zIndex = 1100
    document.body.style.overflow = "visible"
})

rightArrow.addEventListener("click", () => {
    const offset = sliderContainer.scrollLeft + 960

    const duration = 1000
    smoothScrollTo(sliderContainer, offset, duration)
})

leftArrow.addEventListener("click", () => {
    const offset = sliderContainer.scrollLeft - 960
    const duration = 1000

    smoothScrollTo(sliderContainer, offset, duration)
})
const openPopUp = (id) => {
    popUpWrapper.classList.add("show")
    rightArrow.style.zIndex = 1
    leftArrow.style.zIndex = 1
    document.body.style.overflow = "hidden"
    const videoRef = videoRefs[id]
    videoRefs.forEach((el, index) => {
        const button = document.createElement("button")
        button.type = "button"

        const span = document.createElement("span")
        span.classList.add("point")
        span.setAttribute("data-index", index)
        button.appendChild(span)
        button.classList.add("pagination_button")
        if (index === Number(id)) {
            span.classList.add("current")
        }

        paginationContainer.appendChild(button)
    })
    player = new Vimeo.Player(popUpContainer, {
        id: videoRef,
        autoplay: true,
        fullscreen: true,
        width: "1000px",
        height: "800px",
    })
    player.play()
}

paginationContainer.addEventListener("click", (event) => {
    const target = event.target
    if (target.hasAttribute("data-index")) {
        const allPaginationButton = document.querySelectorAll(".point")
        const index = event.target.getAttribute("data-index")
        allPaginationButton.forEach((el) => el.classList.remove("current"))
        target.classList.add("current")
        player.destroy()
        player = new Vimeo.Player(popUpContainer, {
            id: videoRefs[index],
            autoplay: true,
            fullscreen: true,
            width: "1000px",
            height: "800px",
        })
    }
})

function smoothScrollTo(element, targetPosition, duration) {
    const startPosition = element.scrollLeft
    const distance = targetPosition - startPosition
    let startTime = 0
    const timeIncrement = 20

    function animateScroll() {
        startTime += timeIncrement
        const currentPosition = Math.easeInOutQuad(
            startTime,
            startPosition,
            distance,
            duration
        )
        element.scrollLeft = currentPosition
        if (startTime < duration) {
            requestAnimationFrame(animateScroll)
        }
    }

    animateScroll()
}

Math.easeInOutQuad = function (currentTime, startPosition, distance, duration) {
    currentTime /= duration / 2
    if (currentTime < 1)
        return (distance / 2) * currentTime * currentTime + startPosition
    currentTime--
    return (
        (-distance / 2) * (currentTime * (currentTime - 2) - 1) + startPosition
    )
}
