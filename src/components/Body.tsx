import React, { CSSProperties } from "react"
import ReactDOM from "react-dom"
import { Button, Dropdown, Form, Grid, List, Menu, Segment, TextArea } from "semantic-ui-react"

import styled from "styled-components"
import { getApiUrl } from "../share/Configuration";
import { SearchApi } from "../share/searchApi";
import { FileContent } from "./FileContent";
import { ProjectList } from "./ProjectList";
import { FileList } from "./FileList"



type State = {
  projectName: string
  projectPath: string
  projectContent: string
  dropdownOption: any[]
  fileName: string[]
  pathProject: string[]
  currentPath: ""
 

}

const LabelDiv = styled.div`
  margin-bottom: 5px;
`

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
function getFileContent(projectName, fileName) {
  return `Content of ${fileName}`
}



export class Body extends React.Component<{ style: CSSProperties },State> {

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
      currentPath: "",
   
    }
    this.handleContentChange = this.handleContentChange.bind(this)
  }

  public handleContentChange = (e) => {
    this.setState({ projectContent: e.target.value })
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

  // _________หาที่อยู่Index array pathProject________________|
  //
  public findPath(file: string) {
    let index = this.state.pathProject.findIndex(x => x.indexOf(file) !== -1)
    return index
  }
  public handleListItemClick(event, data) {
    console.log("list item clicked: " + data.value);
  }

  private onProjectChange = (project) => {
    this.setState({
        projectName: project,
        projectContent: ""
    })
    console.log(project)
    this.initProjectSettings(project)
}
private onFileChange = (file) => {
  this.setState({
     projectPath: file,
      projectContent:""
  });
  this.initSettingContent(file)
}
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
    let { dropdownOption } = this.state
    let { projectName } = this.state
    let { projectPath } = this.state
    let { projectContent } = this.state
    let { fileName } = this.state
    let { pathProject } = this.state
    let { currentPath } = this.state

    const Textareabox = () => (
      <TextArea placeholder="Choose Project and File First" value={this.state.projectContent} style={{ width: "100%", height: "calc(50% - 30px)" }} 
            onChange={this.handleContentChange}/>
    )
  
    

    return (
      <BodyDiv style={this.props.style}>
        <LeftDiv>
         
        <ProjectList projectName = {projectName} dropdownOption={dropdownOption} 
        onChange={this.onProjectChange} />
         <FileList projectPath={projectPath} fileName={fileName} pathProject={pathProject} onChange={this.onFileChange} Name={projectName} />
        </LeftDiv>

        <RigthDiv>

          <ContentDiv>
            <LabelDiv>Content</LabelDiv>
            <FileContent projectContent={projectContent} onChange={this.onContentChange} />
          </ContentDiv>
        </RigthDiv>
      </BodyDiv>
              

    );
  }
}