import React, { Component } from "react";
import "../index.css";
import axios from "axios";
import * as qs from "query-string";
export default class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "",
      reject: "",
      data: {
        redirect_uri: "",
        scope: "",
        client_id: "",
        client_secret: ""
      },
      accessToken: ""
    };
  }
  componentWillMount() {}

  componentDidMount() {
    axios
      .post("http://localhost:4000/get_app_info")
      .then(res => res.data)
      .then(res => this.setState({ data: res }))
      .then(() => {
        const code = qs.parse(window.location.search);
        console.log(code);
        console.log(this.state.data);
        this.setState({ code: code.code });
        axios
          .post("http://localhost:3000/oauth/get_access_token", {
            grant_type: "authorization_code",
            client_id: this.state.data.client_id,
            client_secret: this.state.data.client_secret,
            redirect_uri: this.state.data.redirect_uri,
            code: this.state.code
          })
          .then(res => res.data)
          .then(data => this.setState({ accessToken: data.accessToken }))
          .then(() => {
            console.log(this.state.accessToken);
            axios
              .post("http://localhost:3000/api/info/get_user_info", {
                Authorizaion: `Bearer ${this.state.accessToken}`
              })
              .then(data => console.log(data));
          });
      });
  }
  render() {
    return (
      <div className="box">
        <div class="card">
          <div className="card-body">
            <h4 class="card-title"></h4>
            <hr />
            <p class="card-text">Age: 22</p>
            <p class="card-text">Email: abc@gmail.com</p>
          </div>
        </div>
      </div>
    );
  }
}
