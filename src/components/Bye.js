import styled from "styled-components"

const StyledBye = styled.div`
    width: 100%;

    color: rgba(255, 255, 255, 0.5);
    font-family: Raleway, sans-serif;

    margin-bottom: 50px;

    text-align: center;
`

export default function Bye() {
    return (
        <StyledBye>Espero que tenha gostado :)</StyledBye>
    )
}