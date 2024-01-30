import { useEffect } from "react"
import styled from "styled-components"

import CodeTyping from "./animations/CodeTyping"

const StyledHome = styled.section`
    display: flex;
    justify-content: space-around;
    align-items: center;

    margin: 0 50px;
    margin-top: 80px;

    & > div {
        width: var(--home-window-size);
        height: var(--home-window-size);
    }

    .text {
        & > div {
            max-width: 100%;
            width: max-content;
            height: 100%;

            display: flex;
            justify-content: center;
            flex-direction: column;

            gap: 15px;
        }

        h1 {
            font-family: Raleway, sans-serif;
            font-weight: 200;
            font-size: var(--title-font-size);
            
            color: white;

            span {
                color: white;
            }
        }

        p {
            font-family: Raleway, sans-serif;
            font-weight: 200;
            font-size: var(--sub-title-font-size);

            color: rgba(255, 255, 255, 0.8);
        }
    }

    .vscode {
        box-shadow: rgba(0, 0, 0, 0.45) 0px 3px 6px 1px;

        background-color: rgb(39, 43, 51);
        border-radius: 7px;

        .vscode-font {
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }

        .top {
            display: flex;
            align-items: center;
            justify-content: space-between;
            
            width: calc(100% - 14px);
            height: 10px;

            margin: 7px;

            .buttons {
                display: flex;
                gap: 6px;
            }

            .buttons > span {
                width: 11px;
                height: 11px;
                border-radius: 50%;
            }

            p {
                color: rgb(155, 165, 180);
                font-size: 0.9rem;
            }
        }

        .file-name {
            display: flex;
            align-items: center;

            margin: 0 20px;
            margin-top: 12px;

            .html {
                color: rgb(226, 108, 22);

                font-weight: 800;
                font-size: 0.6rem;
                font-family: Neue Montreal, sans-serif;

                margin-right: 3px;

                letter-spacing: 2px;

                transform: scaleY(2);
            }
        
            .name {
                color: white;
                font-size: 0.9rem;
            }
        }
    }

    @media only screen and (width <= 990px) {
        flex-direction: column;

        gap: 80px;

        .text {
            height: max-content;
            margin-top: 85px;

            h1, p {
                text-align: center;
            }
        }
    }

    @media only screen and (width <= 420px) {
        gap: 50px;
    }

    @media only screen and (width <= 370px) {
        gap: 20px;

        .vscode {
            width: 375px;
            height: 375px;
        }
    }
`

export default function Home() {
    useEffect(() => {
        const vscode = document.querySelector(".vscode")

        const resize = () => {
            if(window.innerWidth <= 370) {
                vscode.style.transform = `scale(${(0.95 * window.innerWidth) / 375})`
                return
            }

            vscode.style.transform = "scale(1)"
        }

        resize()

        window.addEventListener("resize", resize)
    }, [])

    return (
        <StyledHome>
            <div className="text" data-slide-anim="left">
                <div>
                    <h1>Olá, meu nome é<br /><span className="dream-orphans">João Pedro Carreiro</span></h1>
                    <div className="line"></div>
                    <p>Sou um Desenvolvedor Front-End que busca sempre mais conhecimento e experiência na área de tecnologia.</p>
                </div>
            </div>
            <div className="vscode" data-slide-anim="right">
                <div className="top">
                    <div className="buttons">
                        <span style={{ backgroundColor: "rgb(253, 86, 77)" }}></span>
                        <span style={{ backgroundColor: "rgb(253, 187, 42)" }}></span>
                        <span style={{ backgroundColor: "rgb(41, 204, 65)" }}></span>
                    </div>
                    <p className="vscode-font">index.html</p>
                    <div className="buttons" style={{ opacity: 0 }}>
                        <span style={{ backgroundColor: "rgb(253, 86, 77)" }}></span>
                        <span style={{ backgroundColor: "rgb(253, 187, 42)" }}></span>
                        <span style={{ backgroundColor: "rgb(41, 204, 65)" }}></span>
                    </div>
                </div>
                <div className="file-name">
                    <span className="html">&lt;&gt;</span><span className="name vscode-font">index.html</span>
                </div>
                <CodeTyping />
            </div>
        </StyledHome>
    )
}