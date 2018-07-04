import React from "react"
import ReactDOM from "react-dom"
import { Button } from "semantic-ui-react"

import "semantic-ui-css/semantic.min.css"

class App extends React.Component<{}, {}> {
    constructor(props) {
        super(props);
    }
    public render() {
        return (
            <div>
                <h1>Hello, world!</h1>
                <Button>Hello</Button>
            </div>
        );
    }
}

let root = document.getElementById("root")
ReactDOM.render(<App />, root)