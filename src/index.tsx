import React from "react"
import ReactDOM from "react-dom"

class App extends React.Component<{}, {}> {
    constructor(props) {
        super(props);
    }
    public render() {
        return (
            <h1>Hello, world!</h1>
        );
    }
}

let root = document.getElementById("root")
ReactDOM.render(<App />, root)