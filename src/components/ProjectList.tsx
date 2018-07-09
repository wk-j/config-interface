import React, { CSSProperties } from "react"
import { Dropdown } from "semantic-ui-react"
import { Body } from "./Body"
import { getApiUrl } from "../share/Configuration";
import styled from "styled-components"

const LabelDiv = styled.div`
  margin-bottom: 5px;
`
export class ProjectList extends React.Component<{ style?: CSSProperties }> {
    public body = new Body(getApiUrl());
    public render() {
        const DropdownProjectName = ({ }) => (
            <Dropdown placeholder="Select Project..." fluid selection options={this.body.state.dropdownOption}
              onChange={this.body.setValue.bind(this)} value={this.body.state.projectName} />
          )
        return (
            <div>
                <LabelDiv>Select Project</LabelDiv>
            <DropdownProjectName />
            </div>
        )
    }
}