import React, { CSSProperties } from "react"
import ReactDOM from "react-dom"
import styled from "styled-components"
import { Footer } from "./components/Footer"
import { Header } from "./components/Header"
import { Body } from "./components/Body"
import { Login } from "./components/Login"
import "semantic-ui-css/semantic.min.css"

type State = {
    loggedIn: boolean
    styleR: string
    styleL: string
}

const ContainerDiv = styled.div`
    display: block;
    flex-direction: column;
`

export class App extends React.Component<{}, State> {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            styleR: "rightTo",
            styleL: "leftTo"
        }
    }
    public onLogin = (status) => {
        this.setState({
            loggedIn: status
        })
    }
    public onLogout = (status) => {
        this.setState({
            loggedIn: status
        })
    }

    public render() {
        let { loggedIn, styleL, styleR } = this.state
        return (
            this.state.loggedIn ?
                <ContainerDiv>
                    <Header onLogout={this.onLogout} loggedIn={loggedIn} />
                    <Body styleR={styleR} styleL={styleL} style={{ padding: "20px", alignSelf: "center", minWidth: "1000px", flex: 1 }} />
                    <Footer style={{ justifyContent: "center", display: "flex" }} />
                </ContainerDiv>
                :
                <ContainerDiv>
                    <Header onLogout={this.onLogout} loggedIn={loggedIn} />
                    <Login loggedIn={loggedIn} onLogin={this.onLogin} />
                    <Footer style={{ justifyContent: "center", display: "flex" }} />
                </ContainerDiv>
        )
    }
}

let root = document.getElementById("root")
ReactDOM.render(<App />, root)