import { useEffect, useRef } from "react"
import styled from "styled-components"

import back from "../assets/back.jpg"

const percentageBigger = 30

const StyledBackground = styled.div`
    width: 100%;
    height: ${100 + percentageBigger}vh;

    background: url(${back});
    background-position: center 0px;
    background-repeat: no-repeat;
    background-size: cover;

    position: fixed;

    z-index: -5;
`

export default function Background() {
    const backgroundRef = useRef(null)

    useEffect(() => {
        const node = document.getElementById("content-page")

        node.addEventListener("scroll", () => {
            const percentHeight = Math.floor(node.clientHeight * (percentageBigger / 100))

            if(node.scrollTop <= percentHeight) {
                backgroundRef.current.style.backgroundPosition = `center -${node.scrollTop}px`
                backgroundRef.current.style.opacity = 1
                return
            }

            backgroundRef.current.style.backgroundPosition = `center -${percentHeight}px`

            const y = node.scrollTop - percentHeight
            const opacityPerPixel = 0.35

            const newOpacity = 1 - ((y * opacityPerPixel) / 100)

            backgroundRef.current.style.opacity = newOpacity <= 0 ? 0 : 1 - ((y * opacityPerPixel) / 100)
        })
    }, [])

    return (
        <StyledBackground ref={backgroundRef}></StyledBackground>
    )
}