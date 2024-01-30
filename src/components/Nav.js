import styled from "styled-components"

import menu from "../assets/menu.svg"

const StyledNav = styled.nav`
    width: calc(100% - 80px);
    height: 75px;

    display: flex;
    align-items: center;

    margin: 0 40px;

    border-bottom: 1px solid rgba(255, 255, 255, 0.8);

    position: fixed;
    top: 0;

    z-index: 1;

    ul {
        display: flex;
        justify-content: space-between;

        width: 100%;

        li {
            display: flex;
            align-items: center;
            gap: 18px;

            color: white;

            font-size: var(--nav-font-size);
            font-weight: 600;
        }

        li:first-child {
            font-size: 1.1rem;
            font-weight: 200;
        }

        button {
            display: none;

            img {
                width: 28px;
                height: 28px;

                transform: rotateY(180deg);
            }
        }
    }

    @media only screen and (width <= 450px) {
        ul {
            li:last-child {
                a {
                    display: none;
                }

                button {
                    display: block;
                }
            }
        }
    }
`

export default function Nav() {
    const showMenu = () => {
        const menu = document.getElementById("menu")
        menu.style.zIndex = "10"
        menu.style.opacity = "1"
    }

    return (
        <>
            <div style={{ position: "sticky", top: "0px", width: "100%", height: "75px", backdropFilter: "blur(6px)", zIndex: "-1" }}></div>
            <StyledNav>
                <ul>
                    <li className="dream-orphans">
                        <a href="#start">João Pedro<br />Carreiro</a>
                    </li>
                    <li>
                        <a href="#about">SOBRE MIM</a>
                        <a href="#projects">PROJETOS</a>
                        <a href="#contact">CONTATO</a>
                        <button onClick={showMenu}><img src={menu} alt="Menu" /></button>
                    </li>
                </ul>
            </StyledNav>
        </>
    )
}