import React, { CSSProperties, HtmlHTMLAttributes } from "react"
import styled from "styled-components"

const FooterDiv = styled.div`
    background: lightgrey;
    padding: 5px;
    position: fixed;
    display: block;
    width: 100%;
    height: 30px;
    bottom: 0
`

export class Footer extends React.Component<{ style?: CSSProperties }> {
    public render() {
        return (
            <FooterDiv style={this.props.style}>
                <div>Config Editor 0.1.0</div>
            </FooterDiv>
        )
    }
}