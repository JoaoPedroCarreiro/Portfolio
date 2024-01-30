import { useEffect, useRef, useState } from "react"

import styled from "styled-components"

import close from "assets/close.svg"

import projects from "projects.json"

const imgTimeInSeconds = 5
const transitionTimeInSeconds = 0.25

const StyledModal = styled.div`
    position: absolute;

    width: 100%;
    height: 100%;

    background-color: rgba(0, 0, 0, 0.7);

    opacity: 0;

    transition: opacity ${transitionTimeInSeconds}s linear;

    #modal-content {
        width: 80vw;

        position: absolute;
        top: 50%;
        left: 50%;

        background-color: rgb(21, 21, 21);
        border-radius: 8px;

        overflow: hidden;

        box-shadow: rgba(0, 0, 0, 0.45) 0px 3px 6px 1px;

        transform: translateX(-50%) translateY(-50%);

        display: flex;

        gap: 35px;
    }

    #close-modal {
        position: absolute;
        top: 10px;
        right: 10px;
        
        img {
            width: 25px;
            height: 25px;
        }
    }

    #left {
        position: relative;
    
        display: flex;

        width: 780px;
        height: 100%;

        padding-left: 20px;
        padding-top: 20px;

        flex-direction: column;

        #link-site {
            position: relative;
            width: 100%;
        }

        #imgs {
            width: 100%;
            aspect-ratio: 780 / 414;

            background-size: cover;

            border-radius: 8px;
            border: 3px solid rgb(11, 11, 11);

            position: relative;
        }

        #github-link {
            display: flex;
            align-items: center;
            justify-content: center;

            gap: 8px;

            height: fit-content;

            margin: 20px 0;

            background-color: white;
            padding: 2px 5px;

            border-radius: 6px;

            span {
                color: rgb(21, 21, 21);
                font-weight: 600;
            }

            i {
                font-size: 28px;
                color: rgb(21, 21, 21);
            }
        }
    }

    #right {
        width: 410px;

        margin: 30px 0;
        margin-right: 20px;

        display: flex;
        flex-direction: column;

        gap: 25px;

        h3 {
            color: white;
            font-size: 1.65rem;
        }

        p {
            font-family: Raleway, sans-serif;
            font-weight: 200;
            color: rgba(255, 255, 255, 0.8);

            line-height: 1.3;
        }

        p:last-child {
            font-family: Neue Montreal, sans-serif;
            color: white;
            font-weight: bold;
        }
    }

    @media only screen and (width <= 990px) {
        #modal-content {
            flex-direction: column-reverse;
            justify-content: center;
            align-items: center;

            gap: 10px;

            #left {
                width: 90%;
                aspect-ratio: 780 / 414;
                padding-left: 0;
            }

            #right {
                width: 100%;
                align-items: center;

                margin: 0;
                margin-right: 0;
                margin-top: 30px;

                * {
                    text-align: center;
                }

                p {
                    width: 80%;
                }
            }
        }
    }
`

const LoadingBar = styled.div`
    position: absolute;
    bottom: 0px;

    width: 0;
    height: 2px;

    z-index: 1;

    background-color: ${({ $color }) => $color};
    opacity: 0.6;
`

const Buttons = styled.div`
    position: absolute;
    bottom: 10px;
    left: 50%;

    transform: translateX(-50%);

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 7px;

    button {
        background-color: ${({ $color }) => $color};
        opacity: 0.8;
        width: 7px;
        height: 7px;

        border-radius: 50%;

        transition: all 0.3s ease;
    }

    button:hover {
        opacity: 1;
        transform: scale(1.2);
    }
`

export default function Modal() {
    const modalRef = useRef(0)
    const imgRef = useRef(0)
    const loadingBarRef = useRef(0)
    const buttonsRef = useRef(0)
    const interval = useRef(0)

    const [id, setId] = useState("login-page")
    const [imgIndex, setImgIndex] = useState(1)
    const [imagePosition, setImagePosition] = useState(0)

    const imagePositions = ["ao lado", "abaixo"]

    useEffect(() => {
        setImagePosition(oldImgPosition => {
            if(oldImgPosition === 1) return 1
            if(window.innerWidth <= 990) return 1

            return 0
        })

        window.addEventListener("resize", () => {
            setImagePosition(oldImgPosition => {
                if(oldImgPosition === 1) return 1
                if(window.innerWidth <= 990) return 1

                return 0
            })
        })

        let localId = !modalRef.current.getAttribute("project-id") ? "login-page" : modalRef.current.getAttribute("project-id")
        setId(localId)
        imgRef.current.style.backgroundImage = `url(${require(`../assets/${localId}/${localId}-1.webp`)})`

        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                if(mutation.type === "attributes" && mutation.attributeName !== "style") {
                    localId = !modalRef.current.getAttribute("project-id") ? "login-page" : modalRef.current.getAttribute("project-id")
                    setId(localId)
                    imgRef.current.style.backgroundImage = `url(${require(`../assets/${localId}/${localId}-1.webp`)})`

                    loadingBarRef.current.style.display = "block"
                    loadingBarRef.current.style.animation = `loadingAnim ${imgTimeInSeconds}s linear infinite`

                    if(interval.current) {
                        clearInterval(interval.current)
                        interval.current = null
                    }

                    interval.current = setInterval(() => {
                        if(!interval.current) return

                        setImgIndex(oldImgIndex => (oldImgIndex === 4) ? 1 : oldImgIndex + 1)
                    }, imgTimeInSeconds * 1000)
                }
            })
        })
        
        observer.observe(modalRef.current, { attributes: true })
    }, [])

    useEffect(() => {
        const localId = !modalRef.current.getAttribute("project-id") ? "login-page" : modalRef.current.getAttribute("project-id")
        imgRef.current.style.backgroundImage = `url(${require(`../assets/${localId}/${localId}-${imgIndex}.webp`)})`
    }, [imgIndex])

    const closeModal = () => {
        modalRef.current.style.opacity = "0"
        loadingBarRef.current.style.animation = "none"
        imgRef.current.style.transition = "none"

        clearInterval(interval.current)
        interval.current = null

        setImgIndex(1)

        setTimeout(() => {
            modalRef.current.style.zIndex = -5
            loadingBarRef.current.style.display = "none"
        }, transitionTimeInSeconds * 1000)
    }

    const buttonClick = (e, i) => {
        e.preventDefault()

        loadingBarRef.current.style.display = "none"
        loadingBarRef.current.style.animation = "none"

        clearInterval(interval.current)
        interval.current = null

        setImgIndex(i)

        setTimeout(() => {
            loadingBarRef.current.style.display = "block"
            loadingBarRef.current.style.animation = `loadingAnim ${imgTimeInSeconds}s linear infinite`

            if(interval.current) {
                clearInterval(interval.current)
                interval.current = null
            }

            interval.current = setInterval(() => {
                if(!interval.current) return

                setImgIndex(oldImgIndex => (oldImgIndex === 4) ? 1 : oldImgIndex + 1)
            }, imgTimeInSeconds * 1000)
        }, (imgTimeInSeconds / 20) * 1000)
    }

    return (
        <StyledModal id="modal" ref={modalRef}>
            <div id="modal-content">
                <button id="close-modal" onClick={closeModal}><img src={close} alt="Close Modal" /></button>
                <div id="left">
                    <a target="_blank" rel="noreferrer" href={projects[id].href} id="link-site">
                        <div ref={imgRef} id="imgs" role="img">
                            <LoadingBar $color={projects[id].color} ref={loadingBarRef}></LoadingBar>
                        </div>
                        <Buttons ref={buttonsRef} $color={projects[id].color}>
                            <button onClick={(e) => { buttonClick(e, 1) }}></button>
                            <button onClick={(e) => { buttonClick(e, 2) }}></button>
                            <button onClick={(e) => { buttonClick(e, 3) }}></button>
                            <button onClick={(e) => { buttonClick(e, 4) }}></button>
                        </Buttons>
                    </a>
                    <div style={{ display: "flex", height: "100%", justifyContent: "center", alignItems: "center" }}>
                        <a target="_blank" rel="noreferrer" href={projects[id].github} id="github-link">
                            <i className="bx bxl-github"></i><span>Acessar repositório</span>
                        </a>
                    </div>
                </div>
                <div id="right">
                    <h3>{projects[id].name}</h3>
                    <p>{projects[id].desc}<br />Clique na imagem {imagePositions[imagePosition]} para acessar o site.</p>
                    <p>{projects[id].date}</p>
                </div>
            </div> 
        </StyledModal>
    )
}