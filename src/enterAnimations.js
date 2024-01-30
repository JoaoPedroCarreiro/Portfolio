export default function initAnimations() {
    const node = document.getElementById("content-page")
    const slideAnimNodes = node.querySelectorAll("[data-slide-anim]")

    const hasAnimated = []  
    const hasSetted = []

    const directions = {
        "left": ["translateX(-50px)", "translateX(50px)"],
        "right": ["translateX(50px)", "translateX(-50px)"],
        "bottom": ["translateY(50px)", "translateY(-50px)"],
        "top": ["translateY(-50px)", "translateY(50px)"]
    }

    function animate() {
        slideAnimNodes.forEach((value, key) => {
            if(hasAnimated[key]) return

            if(!hasSetted[key]) {
                value.style.opacity = "0"
                value.style.transform += directions[value.getAttribute("data-slide-anim")][0]
    
                hasSetted[key] = true
            }

            if(value.getBoundingClientRect().top <= 0.87 * window.innerHeight && value.getBoundingClientRect().top >= 0) {
                hasAnimated[key] = true
                
                value.style.transition = "transform .55s ease, opacity .4s ease-in-out"

                setTimeout(() => {
                    value.style.opacity = "1"
                    value.style.transform += directions[value.getAttribute("data-slide-anim")][1]
                }, value.hasAttribute("data-slide-delay") ? 100 + Number(value.getAttribute("data-slide-delay")) : 100)
            }
        })

        if(hasAnimated.length === slideAnimNodes.length) node.removeEventListener("scroll", animate)
    }

    animate()

    node.addEventListener("scroll", animate)
}