import React, { Component } from "react";
import axios from "axios";
import "../index.css";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        redirect_uri: "",
        scope: "",
        client_id: ""
      }
    };
  }

  componentWillMount() {
    axios
      .post("http://localhost:5000/get_app_info")
      .then(res => res.data)
      .then(res => this.setState({ data: res }));
  }

  render() {
    console.log(this.state.data);
    return (
      <div>
        <div className="box">
          <a
            href={`http://localhost:4200/oauth2/authorize?redirect_uri=${this.state.data.redirect_uri}&client_id=${this.state.data.client_id}&scope=${this.state.data.scope}`}
          >
            <button className="btn btn-primary button-login">
              Login with identity
            </button>
          </a>
        </div>
      </div>
    );
  }
}
