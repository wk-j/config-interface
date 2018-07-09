import React, { CSSProperties } from "react"
import { Menu, Segment } from "semantic-ui-react";

export class Header extends React.Component<{ style?: CSSProperties }> {
    public render() {
        return (
            <div style={this.props.style}>
                <Menu pointing>
                    <Menu.Item name="configEditor" />
                </Menu>
            </div>
        )
    }
}