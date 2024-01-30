import { useEffect, useRef, useState } from "react"
import styled from "styled-components"

import steps from "./steps"
import Line from "./Line"

function cursorX(tabSize, i) {
    const element = document.getElementById("rem-size")
    const remSize = window.getComputedStyle(element).getPropertyValue("width")
    const fontSize = window.getComputedStyle(document.body).getPropertyValue("--sub-title-font-size")
    const codeDistance = window.getComputedStyle(document.body).getPropertyValue("--number-code-distance")

    const value = Number(/[+-]?([0-9]*[.])?[0-9]+/g.exec(remSize)[0]) * Number(/[+-]?([0-9]*[.])?[0-9]+/g.exec(fontSize)[0])
    const codeDistanceValue = Number(/[+-]?([0-9]*[.])?[0-9]+/g.exec(codeDistance)[0])

    return `${codeDistanceValue + (24 * tabSize) + (i * (value / 2))}px`
}

function cursorY(i) {
    const lineGap = window.getComputedStyle(document.body).getPropertyValue("--line-gap")

    const lineGapValue = Number(/[+-]?([0-9]*[.])?[0-9]+/g.exec(lineGap)[0])
    const correctionValue = Number(window.getComputedStyle(document.body).getPropertyValue("--correction"))

    return `${correctionValue + ((17 + lineGapValue) * i)}px`
}

const StyledCodeTyping = styled.div`
    margin-left: var(--margin-left);
    margin-top: 8px;

    display: flex;
    flex-direction: column;
    gap: var(--line-gap);

    position: relative;

    @keyframes blink {
        to {
            visibility: hidden
        }
    }

    * {
        font-family: Inconsolata, sans-serif, monospace;
        color: white;
    }
`

export default function CodeTyping() {
    const timeoutRef = useRef(0)
    const typingBarRef = useRef(0)

    const [canRender, setCanRender] = useState(0)
    const [codeContent, setCodeContent] = useState(<></>)

    const convertToCode = (frame) => {
        const timeout = steps[frame][0]
        const code = steps[frame][1]
        
        const lines = []
        
        for(const line of code.split("\n")) {
            const newLine = line.slice(8, line.length)
            
            if(!newLine) continue
            
            lines.push(newLine)
        }
        
        const arr = []

        for(let i = 0; i < lines.length; i++) {
            const tabSize = Number(lines[i][0])

            const eraseString = /@erase[\d]+@/g.exec(lines[i])
            const setCursor = /@setCursor@/g.exec(lines[i])
            const writeString = /@write:(.*)+@/g.exec(lines[i])
            const moveCursor = /@moveCursor[\d]+@/g.exec(lines[i])
            const idle = /@idle@/g.exec(lines[i])

            if(eraseString) {
                const newLine = lines[i].split(eraseString[0]).join("")
                const digitsToErase = Number(eraseString[0].slice("@erase".length).split("@")[0])

                typingBarRef.current.style.top = cursorY(i)
                typingBarRef.current.style.left = cursorX(tabSize, eraseString.index)

                const stringToFind = lines[i].slice(eraseString.index - digitsToErase, eraseString.index)
                const xPath = `//pre[contains(text(), '${stringToFind}')]`
                const matchingElement = document.evaluate(xPath, typingBarRef.current, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
                
                arr.push(<Line id={`line-${i}`} key={`line-${i}`} i={i} line={newLine} tabsize={tabSize} />)
                
                let eraseInterval
                let index = 0
                let position = 0

                eraseInterval = setInterval(() => {
                    const curText = matchingElement.textContent

                    if(matchingElement.getAttribute("write")) {
                        clearInterval(eraseInterval)
                        eraseInterval = null
                        
                        return
                    }

                    if(index === 0) position = matchingElement.textContent.indexOf(stringToFind)

                    matchingElement.textContent = curText.slice(0, position + digitsToErase - index - 1) + curText.slice(position + digitsToErase - index)
                    typingBarRef.current.style.left = cursorX(tabSize, eraseString.index - index - 1)

                    index++

                    if(index === digitsToErase) {
                        clearInterval(eraseInterval)
                        eraseInterval = null
                    }
                }, timeout / digitsToErase)

                continue
            }

            if(setCursor) {
                const newLine = lines[i].split(setCursor[0]).join("")

                arr.push(<Line id={`line-${i}`} key={`line-${i}`} i={i} line={newLine} tabsize={tabSize} />)

                typingBarRef.current.style.top = cursorY(i)
                typingBarRef.current.style.left = cursorX(tabSize, setCursor.index)

                continue
            }

            if(writeString) {
                typingBarRef.current.style.top = cursorY(i)
                typingBarRef.current.style.left = cursorX(tabSize, writeString.index)

                arr.push(<Line id={`line-${i}`} key={`line-${i}`} i={i} line={lines[i].split(writeString[0]).join("@write@")} tabsize={tabSize} />)

                const stringToType = writeString[0].slice("@write:".length).split("@")[0]

                let writeInterval
                let typing = ""
                let start = "", end = ""
                let index = 0

                writeInterval = setInterval(() => {
                    if(!document.getElementById(`line-${i}`)?.querySelector("pre[write^='w']")) {
                        clearInterval(writeInterval)
                        writeInterval = null

                        return
                    }

                    const matchingElement = document.getElementById(`line-${i}`).querySelector("pre[write^='w']")

                    if(index === 0) {
                        const position = Number(matchingElement.getAttribute("write")[1])

                        start = matchingElement.textContent.slice(0, position + 1)
                        end = matchingElement.textContent.slice(position + 1)
                    }
                    
                    typing += stringToType[index]
                    
                    matchingElement.textContent = start + typing + end

                    typingBarRef.current.style.left = cursorX(tabSize, writeString.index + index + 1)

                    index++

                    if(index === stringToType.length) {
                        clearInterval(writeInterval)
                        writeInterval = null
                    }
                }, timeout / stringToType.length)

                continue
            }

            if(moveCursor) {
                const newLine = lines[i].split(moveCursor[0]).join("")
                const finalPosition = Number(moveCursor[0].slice("@moveCursor".length).split("@")[0])
                
                arr.push(<Line id={`line-${i}`} key={`line-${i}`} i={i} line={newLine} tabsize={tabSize} />)
                
                let cursorInterval
                let position = 0

                cursorInterval = setInterval(() => {
                    typingBarRef.current.style.left = cursorX(tabSize, moveCursor.index + position + 1)

                    position++

                    if(position === finalPosition) {
                        clearInterval(cursorInterval)
                        cursorInterval = null
                    }
                }, timeout / finalPosition)

                continue
            }

            if(idle) {
                const newLine = lines[i].split("@idle@").join("")

                typingBarRef.current.style.left = cursorX(tabSize, idle.index)
                typingBarRef.current.style.animation = `blink 1s steps(2, start) infinite`

                arr.push(<Line id={`line-${i}`} key={`line-${i}`} i={i} line={newLine} tabsize={tabSize} />)

                if(timeout !== - 1) {
                    setTimeout(() => {
                        typingBarRef.current.style.animation = "none"
                    }, timeout)
                }

                continue
            }

            arr.push(<Line id={`line-${i}`} key={`line-${i}`} i={i} line={lines[i]} tabsize={tabSize} />)
        }

        return arr
    }

    useEffect(() => {
        const renderFrame = (frame) => {
            setCodeContent(convertToCode(frame))
            
            timeoutRef.current = setTimeout(() => {
                if(frame === steps.length - 1) {
                    renderFrame(0)
                    return
                }

                renderFrame(frame + 1)
            }, steps[frame][0] + 50)
        }

        renderFrame(0)
        setCanRender(true)
    }, [])

    return (
        <StyledCodeTyping>
            <div ref={typingBarRef} style={{ position: "absolute", top: "0px", left: "0px", width: "1px", height: "var(--sub-title-font-size)", backgroundColor: "white" }}></div>
            {
                canRender ?
                    <>{codeContent}</>
                :
                    <></>
            }
        </StyledCodeTyping>
    )
}