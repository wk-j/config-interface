import React from "react"
import ReactDOM from "react-dom"
import styled from "styled-components"
import { Footer } from "./components/Footer"
import { Header } from "./components/Header"
import { Body } from "./components/Body"

import "semantic-ui-css/semantic.min.css"
import "./css/style.css"

const ContainerDiv = styled.div`
    display: block;
    flex-direction: column;
    background-image: url('http://shmector.com/_ph/17/990955453.png');
`

export class App extends React.Component {
    public render() {
        return (
            <ContainerDiv>
                <Header />
                <Body style={{padding: "20px", alignSelf: "center", minWidth: "1000px", flex: 1 }} />
                <Footer style={{ justifyContent: "center", display: "flex" }} />
            </ContainerDiv>
        )
    }
}

let root = document.getElementById("root")
ReactDOM.render(<App />, root)