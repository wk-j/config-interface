import React, { CSSProperties } from "react"
import ReactDOM from "react-dom"
import { Button, Dropdown, Form, Grid, List, Menu, Segment, TextArea } from "semantic-ui-react"

import styled from "styled-components"
import { getApiUrl } from "../share/Configuration";
import { SearchApi } from "../share/searchApi";
import { ProjectList } from "../components/ProjectList"
import { FileList } from "../components/FileList"
import { FileContent } from "../components/FileContent"

const LabelDiv = styled.div`
  margin-bottom: 5px;
`

type State = {
  projectName: string
  projectPath: string
  projectContent: string
  dropdownOption: any[]
  fileName: string[]
  pathProject: string[]
  currentPath: string
}

const BodyDiv = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px;
`

const LeftDiv = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 5px;
`

const RigthDiv = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 3;
  padding: 5px;
`

const ContentDiv = styled.div`
  flex-grow: 1;
  margin-bottom: 5px;
`

export class Body extends React.Component<{ style: CSSProperties }, State> {

  private searchApi = new SearchApi(getApiUrl());

  constructor(props) {
    super(props);
    this.state = {
      projectName: "",
      projectPath: "",
      projectContent: "",
      dropdownOption: [],
      fileName: [],
      pathProject: [],
      currentPath: ""
    }
    this.handleContentChange = this.handleContentChange.bind(this)
  }

  private handleContentChange = (content) => {
    this.setState({ projectContent: content.target.value })
  }

  public componentDidMount() {
    this.searchApi.getProjectNames().then(res => {
      // tslint:disable-next-line:no-console
      console.log("Project Name : " + res.data)
      let options = [];
      res.data.map(x => {
        // เอาdata push เข้าไปใน option
        options.push({ value: x, text: x });
      });
      this.setState({ dropdownOption: options })
      // ได้ค่าโปรเจคทั้งหมดมาเก็บในoption
    })
  }

  // _______________ตัวอย่างการตัดชื่อไฟล์_____________|
  private GetFileNamez(value: string) {
    let path = "/tmp/ProjectA/AppSettings.json";
    let strArr: string[] = path.split("/");
    return strArr[strArr.length - 1]
  }

  // _____________ดึงชื่อไฟล์Project_________________|
  private initProjectSettings(value: string) {
    this.searchApi.getProjectSettings(value).then(response => {
      console.log("path : " + response.data)
      let pathProjects = [];
      response.data.map(x => {
        // เอาค่าpathเก็บไปไว้ในแอรแรย์ก่อย
        pathProjects.push(x);
      });
      this.setState({ pathProject: pathProjects })

      // ____________ดึงชื่อไฟล์ตั้งค่าของproject____________|
      // เก็บไฟล์ไว้ในarrayชื่อไฟล์
      let fileNames = [];
      pathProjects.map(x => {
        // เอาค่าpathเก็บไปไว้ในแอรแรย์ก่อย
        let arrayFile = [];
        arrayFile = x.split("/");
        // ชื่อไฟล์ที่ตัดเอา/ออกแล้ว
        let arrayName = [];
        arrayName = arrayFile[arrayFile.length - 1]
        fileNames.push(arrayName);
      });
      console.log(fileNames)
      this.setState({ fileName: fileNames })
      // this.setState({fileName: fileNames})
    })
  }

  private initSettingContent(value: string) {
    this.searchApi.getSettingContent(value).then(response => {
      console.log(response.data.content)
      this.setState({ projectContent: response.data.content , projectPath: response.data.path })
    })
  }

  private initSaveSettingContent(path: string, content: string) {
    if (this.searchApi.saveSettingContent(path, content)) {
      console.log("ok")
    } else {
      console.log("error")
    }
  }

  // __________ทดสอบแสดงชื่อโปรเจค__________|
  private showproject() {
    return this.state.projectName
  }

  private showPath() {
    return this.state.projectPath
  }

  private showContent() {
    return this.state.projectContent
  }

  private showFile() {
    return this.state.fileName
  }

  private showPathz() {
    return this.state.pathProject
  }

  private showCurpath() {
    return this.state.currentPath
  }
  // ______________________________________|

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
    let index = this.state.pathProject.findIndex(x => x.indexOf(data) !== -1)
    let curPath = this.state.pathProject[index]
    this.setState({ currentPath: curPath })
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
    const ButtonSave = () => (
      <Button floated="right" value="Save" name="Save" onClick={() => {this.initSaveSettingContent(this.state.currentPath, this.state.projectContent)}} >Save</Button>
    )
    return (
      <BodyDiv style={this.props.style}>
        <LeftDiv>
           <Segment>
              projectname[now]  : {this.showproject()}
              <br />
              projectpath[now]  : {this.showPath()}
              <br />
              projectcontent[now]  : {this.showContent()}
            </Segment>
        <ProjectList />
          <List divided relaxed>
            {listz}
          </List>
        </LeftDiv>
        <RigthDiv>
          <ContentDiv>
            <LabelDiv>Content</LabelDiv>
            <TextArea placeholder="Choose Project and File First" value={this.state.projectContent}
            style={{ width: "100%", height: "calc(70% - 30px)" }}
            onChange={this.handleContentChange}/>
          </ContentDiv>
          <div>
            <ButtonSave />
          </div>
        </RigthDiv>
      </BodyDiv>
    );
  }
}