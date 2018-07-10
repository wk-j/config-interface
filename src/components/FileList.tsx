import React from "react"
import { List } from "semantic-ui-react"
import { Body } from "./Body"
import { getApiUrl } from "../share/Configuration";

type Props = {
    projectPath: string
    fileName: string[]
    pathProject: string[]
    Name: string
    // tslint:disable-next-line:variable-name
    onChange: (string) => void
}
export class FileList extends React.Component<Props> {
    constructor(props) {
        super(props)
    }
    private body = new Body(getApiUrl())
    public findPath(file: string) {
        let index = this.props.pathProject.findIndex(x => x.indexOf(file) !== -1)
        return index
      }
    public selectFile(e, data) {
        this.props.onChange(data.value)
    }
    public render() {
        let isSelected = (file) => {
            return this.props.projectPath.indexOf(file) !== -1
        }
        // _______________สร้างlist_____________|
        const listz = this.props.fileName.map((file, key) => (
            <List.Item active={isSelected(file)} key={key} onClick={this.selectFile.bind(this)} value={this.props.pathProject[this.findPath((file))]}>
                <List.Icon name="file" size="large" verticalAlign="middle" />
                <List.Content>
                    <List.Header as="a" >
                        File Name :{file} {isSelected(file)}
                    </List.Header>
                    <List.Description as="a">{this.props.pathProject[this.findPath((file))]}</List.Description>
                </List.Content>
            </List.Item>
        ));
        return (
            <List animated divided selection relaxed >
                {listz}
            </List>
        )
    }
}