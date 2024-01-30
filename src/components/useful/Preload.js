import { memo } from "react"

import { styled } from "styled-components"

import projects from "projects.json"

const Preload = styled.div`
    background: ${() => {
        let bg = ""

        for(const id in projects) {
            for(let i = 1; i <= 4; i++) {
                bg = bg.concat(`url(${require(`../../assets/${id}/${id}-${i}.webp`)}), `)
            }
        }

        return bg.slice(0, bg.length - 2)
    }};
`

export default memo(Preload)