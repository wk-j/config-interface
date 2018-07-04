import React from "react"
import ReactDOM from "react-dom"
//import { Button, Segment } from "semantic-ui-react"
import { Grid, Menu, Segment } from 'semantic-ui-react'

//import "semantic-ui-css/semantic.min.css"
//import { Home } from "./components/Home";

class App extends React.Component<{}, {}> {
    constructor(props) {
        super(props);
    }
    state = { activeItem: 'Home' }
    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
    public render() {const { activeItem } = this.state
        return (
            <Grid>
        <Grid.Column width={4}> 
        <h1>Config Editer</h1>

          <Menu fluid vertical tabular>
            <Menu.Item name='Home' active={activeItem === 'Home'} onClick={this.handleItemClick} />
            <Menu.Item name='Select' active={activeItem === 'Select'} onClick={this.handleItemClick} />
            <Menu.Item name='Edit'  active={activeItem === 'Edit'} onClick={this.handleItemClick} />
            <Menu.Item name='Save' active={activeItem === 'Save'} onClick={this.handleItemClick} />
          </Menu>

        </Grid.Column>
        <Grid.Column stretched width={12}>
          <Segment>
            Hello world
          </Segment>
        </Grid.Column>
      </Grid>
        );
    }
}

let root = document.getElementById("root")
ReactDOM.render(<App />, root)