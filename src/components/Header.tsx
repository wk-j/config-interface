import React, { CSSProperties } from "react"
import { Menu, Icon, Message, Button } from "semantic-ui-react";
type Props = {
    loggedIn: boolean
    // tslint:disable-next-line:variable-name
    onLogout: (string) => void
}
type State = {
    render: boolean
}
export class Header extends React.Component<Props, State> {
    public onLogout = () => {
        this.props.onLogout(false)
    }
    constructor(props) {
        super(props);

        this.state = {
            render: false
        };
    }
    public render() {
        return (
            this.props.loggedIn ?
            <div>
                <Menu inverted color="teal" icon="labeled">
                    <Menu.Item header name="Config Editor" />
                    <Menu.Item position="right" disabled={false}>
                    <Button animated="vertica" color="red" onClick={this.onLogout}>
                    <Button.Content hidden><Icon name="sign out" /></Button.Content>
                    <Button.Content visible>
                    Log out
                    </Button.Content>
                    </Button>
                    </Menu.Item>
                </Menu>
                </div>
                :
                <div>
                <Menu inverted color="teal" icon="labeled">
                    <Menu.Item header name="Config Editor" />
                </Menu>
            </div>
        )
    }
}