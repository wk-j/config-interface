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
function getFileContent(projectName, fileName) {
  return `Content of ${fileName}`
}



export class Body extends React.Component<{ style: CSSProperties },State> {

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
    this.handleContentChange = this.handleContentChange.bind(this)
  }

  public handleContentChange = (e) => {
    this.setState({ projectContent: e.target.value })
  }


  public componentDidMount() {
    this.searchApi.getProjectNames().then(res => {
      console.log("ProjectName : " + res.data)
      let options = []
      let name = []
      res.data.map(x => {
        // เอาdata push เข้าไปใน option
        options.push({ value: x, text: x })
        name.push(x)
      });
      this.setState({ dropdownOption: options })
      // ได้ค่าโปรเจคทั้งหมดมาเก็บในoption
      // this.initSettingContent()
      this.defaultValue()
    })
  }
  private defaultValue() {
    this.searchApi.getProjectNames().then(res => {
      console.log("ProjectName : " + res.data)
      let name = []
      res.data.map(x => {
        name.push(x)
      })
      this.setState({projectName: name[0]})
      this.initProjectSettings(name[0])
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
      this.setState({projectPath: pathProjects[0]})
      this.initSettingContent(pathProjects[0])
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

        this.componentDidMount()
      } else {
        alert("ERROR : " + Error)
      }
    })
    }
  }
  // __________ทดสอบแสดงชื่อโปรเจค__________|


  public setValue(e, data) {
    this.setState({ projectName: data.value })
    this.setState({ projectPath: "" })
    this.setState({ projectContent: "" })
  }

  public selectFile(e,data) {
    this.setState({ projectPath: data.value })
    // __________ฟังก์ชั่นสำหรับการนำค่าในไฟลsetting____________|
    this.initSettingContent(data.value);
    this.setState({ projectContent: "" })

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