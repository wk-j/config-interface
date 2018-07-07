import React from "react"
import ReactDOM from "react-dom"
import { Button, Dropdown, Form, Grid, List, Menu, Segment, TextArea } from "semantic-ui-react"
import styled from "styled-components";

import "semantic-ui-css/semantic.min.css"
import MenuV from "./components/Menu";
import { SearchApi } from "./share/searchApi";



type State = {
  projectName: string
  projectPath: string
  projectContent: string
  dropdownOption: any[]
  fileName: string[]
  pathProject: string[]

}
class App extends React.Component<{}, State> {

  constructor(props) {
    super(props);
    this.state = {
      projectName: "",
      projectPath: "",
      projectContent: "",
      dropdownOption: [],
      fileName: [],
      pathProject: []
    }
  }
  private searchApi = new SearchApi();
  public componentDidMount() {
    this.searchApi.getProjectNames().then(res => {
      // tslint:disable-next-line:no-console
      console.log("Project Name" + res.data)
      let options = [];
      res.data.forEach(x => {
        // เอาdata push เข้าไปใน option
        options.push({ value: x, text: x });
      });
      this.setState({ dropdownOption: options })
      // ได้ค่าโปรเจคทั้งหมดมาเก็บในoption
    })
  }
  //
  //
  // _______________ตัวอย่างการตัดชื่อไฟล์_____________|
  private GetFileNamez(value: string) {
    let path = "/tmp/ProjectA/AppSettings.json";
    let strArr: string[] = path.split("/");
    return strArr[strArr.length - 1]
  }
  //
  //
  // _____________ดึงชื่อไฟล์Project_________________|
  private initProjectSettings(value: string) {
    this.searchApi.getProjectSettings(value).then(response => {
      // tslint:disable-next-line:no-console
      console.log("path : " + response.data)
      let pathProjects = [];
      response.data.forEach(x => {
        // เอาค่าpathเก็บไปไว้ในแอรแรย์ก่อย
        pathProjects.push(x);
      });
      this.setState({ pathProject: pathProjects })
      //
      //
      // ____________ดึงชื่อไฟล์ตั้งค่าของproject____________|
      // เก็บไฟล์ไว้ในarrayชื่อไฟล์
      let fileNames = [];
      pathProjects.forEach(x => {
        // เอาค่าpathเก็บไปไว้ในแอรแรย์ก่อย
        let arrayFile = [];
        arrayFile = x.split("/");
        // ชื่อไฟล์ที่ตัดเอา/ออกแล้ว
        let arrayName = [];
        arrayName = arrayFile[arrayFile.length - 1]
        fileNames.push(arrayName);
      });
      // tslint:disable-next-line:no-console
      console.log(fileNames)
      this.setState({ fileName: fileNames })
      // this.setState({fileName: fileNames})
    })
  }
  //
  //
  //
  private initSettingContent(value: string) {
    this.searchApi.getSettingContent(value).then(response => {
      // tslint:disable-next-line:no-console
      console.log(response.data.content)
      this.setState({ projectContent: response.data.content })
      this.setState({ projectPath: response.data.path })
    })
  }

  //
  //
  // __________ทดสอบแสดงชื่อโปรเจค__________|
  private Showproject() {
    return this.state.projectName
  }
  private ShowPath() {
    return this.state.projectPath
  }
  private ShowContent() {
    return this.state.projectContent
  }
  private ShowFile() {
    return this.state.fileName
  }
  private ShowPathz() {
    return this.state.pathProject
  }
  public setValue(e, data) {
    this.setState({ projectName: data.value })
    this.setState({ projectPath: "" })
    this.setState({ projectContent: "" })
    this.initProjectSettings(data.value)
  }
  public selectFile(e, data) {
    this.setState({ projectPath: data.value })
    // __________ฟังก์ชั่นสำหรับการนำค่าในไฟลsetting____________|
    this.initSettingContent(data.value);
    this.setState({ projectContent: "" })
  }
  // _________หาที่อยู่Index array pathProject________________|
  //
  public findPath(file: string) {
    let index = this.state.pathProject.findIndex(x => x.indexOf(file) !== -1)
    return index
  }
  //
  // ________________RENDER________________|
  public render() {
    const { dropdownOption } = this.state
    const Wrapper = styled.section`padding: 4em;`;
    const Box = styled.section`padding: 2em;`;
    const Row = styled.div`
    &::after {
      content: "";
      clear: both;
      display: table;
    }
    `;
    const Column = styled.div`
    float: left;
    width: 50%;
    `;
    // _______________สร้างlist_____________|
    const listz = this.state.fileName.map((file) => (
      <List.Item onClick={this.selectFile.bind(this)} value={this.state.pathProject[this.findPath((file))]}>
        <List.Icon name="file" size="large" verticalAlign="middle" />
        <List.Content>
          <List.Header as="a" >File Name : {file}</List.Header>
          <List.Description as="a">{this.state.pathProject[this.findPath((file))]}</List.Description>
        </List.Content>
      </List.Item>
    ));
    // ____________________________________|
    const DropdownProjectName = () => (
      <Dropdown placeholder="Select Project..."  fluid selection options={dropdownOption}
        onChange={this.setValue.bind(this)} value={this.state.projectName} />
    )
    const ButtonSave = () => (
      <Button  floated='right' value="Save" name="Save" right >Save</Button>
    )

    return (
      <Wrapper>
        <Grid>
          <Grid.Column width={15}>
            <h1>Config Editer</h1>
          </Grid.Column>
          <Grid.Row>
            <Grid.Column width={15}>
              <Segment>
                <MenuV />
                <Row>
                <Column>
                <Box>
                <h2>Select Project : </h2>
                <DropdownProjectName />
                <List divided relaxed>
                  {listz}
                </List>
                </Box>
                </Column>
                <Column>
                <Box>
                  <h2>Content : </h2>
                <TextArea placeholder="Choose Project and File First" value={this.state.projectContent}
                  style={{ width: 400 , height: 300}} />
                <br />
                <br />
                <ButtonSave  />
                </Box>
                </Column>
                </Row>
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