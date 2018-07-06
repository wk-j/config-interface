import React from "react"
import ReactDOM from "react-dom"
import { Grid, Menu, Segment } from "semantic-ui-react"
import styled from "styled-components";

import "semantic-ui-css/semantic.min.css"
import MenuV from "./components/menu";

type State = {
  projectName: string
  projectPath: string
  projectContent: string
}
class App extends React.Component<{}, State> {

  constructor(props) {
    super(props);
    this.state = {
      projectName: "",
      projectPath: "",
      projectContent: "",
    }
  }
  public render() {
    const Wrapper = styled.section`
  padding: 4em;
  `;
    return (
      <Wrapper>
        <Grid>
          <Grid.Column width={4}>
            <h1>Config Editer</h1>

          </Grid.Column>
          <Grid.Row>
            <Grid.Column width={15}>
              <Segment>
                <MenuV />
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Wrapper>
    );
  }
}

let root = document.getElementById("root")
ReactDOM.render(<App />, root)