import React, { CSSProperties } from "react"
import { Menu, Icon } from "semantic-ui-react";

export class Header extends React.Component<{ style?: CSSProperties }> {
    public render() {
        return (
            <div style={this.props.style}>
                <Menu inverted color="teal" icon="labeled">
                    <Menu.Item header name="Config Editor" />
                </Menu>
            </div>
        )
    }
}