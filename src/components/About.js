import { useRef, useState } from "react"
import styled from "styled-components"

const skills = [
    {
        id: "html5",
        color: "rgb(222, 58, 40)",
        name: "HTML",
        description: "HTML (Linguagem de Marcação de HiperTexto) é o bloco de construção mais básico da web. Define o significado e a estrutura do conteúdo da web."
    },
    {
        id: "css3",
        color: "rgb(9, 106, 181)",
        name: "CSS",
        description: "CSS (Folhas de Estilo em Cascata) é uma linguagem de estilo usada para descrever a apresentação de um documento escrito em HTML ou em XML. O CSS descreve como elementos são mostrados na tela."
    },
    {
        id: "javascript",
        color: "rgb(247,224,24)",
        name: "JAVASCRIPT",
        description: "JavaScript é uma linguagem de programação, é mais conhecida como a linguagem de script para páginas Web, mas usada também em vários outros ambientes sem browser."
    },
    {
        id: "react",
        color: "rgb(97,219,251)",
        name: "REACT",
        description: "React é um framework JavaScript que é usado para criar interfaces de usuário em aplicativos web. Ele é popular por ser fácil de usar, altamente flexível e escalável, e é usado por muitas empresas de tecnologia."
    },
    {
        id: "bootstrap",
        color: "rgb(86,59,125)",
        name: "BOOTSTRAP",
        description: "Bootstrap é um framework Front-End que fornece estruturas de CSS para a criação de sites e aplicações responsivas de forma rápida e simples."
    },
    {
        id: "git",
        color: "rgb(240,80,51)",
        name: "GIT",
        description: "Git é um sistema de controle de versões distribuído, usado principalmente no desenvolvimento de software, mas pode ser usado para registrar o histórico de edições de qualquer tipo de arquivo."
    },
]

function getPositionOfIndex(i) {
    const btnSize = window.getComputedStyle(document.body).getPropertyValue("--about-icon-size")
    const btnSizeValueHalf = Number(/[+-]?([0-9]*[.])?[0-9]+/g.exec(btnSize)[0]) / 2
    
    return (btnSizeValueHalf * (i + 1)) + ((25 + btnSizeValueHalf) * i) - 10 + 15
}

const StyledAbout = styled.section`
    position: relative;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    gap: 20px;

    #about {
        position: absolute;
        top: calc((-1 * var(--nav-height)) - 25px);
        left: 0;
    }

    #about-me {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        gap: 20px;

        p {
            display: block;
            width: var(--about-width);

            font-family: Raleway, sans-serif;
            color: rgba(255, 255, 255, 0.8);

            font-weight: 200;
            line-height: 1.5;

            font-size: var(--about-font);

            text-align: center;
        }
    }

    #skills {
        position: relative;

        display: flex;
        align-items: center;
        gap: 25px;

        #skill-desc {
            position: absolute;
            top: calc(100% + 20px);
            left: 0;

            transform: translateX(-15px);

            width: 0;
            height: 0;
            padding: 20px;

            border-radius: 6px;
            background-color: rgb(42, 42, 42);

            transition: opacity .35s ease, height .35s ease;
            color: white;

            box-shadow: rgba(0, 0, 0, 0.45) 0px 3px 6px 1px;

            opacity: 0;

            #arrow {
                position: absolute;
                top: -15px;
                left: 0;
        
                width: 20px;
                height: 20px;

                background-color: rgb(42, 42, 42);
                border-top-right-radius: 35%;

                transition: left .4s ease;

                z-index: 1;
            }

            #arrow:before,
            #arrow:after {
                content: '';
                position: absolute;
                background-color: inherit;
                width: 20px;
                height: 20px;
            }

            #arrow {
                transform: rotate(-45deg) skewX(0deg) scale(0.5);
            }

            #arrow:before {
                transform: rotate(-135deg) skewX(-45deg) scale(1.414, .707) translate(0, -50%);
            }

            #arrow:after {
                transform: rotate(135deg) skewY(-45deg) scale(.707, 1.414) translate(50%);
            }

            #desc-content {
                overflow: hidden;

                width: 100%;
                height: 100%;

                display: flex;
                align-items: center;

                gap: 25px;

                h3 {
                    color: white;

                    font-size: var(--about-desc-font-title);
                }

                #division {
                    width: 1px;
                    height: 100%;
                    
                    background-color: rgba(255, 255, 255, 0.5);
                }

                p {
                    display: block;
                    width: 1fr;

                    font-family: Raleway, sans-serif;
                    color: rgba(255, 255, 255, 0.8);

                    font-weight: 200;
                    line-height: 1.5;

                    font-size: var(--about-desc-font);
                }
            } 
        }
    }

    @media only screen and (width <= 350px) {
        #skills {
            position: static;

            width: 140px;
            flex-wrap: wrap;

            #skill-desc {
                bottom: 0;
                left: 50%;
                transform: translateX(-50%);

                #desc-content {
                    flex-direction: column;
                    gap: 8px;

                    #division {
                        width: 100%;
                        height: 1px;
                        
                        background-color: rgba(255, 255, 255, 0.5);
                    }

                    p {
                        overflow-y: auto;
                        text-align: center;
                    }
                }

                #arrow {
                    display: none;
                }
            }
        }
    }
`

const Skill = styled.button`
    &:hover {
        i {
            color: ${props => props.color};
        }
    }

    i {
        font-size: var(--about-icon-size);
        color: white;

        transition: color .35s ease;
    }

    &[skill-active] i {
        color: ${props => props.color};
    }
`

export default function About() {
    const skillsRef = useRef(0)
    const arrowRef = useRef(0)
    const skillDescRef = useRef(0)

    const [activeSkill, setActiveSKill] = useState(null)

    const onClick = (e, i) => {
        const curActive = skillsRef.current.querySelector("[skill-active]")

        curActive?.removeAttribute("skill-active")

        if(curActive?.id === e.currentTarget.id) {
            e.currentTarget.removeAttribute("skill-active")

            skillDescRef.current.style.height = "0"
            skillDescRef.current.style.opacity = "0"

            return
        }

        e.currentTarget.toggleAttribute("skill-active")
        setActiveSKill(i)

        const size = window.innerWidth <= 350 ? "92vw" : `${skillsRef.current.clientWidth + 30}px`

        arrowRef.current.style.left = `${getPositionOfIndex(i)}px`

        skillDescRef.current.style.width = size
        skillDescRef.current.style.height = "175px"

        skillDescRef.current.style.opacity = "1"
    }

    const displaySkills = () => {
        const arr = []

        for(let i = 0; i < skills.length; i++) {
            arr.push(
                <Skill
                    id={`${skills[i].id}-${i}`}
                    key={`${skills[i].id}-${i}`}
                    color={skills[i].color}
                    onClick={(e) => onClick(e, i)}
                    data-slide-anim="bottom"
                    data-slide-delay={i * 250}
                >
                    <i className={`bx bxl-${skills[i].id}`}></i>
                </Skill>
            )
        }

        return arr
    }

    return (
        <StyledAbout>
            <div id="about"></div>
            <div id="about-me" data-slide-anim="bottom">
                <h2>Sobre Mim</h2>
                <p>Sou um desenvolvedor Front-End de 18 anos, e estou sempre buscando mais conhecimento na área de tecnologia que sou apaixonado, comecei na programação por hobby, apenas criando jogos em Java, ampliei meu conhecimento para além disso e agora almejo seguir carreira com desenvolvimento Web, você pode conferir as tecnologias que estou me especializando abaixo, também planejo me tornar um desenvolvedor Full-Stack, por isso estou estudando também o Back-End.</p>
            </div>
            <div ref={skillsRef} id="skills">
                {displaySkills()}
                <div ref={skillDescRef} id="skill-desc">
                    <div ref={arrowRef} id="arrow"></div>
                    <div id="desc-content">
                        <h3>{skills[activeSkill]?.name}</h3>
                        <div id="division"></div>
                        <p>{skills[activeSkill]?.description}</p>
                    </div>
                </div>
            </div>
        </StyledAbout>
    )
}