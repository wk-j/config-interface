import React, { CSSProperties } from "react"
import { Dropdown } from "semantic-ui-react"
import styled from "styled-components"

const LabelDiv = styled.div`
  margin-bottom: 5px;
`
type Props = {
    projectName: string
    dropdownOption: any[]
    // tslint:disable-next-line:variable-name
    onChange: (string) => void
}
export class ProjectList extends React.Component<Props> {
    constructor(props) {
        super(props)
    }
      public setValue(e, data) {
        this.props.onChange(data.value)
      }
    public render() {
        const DropdownProjectName = ({ }) => (
            <Dropdown placeholder={this.props.projectName} fluid selection options={this.props.dropdownOption}
              onChange={this.setValue.bind(this)} value={this.props.projectName} />
          )
        return (
            <div>
                <LabelDiv>Select Project</LabelDiv>
            <DropdownProjectName />
            </div>
        )
    }
}