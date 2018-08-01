import React from "react"
import { Node } from "../share/searchApi";
import "semantic-ui-css/semantic.min.css"
import { List, Modal, Button, Icon } from "semantic-ui-react"
import swal from "sweetalert2";
import MonacoEditor from "react-monaco-editor";

type FileProps = {
    file: Node
    onSelect: (Node) => void;
    isSelected: (Node) => boolean
    projectPath: string
    fileName: string[]
    pathProject: string[]
    newContent: string
    // tslint:disable-next-line:variable-name
    onChange: (string) => void
    oldContent: string
    demoText: string
    extention: string
    pass: boolean
    onDemo: () => void
    onDiscard: () => void
}
type State = {
    alert: boolean
}
export class File extends React.Component<FileProps, State> {
    constructor(props) {
        super(props)
        this.state = {
            alert: null
        }
    }
    public onSave = (e) => {
        console.log("onSave")
        this.props.onChange(this.props.demoText)
        this.setState({ alert: false })
    }
    public onDemo = () => {
        this.setState({ alert: true })
        this.props.onDemo()
    }

    public onClick = (node) => (e) => {
        if (this.props.newContent !== this.props.oldContent) {
            swal({
                allowOutsideClick: false,
                backdrop: true,
                type: "warning",
                title: "Do you to save the change ?",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                cancelButtonText: "discard",
                confirmButtonText: "Save",
                reverseButtons: true
            }).then((result) => {
                if (result.value) {
                    // this.onDemo()
                    this.setState({ alert: true })
                } else {
                    this.setState({ alert: false })
                    this.props.onDiscard()
                }
            })
        } else {
            this.setState({ alert: false })
            this.props.onSelect(node)
        }
        console.log("ALERT STATUS : " + this.state.alert)
    }

    public findPath(file: string) {
        let index = this.props.pathProject.findIndex(x => x.indexOf(file) !== -1)
        return index
    }
    public close = () => this.setState({ alert: false })
    public render() {
        let isSelected = (select) => {
            return this.props.projectPath.indexOf(select) !== -1
        }
        const onlyShow = {
            minimap: { enabled: false },
            automaticLayout: true,
            rulers: [150],
            readOnly: true
        } as any;
        return (
            <List selection>
                <List.Item active={isSelected(this.props.file.pathFile)} onClick={this.onClick(this.props.file)} >
                    <List.Icon name="file" size="large" />
                    <List.Content>
                        <List.Header> {this.props.file.name} {isSelected(this.props.file.name)} </List.Header>
                        <List.Description>{this.props.file.modifieDate}</List.Description>
                    </List.Content>
                </List.Item>
                <Modal open={this.state.alert} >
                    <Modal.Header>Reformat</Modal.Header>
                    <Modal.Content scrolling>
                        <MonacoEditor options={onlyShow} language={this.props.extention} width="100%" height="80%" theme="vs-light" max-width="100%"
                            value={this.props.demoText} />
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color="green" disabled={!this.props.pass} floated="right" icon labelPosition="left" onClick={this.onSave}>
                            <Icon name="check" />
                            Confirm
                            </Button>
                        <Button color="red" icon labelPosition="left" onClick={this.close}>
                            <Icon name="cancel" />
                            Cancel
                            </Button>
                    </Modal.Actions>
                </Modal>
            </List>
        )
    }
}