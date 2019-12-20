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
      accessToken: "", user: {}, show: false
    };
  }
  componentWillMount() {}

  componentDidMount() {
    axios
      .post("http://localhost:5000/get_app_info")
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
          .then(data => {
            this.setState({accessToken: data.accessToken})
          })
          .then(() => {
            axios
              .get("http://localhost:3000/api/info/get_user_info", {
                headers: {
                  Authorization: "Bearer " + this.state.accessToken
                }
              })
              .then(res => {
                this.setState({user: res.data});
                this.setState({show: true});
                console.log(this.state.user);
              });
          });
      });
  }
  render() {
    // if (this.show) {
    //     return (
    //         <div className="box">
    //         <div class="card">
    //         <div className="card-body">
    //         <h4 class="card-title">{this.user.username}</h4>
    //         <hr />
    //         <p class="card-text">Name: {this.user.name}</p>
    //     <p class="card-text">Age: {this.user.age}</p>
    //     <p class="card-text">Email: {this.user.email}</p>
    //     </div>
    //     </div>
    //     </div>
    // );
    // } else return null;
    return (
      <div className="box">
        <div class="card">
          <div className="card-body">
            <h4 class="card-title">{this.state.user.username}</h4>
            <hr />
            <p class="card-text">Name: {this.state.user.name}</p>
            <p class="card-text">Age: {this.state.user.age}</p>
            <p class="card-text">Email: {this.state.user.email}</p>
          </div>
        </div>
      </div>
    );
  }
}
