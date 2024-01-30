import styled from "styled-components"

import close from "../assets/close.svg"

const StyledMenu = styled.div`
    padding: 0 40px;
    padding-top: 22px;

    position: fixed;
    opacity: 0;
    
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

    width: 100%;
    height: 100vh;

    z-index: -10;

    background-color: rgba(11, 11, 11, 0.9);

    display: flex;
    flex-direction: column;
    gap: 40px;
    
    transition: opacity 0.25s ease-in;

    & > div {
        width: 100%;
        height: max-content;

        position: relative;
    }

    #close-button {
        display: flex;
        justify-content: end;

        img {
            width: 28px;
            height: 28px;
        }
    }

    #name {
        display: flex;
        align-items: center;
        justify-content: center;

        text-align: center;

        p {
            color: white;
            font-size: 2rem;
        }
    }

    .line {
        height: 1px;
    }

    #links {
        display: flex;
        align-items: center;
        justify-content: center;

        flex-direction: column;
        
        gap: 40px;

        text-align: center;

        a {
            color: rgba(255, 255, 255, 0.85);
            font-size: 1.8rem;
            font-family: Raleway, sans-serif;
            font-size: 200;
        }
    }
`

export default function Menu() {
    const closeMenu = () => {
        const menu = document.getElementById("menu")
        menu.style.opacity = "0"
        setTimeout(() => menu.style.zIndex = "-10", 250)
    }

    return (
        <StyledMenu id="menu">
            <div id="close-button">
                <button onClick={closeMenu}><img src={close} alt="Close Menu" /></button>
            </div>
            <div id="name"><p className="dream-orphans">João Pedro Carreiro</p></div>
            <div className="line"></div>
            <div id="links">
                <a onClick={closeMenu} href="#about">SOBRE MIM</a>
                <a onClick={closeMenu} href="#projects">PROJETOS</a>
                <a onClick={closeMenu} href="#contact">CONTATO</a>
            </div>
        </StyledMenu>
    )
}