import React from "react"
import ReactDOM from "react-dom"
import { Button, Segment } from "semantic-ui-react"

import "semantic-ui-css/semantic.min.css"
import { Home } from "./components/Home";

class App extends React.Component<{}, {}> {
    constructor(props) {
        super(props);
    }
    public render() {
        return (
            <Segment>
                <Home />
                <Button>Hello</Button>
            </Segment>
        );
    }
}

let root = document.getElementById("root")
ReactDOM.render(<App />, root)