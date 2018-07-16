import React from "react"
import { TextArea, Button } from "semantic-ui-react"
import MonacoEditor from "react-monaco-editor";
import styled from "styled-components"

const LabelDiv = styled.div`
  margin-bottom: 5px;
`

const ContentDiv = styled.div`
  flex-grow: 1;
  margin-bottom: 10px;
`
type Props = {
    ProjectContent: string
    // tslint:disable-next-line:variable-name
    onChange: (string) => void
}
type State = {
    projectContent: string
}
export class FileContent extends React.Component<Props, State> {
    constructor(props) {
        super(props)
        this.state = {
            projectContent: props.projectContent
        }
        this.handleContentChange = this.handleContentChange
    }
    public handleContentChange = (data) => {
        this.setState({ projectContent: data })
    }
    public componentWillReceiveProps(props: Props) {
        this.state = {
            projectContent: props.ProjectContent
        }
    }
    public onSave = (e) => {
        this.props.onChange(this.state.projectContent)
    }
    public render() {
        const ButtonSave = () => (
            <Button floated="right" value="Save" name="Save" onClick={this.onSave} >Save</Button>
        )

        const options = {
            minimap: { enabled: false }
        } as any;

        return (
            <div>
                <ContentDiv>
                    <LabelDiv>Content</LabelDiv>
                    <MonacoEditor options={options} language="json" width="100%" height="400" theme="vs-dark"
                        value={this.state.projectContent} onChange={this.handleContentChange} />
                </ContentDiv>
                <div>
                    <ButtonSave />
                </div>
            </div>
        )
    }
}