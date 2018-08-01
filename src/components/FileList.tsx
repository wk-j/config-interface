import React from "react"
import { List, Modal, Button } from "semantic-ui-react"
import { Node } from "../share/searchApi";
import { File } from "./File"
import styled from "styled-components"

type Props = {
    projectPath: string
    fileName: string[]
    pathProject: string[]
    onSelect: (Node) => void;
    isSelected: (Node) => boolean;
    folder: Node
    nodes: Node[]
    newContent: string
    oldContent: string
    // tslint:disable-next-line:variable-name
    onChange: (string) => void
    demoText: string
    extention: string
    pass: boolean
    onDemo: () => void
    onDiscard: () => void
}

export class FileList extends React.Component<Props> {
    constructor(props) {
        super(props)
    }
    private getFiles = (node: Node) => {
        return this.props.nodes.filter(x => x.parent === node.id && x.isFile)
    }

    private getFolders = (node: Node) => {
        return this.props.nodes.filter(x => x.parent === node.id && !x.isFile)
    }

    public render() {
        let { folder, nodes } = this.props;

        const ListMain = ({ }) => (
            <List>
                <List.Item>
                    <List.Icon color="yellow" name="folder" />
                    <List.Content>
                        <List.Header> {this.props.folder.name} </List.Header>
                        <List.Description></List.Description>
                    </List.Content>
                    {this.getFolders(folder).map(x => <FileList onDiscard={this.props.onDiscard} onDemo={this.props.onDemo} extention={this.props.extention} pass={this.props.pass} demoText={this.props.demoText} onChange={this.props.onChange} newContent={this.props.newContent} oldContent={this.props.oldContent} projectPath={this.props.projectPath} fileName={this.props.fileName} pathProject={this.props.pathProject} isSelected={this.props.isSelected} onSelect={this.props.onSelect} folder={x} nodes={nodes} />)}
                    {this.getFiles(folder).map(x => <File onDiscard={this.props.onDiscard} onDemo={this.props.onDemo} extention={this.props.extention} pass={this.props.pass} demoText={this.props.demoText} onChange={this.props.onChange} newContent={this.props.newContent} oldContent={this.props.oldContent} projectPath={this.props.projectPath} fileName={this.props.fileName} pathProject={this.props.pathProject} isSelected={this.props.isSelected} onSelect={this.props.onSelect} file={x} />)}
                </List.Item>
            </List>
        )

        return (
            <ListMain />
        )
    }
}