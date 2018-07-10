import React, { CSSProperties } from "react"
import { Button, Segment, TextArea } from "semantic-ui-react"
import styled from "styled-components"
import { getApiUrl } from "../share/Configuration";
import { SearchApi } from "../share/searchApi";
import { ProjectList } from "./ProjectList"
import { FileList } from "./FileList"
import { FileContent } from "./FileContent"

type State = {
  // selectedFile: string
  projectName: string
  projectPath: string
  projectContent: string
  dropdownOption: any[]
  pathProject: string[]
  fileName: string[]

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
  padding: 10px;
`

const RigthDiv = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 3;
  padding: 10px;
`

export class Body extends React.Component<{ style: CSSProperties }, State> {

  private searchApi = new SearchApi(getApiUrl());

  constructor(props) {
    super(props);
    this.state = {
      // selectedFile: "",
      projectName: "",
      projectPath: "",
      projectContent: "",
      dropdownOption: [],
      pathProject: [],
      fileName: []
    }
  }
  public componentDidMount() {
    this.searchApi.getProjectNames().then(res => {
      console.log("Project Name" + res.data)
      let options = [];
      res.data.map(x => {
        // เอาdata push เข้าไปใน option
        options.push({ value: x, text: x });
      });
      this.setState({ dropdownOption: options })
      // ได้ค่าโปรเจคทั้งหมดมาเก็บในoption
    })
  }

  // _____________ดึงชื่อไฟล์Project_________________|
  public initProjectSettings(name: string) {
    this.searchApi.getProjectSettings(name).then(response => {

      console.log("initProjectSettings");
      let pathProjects = [];
      response.data.map(x => {
        // เอาค่าpathเก็บไปไว้ในแอรแรย์ก่อย
        pathProjects.push(x);
      });

      console.log("Path[ยังไม่เซต] : " + pathProjects)
      this.setState({ pathProject: pathProjects })
      console.log("Path : " + this.state.pathProject)
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
      console.log("FileName[ยังไม่เซต] : " + fileNames)
      this.setState({ fileName: fileNames })
      console.log("FileName : " + this.state.fileName)
      // this.setState({fileName: fileNames})
    })
  }

  public initSettingContent(value: string) {
    this.searchApi.getSettingContent(value).then(response => {
      console.log(response.data.content)
      this.setState({ projectContent: response.data.content, projectPath: response.data.path })
    })
  }

  private initSaveSettingContent = (path: string, content: string) => {
    console.log("initSaveSettingContent");
    if (this.state.projectName === "") {
      alert("Plese select project")
    } else if (this.state.projectPath === "" || this.state.projectContent === "") {
      alert("Plese select path")
    } else {
    this.searchApi.saveSettingContent(path, content).then(res => {
      if (res.data.success) {
        alert("SAVE!")
        console.log("SAVE!");
        this.setState({
          projectName: "", projectPath: "", projectContent: "", dropdownOption: [],
          pathProject: [], fileName: []
        })
        this.componentDidMount()
      } else {
        alert("ERROR : " + Error)
      }
    })
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

  // _________หาที่อยู่Index array pathProject________________|
  //

  public handleListItemClick(data) {
    console.log("list item clicked: " + data.value);
  }
  // โปรเจคเปลี่ยน
  private onProjectChange = (project) => {
    this.setState({
      projectName: project,
      projectContent: ""
    })
    console.log(project)
    this.initProjectSettings(project)
  }
  // ไฟล์เปลี่ยน
  private onFileChange = (file) => {
    this.setState({
      projectPath: file,
      projectContent: ""
    });
    this.initSettingContent(file)
  }
  // ข้อความเปลี่ยน
  private onContentChange = (content) => {
    this.setState({
      projectContent: content
    });
    console.log(content);
    this.initSaveSettingContent(this.state.projectPath, content)
  }
  //
  // ________________RENDER________________|
  public render() {
    let { projectName } = this.state
    let { projectPath } = this.state
    let { dropdownOption } = this.state
    let { fileName } = this.state
    let { pathProject } = this.state
    let { projectContent } = this.state
    return (
      <BodyDiv style={this.props.style}>
        <LeftDiv>
          <ProjectList projectName={projectName} dropdownOption={dropdownOption} onChange={this.onProjectChange} />
          <FileList projectPath={projectPath} fileName={fileName} pathProject={pathProject} onChange={this.onFileChange} Name={projectName} />
        </LeftDiv>
        <RigthDiv>
          <FileContent ProjectContent={projectContent} onChange={this.onContentChange} />
        </RigthDiv>
      </BodyDiv>
    );
  }
}