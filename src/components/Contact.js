import styled from "styled-components"

import github from "assets/github.svg"
import linkedin from "assets/linkedin.svg"
import email from "assets/email.svg"
import whatsapp from "assets/whatsapp.svg"

const StyledContact = styled.section`
    position: relative;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    gap: 35px;

    #contact {
        position: absolute;
        top: calc((-1 * var(--nav-height)) - 25px);
        left: 0;
    }

    #contact-display {
        display: flex;
        align-items: center;
        justify-content: center;

        gap: 60px;

        a {
            position: relative;

            border-radius: 50%;
            background-color: rgb(42, 42, 42);

            display: flex;
            align-items: center;
            justify-content: center;

            img {
                padding: 12px;
                
                width: 70px;
                height: 70px;
            }

            p, strong {
                color: rgba(255, 255, 255, 0.85);
                font-family: Raleway, sans-serif;
            }

            p {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;

                position: absolute;
                bottom: -15px;
                transform: translateY(100%);

                font-size: 200;

                opacity: 0;
                pointer-events: none;

                transition: opacity .3s ease;

                line-height: 1.4;
            }

            img:hover + p {
                opacity: 1;
            }
        }
    }

    @media only screen and (width <= 660px) {
        #contact-display {
            max-width: calc((70px * 2) + 60px);
            flex-wrap: wrap;

            margin: 0 20px;

            a p {
                bottom: -8px;
            }
        }
    }
`

export default function Contact() {
    return (
        <StyledContact>
            <div id="contact"></div>
            <h2 data-slide-anim="top">Contato</h2>
            <div id="contact-display">
                <a target="_blank" rel="noreferrer" href="https://github.com/JoaoPedroCarreiro" data-slide-anim="left" data-slide-delay="300">
                    <img src={github} alt="Github" />
                    <p>
                        <strong>GitHub</strong>
                        @JoaoPedroCarreiro
                    </p>
                </a>
                <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/jpcarreirof/" data-slide-anim="left">
                    <img src={linkedin} alt="Linkedin" />
                    <p>
                        <strong>Linkedin</strong>
                        @jpcarreirof
                    </p>
                </a>
                <a target="_blank" rel="noreferrer" href="mailto:jpcarreirof@gmail.com" data-slide-anim="right">
                    <img src={email} alt="Email" />
                    <p>
                        <strong>Email</strong>
                        jpcarreirof@gmail.com
                    </p>
                </a>
                <a target="_blank" rel="noreferrer" href="https://api.whatsapp.com/send?phone=5522988285005" data-slide-anim="right" data-slide-delay="300">
                    <img src={whatsapp} alt="Whatsapp" />
                    <p>
                        <strong>Whatsapp</strong>
                        (22)&nbsp;988285005
                    </p>
                </a>
            </div>
        </StyledContact>
    )
}