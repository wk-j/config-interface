import React from "react"
import { TextArea, Button } from "semantic-ui-react"
import MonacoEditor from "react-monaco-editor";
import styled from "styled-components"
import { Header, Icon, Segment } from "semantic-ui-react"

const LabelDiv = styled.div`
  margin-bottom: 5px;
`

const ContentDiv = styled.div`
  flex-grow: 1;
  margin-bottom: 10px;
  display: block;
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
            <Button animated icon labelPosition="left" color="green" floated="right" value="Save" name="Save" onClick={this.onSave}>
                <Button.Content visible><Icon name="save" /> Save</Button.Content>
                <Button.Content hidden><Icon name="check" />Confirm</Button.Content>
            </Button>
        )
        const options = {
            minimap: { enabled: false }
        } as any;
        return (
            <div>
                <Segment inverted color="teal" secondary>
                    <ContentDiv>
                        <Header as="h3">
                            <Icon name="edit" />
                            <Header.Content>Content</Header.Content>
                        </Header>
                        <MonacoEditor options={options} language="json" width="130%" height="350" theme="vs-light"
                            value={this.state.projectContent} onChange={this.handleContentChange} />
                    </ContentDiv>
                </Segment>
                <div>
                    <ButtonSave />
                </div>
            </div>
        )
    }
}