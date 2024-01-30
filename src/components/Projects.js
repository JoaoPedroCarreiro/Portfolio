import styled from "styled-components"
import Project from "./Project"
import { useEffect, useRef } from "react"

const StyledProjects = styled.section`
    position: relative;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    gap: 35px;

    #projects {
        position: absolute;
        top: calc((-1 * var(--nav-height)) - 25px);
        left: 0;
    }

    #projects-display {
        display: flex;
        justify-content: center;

        margin: 0 20px;

        flex-wrap: wrap;
        max-width: calc((480px * 2) + 55px + 40px);

        gap: 45px;
    }
`

export default function Projects() {
    const projectsRef = useRef(0)

    useEffect(() => {
        for(let i = 0; i < projectsRef.current.children.length; i++) {
            projectsRef.current.children[i].setAttribute("data-slide-anim", i % 2 === 0 ? "left" : "right")
        }
    }, [])

    return (
        <StyledProjects>
            <div id="projects"></div>
            <h2 data-slide-anim="top">Projetos</h2>
            <div ref={projectsRef} id="projects-display">
                <Project id="login-page" />
                <Project id="e-commerce" />
                <Project id="login-page" />
                <Project id="login-page" />
            </div>
        </StyledProjects>
    )
}