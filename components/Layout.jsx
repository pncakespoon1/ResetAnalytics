import React, { Component } from "react";
import Head from "next/head";

export default class Layout extends Component {
  render() {
    return (
      <React.Fragment>
        <Head>
          <title>Minecraft Reset Analytics</title>
        </Head>
        <div
          id="main"
          className={"text-center text-light bg-dark " + this.props.className}
          style={this.props.style}
        >
          {this.props.children}
        </div>
      </React.Fragment>
    );
  }
}