import React, { CSSProperties } from "react"
import styled from "styled-components"
import { getApiUrl } from "../share/Configuration";
import { SearchApi, Node } from "../share/searchApi";
import { ProjectList } from "./ProjectList"
import { FileList } from "./FileList"
import { FileContent } from "./FileContent"
import { List } from "semantic-ui-react"

type State = {
  // selectedFile: string
  projectName: string
  projectPath: string
  projectContent: string
  dropdownOption: any[]
  pathProject: string[]
  fileName: string[]
  subParentNames: string
  treeJson: string
  nodes: Node[]
  selectedNode: Node
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
      fileName: [],
      subParentNames: "",
      treeJson: "",
      nodes: [],
      selectedNode: {
        name: "",
        id: 0,
        isRoot: true,
        parent: 0,
        isFile: false
      }

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

      this.setState({ projectName: name[0] })
      
      this.initProjectSettings(name[0])
    })
  }

  private getRoot = (): Node => {
    if (this.state.nodes.length) {
      return this.state.nodes.filter(x => x.isRoot)[0];
    } else {
      return {
        name: "Loading ...",
        isRoot: true,
        isFile: false,
        id: 0,
        parent: 0
      }
    }
  }

  // tslint:disable-next-line:no-unused-expression
  public isSelected = (node) => this.state.selectedNode === node;

  // _____________ดึงชื่อไฟล์Project_________________|
  public initProjectSettings(name: string) {
    this.searchApi.getProjectSettings(name).then(response => {

      console.log("initProjectSettings");
      let pathProjects = [];
      let path = response.data
      console.log("P: " + path)
      response.data.map(x => {
        // เอาค่าpathเก็บไปไว้ในแอรแรย์ก่อย
        pathProjects.push(x);
      });

      console.log("Path[ยังไม่เซต] : " + pathProjects)
      this.setState({ pathProject: pathProjects })
      console.log("Path : " + this.state.pathProject)
      this.setState({ projectPath: pathProjects[0] })
      this.initSettingContent(pathProjects[0])
      this.searchApi.getNode(this.state.projectPath).then(rs => {
        this.setState({ nodes: rs.data })
        console.log(this.state.nodes)
      })
      /*
      this.searchApi.getFolderAll(this.state.projectPath).then(res => {
        let obj = res.data;
        console.log(res.data)
        // console.log("subfolder : " + JSON.stringify(obj))
        // this.setState({treeJson: JSON.stringify(obj)})

        // this.setState({ subParentNames: Response.data })
      })*/

      // ____________ดึงชื่อไฟล์ตั้งค่าของproject____________|
      // เก็บไฟล์ไว้ในarrayชื่อไฟล์
      let fileNames = pathProjects.map(x => {
        // เอาค่าpathเก็บไปไว้ในแอรแรย์ก่อย
        let arrayFile = x.split("/");
        // ชื่อไฟล์ที่ตัดเอา/ออกแล้ว
        // let arrayName = arrayFile[arrayFile.length - 1]
        let arrayName = arrayFile.pop()
        return arrayName;
      });
      console.log("FileName[ยังไม่เซต] : " + fileNames)
      this.setState({ fileName: fileNames })
      console.log("FileName : " + this.state.fileName)
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
    if (!this.state.projectName) {
      alert("Plese select project")
    }
    if (!this.state.projectPath || !this.state.projectContent) {
      alert("Plese select path")
    }
    this.searchApi.saveSettingContent(path, content).then(res => {
      if (res.data.success) {
        alert("SAVE!")
        console.log("SAVE!");

      } else {
        alert("ERROR : " + Error)
      }
    })

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

  private onSelect = (node) => {
    //
    let nameFile = node.name;
    let index = this.state.pathProject.findIndex(x => x.indexOf(nameFile) !== -1)
    let pathFile = this.state.pathProject[index]

    this.setState({
        selectedNode: node,
        projectPath: pathFile
    })
    this.initSettingContent(pathFile)
    console.log(this.state.projectPath)
    console.log(this.state.pathProject)
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

    let { projectName, projectPath, dropdownOption, fileName
      , pathProject, projectContent, subParentNames } = this.state

    return (
      <BodyDiv style={this.props.style}>
        <LeftDiv>
          <ProjectList projectName={projectName} dropdownOption={dropdownOption} onChange={this.onProjectChange} />
          <FileList isSelected={this.isSelected} onSelect={this.onSelect} nodes={this.state.nodes} folder={this.getRoot()}
             projectPath={projectPath} fileName={fileName} pathProject={pathProject}/>
        </LeftDiv>

        <RigthDiv>
          <FileContent ProjectContent={projectContent} onChange={this.onContentChange} />
        </RigthDiv>
      </BodyDiv>
              

    );
  }
}