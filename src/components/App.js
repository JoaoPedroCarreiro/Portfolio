import { useEffect } from "react"
import styled from "styled-components"

import Background from "./Background"
import Home from "./Home"
import Nav from "./Nav"
import Menu from "./Menu"
import initAnimations from "enterAnimations"
import About from "./About"
import Projects from "./Projects"
import Preload from "./useful/Preload"
import Modal from "./Modal"
import Contact from "./Contact"
import Bye from "./Bye"

const Box = styled.section`
    position: relative;

    display: flex;
    flex-direction: column;

    gap: 225px;

    overflow: hidden;
    z-index: -2;
`

const StyledApp = styled.main`
    position: relative;

    width: 100%;
    height: 100vh;

    background-color: transparent;
    overflow-y: auto;

    z-index: 1;

    scroll-behavior: smooth;

    &::-webkit-scrollbar {
        width: 6px;
    }

    &::-webkit-scrollbar-track {
        background: transparent;
    }

    &::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.85);
        border-radius: 10px;
    }

    @media only screen and (width <= 450px) {
        &::-webkit-scrollbar {
            display: none;
        }
    }
`

export default function App() {
    useEffect(() => {
        initAnimations()
    }, [])

    return (
        <>
            <Preload />
            <Background />
            <Menu />
            <Modal />
            <StyledApp id="content-page">
                <div id="start"></div>
                <Nav />
                <Box>
                    <Home />
                    <About />
                    <Projects />
                    <Contact />
                    <Bye />
                </Box>
            </StyledApp>
        </>
    )
}