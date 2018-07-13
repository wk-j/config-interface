import React from "react"
import { Node } from "../share/searchApi";
import "semantic-ui-css/semantic.min.css"
import { List } from "semantic-ui-react"

type FileProps = {
    file: Node
    onSelect: (Node) => void;
    isSelected: (Node) => boolean
    projectPath: string
    fileName: string[]
    pathProject: string[]
}

export class File extends React.Component<FileProps> {
    constructor(props) {
        super(props)
    }

    public onClick = (node) => (e) => {
        this.props.onSelect(node)
    }

    public findPath(file: string) {
        let index = this.props.pathProject.findIndex(x => x.indexOf(file) !== -1)
        return index
    }

    public render() {
        let isSelected = (select) => {
            return this.props.projectPath.indexOf(select) !== -1
        }
        return (
            <List.Item active={isSelected(this.props.file.name)} onClick={this.onClick(this.props.file)} >
            <List.Icon name="file" size="large" verticalAlign="middle" />
            <List.Content>
                <List.Header as="a" >
                {this.props.file.name} {isSelected(this.props.file.name)}
                </List.Header>
                <List.Description as="a">File</List.Description>
            </List.Content>
            </List.Item>
        )
    }
}