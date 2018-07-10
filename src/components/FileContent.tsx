import React from "react"
import { Button, TextArea } from "semantic-ui-react"
import styled from "styled-components"

type Props = {
 
  projectContent: string
    
    onChange: (string) => void;
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
        this.handleContentChange = this.handleContentChange.bind(this)
      }
      public handleContentChange = (e) => {
        this.setState({ projectContent: e.target.value })
      }

    public componentWillReceiveProps(props: Props) {
        this.state = {
          projectContent: props.projectContent
        }
    }


    public onSave = (e) => {
      this.props.onChange(this.state.projectContent)
  }
  public render() {
      const ButtonSave = () => (
          <Button floated="right" value="Save" name="Save" onClick={this.onSave} >Save</Button>
        )
    

    
    return (
      <div>
      
          <div>Content</div>
          <TextArea placeholder="Choose Project and File First" value={this.state.projectContent}
              style={{ width: "100%", height: "calc(50% - 30px)" }}
              onChange={this.handleContentChange} />
      
      <div>
          <ButtonSave />
      </div>
      </div>
  )
}
}