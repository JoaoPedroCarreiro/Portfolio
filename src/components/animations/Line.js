import { forwardRef } from "react"
import styled from "styled-components"

const StyledLine = styled.div`
    span {
        display: inline-block;
        font-size: var(--sub-title-font-size);
    }

    pre {
        display: inline-block;
    }

    code {
        position: relative;

        font-size: var(--sub-title-font-size);
        font-weight: 400;
    }

    .low-opacity {
        color: rgba(211, 211, 255, 0.4);
        margin-right: var(--number-code-distance);
    }

    .red {
        color: rgb(255, 97, 136);
        font-weight: 600;
    }

    .gray {
        color: rgb(147, 146, 147);
        font-weight: 600;
    }

    .blue {
        color: rgb(120, 220, 232);
        font-weight: 400;
        font-style: italic;
    }

    .yellow {
        color: rgb(255, 216, 102);
        font-weight: 400;
    }
`

const Line = forwardRef(({ id, i, line, tabsize }, ref) => {
    const newLine = line.slice(1)
    const lineArr = [<pre key={`default-line-${i}`}>{newLine}</pre>]

    if(newLine.includes("<")) {
        lineArr.pop()

        const itensInLine = newLine.split("<")

        const arr = []

        for(const item of itensInLine) {
            if(!item) continue

            arr.push(...item.split(">"))
        }

        if(!arr[arr.length - 1]) arr.pop()

        for(let n = 0; n < arr.length; n++) {
            let digitTag = ""
            let attributes = []
            let values = []

            if(n % 2 === 0) {
                if(arr[n].split(" ").length > 1) {
                    attributes = arr[n].split(" ")

                    arr[n] = attributes.shift()

                    for(let x = 0; x < attributes.length; x++) {
                        const attributeArr = attributes[x].split("=")

                        if(attributeArr.length > 1) {
                            attributes[x] = attributeArr[0]
                            values[x] = attributeArr[1]
                        }
                    }

                    for(let x = 0; x < attributes.length; x++) {
                        attributes[x] = 
                            <span key={`attribute-${x}-line-${i}`}>
                                <pre className="blue"> {attributes[x]}</pre>
                                {
                                    values[0] ?
                                        <pre className="gray">="<pre className="yellow">{values[x].split('"')[1]}</pre>"</pre>
                                    :
                                        <></>
                                }
                            </span>
                    }
                }

                if(!/[a-zA-Z]/g.test(arr[n][0])) {
                    digitTag = arr[n][0]
                    arr[n] = arr[n].slice(1)
                }
            }

            const removeMark = () => {
                const position = arr[n].split("@write@")[0].length - 1

                arr[n] = arr[n].split("@write@").join("")

                return position === -1 ? 0 : position
            }
            
            lineArr.push(
                <span key={`item-${n}-line-${i}`}>
                    <pre className="gray">
                        {n % 2 === 0 ? "<" : ""}
                        {digitTag}
                    </pre>
                    <pre className={(n % 2 === 0) ? "red" : ""} write={/@write@/g.test(arr[n]) ? "w" + removeMark() : ""}>{arr[n]}</pre>
                    {attributes}
                    <pre className="gray">
                        {n % 2 === 0 ? ">" : ""}
                    </pre>
                </span>
            )
        }
    } else {
        lineArr.pop()

        const removeMark = () => {
            const position = newLine.split("@write@")[0].length - 1

            return position === -1 ? 0 : position
        }

        lineArr.push(<pre key={`line-${i}`} write={/@write@/g.test(newLine) ? "w" + removeMark() : ""}>{newLine.split("@write@").join("")}</pre>)
    }

    return (
        <StyledLine style={{ transform: `translateX(-${(String(i + 1).length - 1) * 8}px)` }}>
            <span className="low-opacity">{i + 1}</span><code id={id} ref={ref} style={{ left: `${24 * tabsize}px` }}>{lineArr}</code>
        </StyledLine>
    )
})

export default Line