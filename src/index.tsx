import React from "react"
import ReactDOM from "react-dom"
import { Dropdown, Grid, Menu, Segment, Button } from "semantic-ui-react"
import styled from "styled-components";

import "semantic-ui-css/semantic.min.css"
import MenuV from "./components/menu";
import { SearchApi } from "./share/search-api";

type State = {
  projectNames: string[]
  projectPath: string[]
  projectContent: string
  dropdownOption: any[]
}
class App extends React.Component<{}, State> {

  constructor(props) {
    super(props);
    this.state = {
      projectNames: [],
      projectPath: [],
      projectContent: "",
      dropdownOption: [ { value: "AL", text: "Alabama" }, { value: "EL", text: "ENGLAND" }  ]
    }
  }
  private searchApi = new SearchApi();
  public componentDidMount() {
    this.searchApi.getProjectNames().then(res => {
      // tslint:disable-next-line:no-console
      console.log(res.data)
      let options = [];
      res.data.forEach(x => {
        options.push( { value: x, text: x } );
      });

      this.setState({dropdownOption: options})
    })
  }
  // ทดสอบแสดงชื่อโปรเจค_____________________
  private Showproject() {
    return this.state.projectNames + " have " + this.state.projectNames.length;
  }
  private setContent() {
    this.setState({ projectContent: "Hello World" });
  }
  // ______________________________________|
  public render() {
    const { projectNames, dropdownOption } = this.state
    const Wrapper = styled.section`
  padding: 4em;
  `;
    const DropdownProjectName = () => (
    <Dropdown placeholder="Select Project" fluid selection options={dropdownOption} />
      )
    return (
      <Wrapper>
        <Grid>
          <Grid.Column width={4}>
            <h1>Config Editer</h1>
            {this.Showproject()}
          </Grid.Column>
          <Grid.Row>
            <Grid.Column width={15}>
              <Segment>
                <MenuV />
                <DropdownProjectName />
                {this.state.projectContent}
                <Button onClick={this.setContent.bind(this)}>Set Content</Button>
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