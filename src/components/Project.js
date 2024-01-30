import { useRef, useState } from "react"
import styled from "styled-components"

import projects from "projects.json"

const imgTimeInSeconds = 5

const StyledProject = styled.button`
    position: relative;

    width: var(--project-width);
    height: var(--project-height);

    background-size: 100% 100%;

    transition: transform ${imgTimeInSeconds / 20}s ease, background-image ${imgTimeInSeconds / 20}s ease;
    
    p {
        color: white;

        position: absolute;
        top: 50%;
        left: 50%;

        transform: translateX(-50%) translateY(-50%);

        font-family: Raleway, sans-serif;
        font-weight: 400;

        font-size: 1.6rem;

        z-index: 1;

        transition: opacity ${imgTimeInSeconds / 20}s ease;
    }

    #low-opacity-wall {
        position: absolute;
        top: 0;
        left: 0;

        width: 100%;
        height: 100%;

        background-color: rgba(0, 0, 0, 0.5);

        transition: background-color ${imgTimeInSeconds / 20}s linear;
    }

    @media only screen and (width <= 440px) {
        width: 90vw;
        height: auto;
        aspect-ratio: 480 / 270;
    }

    @media only screen and (width <= 420px) {
        p {
            font-size: 1.2rem;
        }
    }
`

const LoadingBar = styled.div`
    display: none;
        
    position: absolute;
    bottom: 0;

    width: 0;
    height: 2px;

    z-index: 1;

    background-color: ${({ $color }) => $color};
    opacity: 0.6;
`

export default function Project({ id }) {
    const projectRef = useRef(0)
    const nameRef = useRef(0)
    const wallRef = useRef(0)
    const loadingBarRef = useRef(0)
    const interval = useRef(0)

    const [imgIndex, setImgIndex] = useState(1)

    const onMouseEnter = () => {
        projectRef.current.style.transform += "scale(1.1)"
        nameRef.current.style.opacity = "0"
        wallRef.current.style.backgroundColor = "rgba(0, 0, 0, 0)"
        loadingBarRef.current.style.display = "block"
        loadingBarRef.current.style.animation = `loadingAnim ${imgTimeInSeconds}s linear infinite`

        interval.current = setInterval(() => {
            if(!interval.current) return

            setImgIndex(oldImgIndex => (oldImgIndex === 4) ? 1 : oldImgIndex + 1)
        }, imgTimeInSeconds * 1000)
    }

    const onMouseLeave = () => {
        nameRef.current.style.opacity = "1"
        wallRef.current.style.backgroundColor = "rgba(0, 0, 0, 0.5)"
        loadingBarRef.current.style.display = "none"
        projectRef.current.style.transform = projectRef.current.style.transform.split("scale(1.1)").join(" ")

        clearInterval(interval.current)
        interval.current = null

        setImgIndex(1)
    }

    const onClick = () => {
        document.getElementById("modal").setAttribute("project-id", id)
        document.getElementById("modal").style.zIndex = 5
        document.getElementById("modal").style.opacity = 1
        document.getElementById("imgs").style.transition = `background-image ${imgTimeInSeconds / 20}s ease`
    }

    return (
        <StyledProject
            style={{ backgroundImage: `url(${require(`../assets/${id}/${id}-${imgIndex}.webp`)})`}}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={onClick}
            ref={projectRef}
        >
            <p ref={nameRef}>{projects[id].name}</p>
            <div ref={wallRef} id="low-opacity-wall"></div>
            <LoadingBar $color={projects[id].color} ref={loadingBarRef} id="loading-bar"></LoadingBar>
        </StyledProject>
    )
}