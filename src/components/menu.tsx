import React, { Component } from "react"
import { Menu } from "semantic-ui-react"

export default class MenuExampleBasic extends Component {
  public state = {}

  public handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  public render() {
    const activeItem = this.state

    return (
      <Menu>
        <Menu.Item
          name="menu1"
          active={activeItem === "meni1"}
          onClick={this.handleItemClick}
        >
          Editorials
        </Menu.Item>

        <Menu.Item name="menu2" active={activeItem === "menu2"} onClick={this.handleItemClick}>
          Reviews
        </Menu.Item>

        <Menu.Item
          name="menu3"
          active={activeItem === "menu3"}
          onClick={this.handleItemClick}
        >
          Upcoming Events
        </Menu.Item>
      </Menu>
    )
  }
}