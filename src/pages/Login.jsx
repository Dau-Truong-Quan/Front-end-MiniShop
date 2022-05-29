import axios from "axios";
import React from "react";
import Helmet from "../components/Helmet";

export default function Login() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [login, setLogin] = React.useState(false);
  const [store, setStore] = React.useState(null);

  const loginRequest = () => {
    axios({
      method: "post",
      url: "http://localhost:8080/api/auth/signin",
      headers: {},
      data: {
        username,
        password,
      },
    }).then((response) => {
      localStorage.setItem(
        "login",
        JSON.stringify({
          login: true,
          dataLogin: response.data,
        })
      );
    });
  };

  return (
    <Helmet title="Login">
      <div className="login">
        <label htmlFor="fname">Username</label>
        <input
          type="text"
          id="fname"
          name="firstname"
          placeholder="your user name...."
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <label htmlFor="lname">Password</label>
        <input
          type="text"
          id="lname"
          name="lastname"
          placeholder="Your password.."
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        {/* <input type="submit" defaultValue="Submit" /> */}
        <button
          onClick={() => {
            loginRequest();
          }}
        >
          Login
        </button>
      </div>

      {/* <div id="login">
        <div className="container">
          <div
            id="login-row"
            className="row justify-content-center align-items-center"
          >
            <div id="login-column" className="col-md-6">
              <div id="login-box" className="col-md-12">
                <form id="login-form" className="form" action method="post">
                  <h3 className="text-center text-info">Login</h3>
                  <div className="form-group">
                    <label htmlFor="username" className="text-info">
                      Username:
                    </label>
                    <br />
                    <input
                      value={username}
                      className="btn btn-info btn-md"
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password" className="text-info">
                      Password:
                    </label>
                    <br />
                    <input
                      value={password}
                      className="btn btn-info btn-md"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="remember-me" className="text-info">
                      <span>Remember me</span>&nbsp;
                      <span>
                        <input
                          id="remember-me"
                          name="remember-me"
                          type="checkbox"
                        />
                      </span>
                    </label>
                    <br />
                    <input
                      onClick={() => {
                        loginRequest();
                      }}
                      className="btn btn-info btn-md"
                      defaultValue="submit"
                    />
                  </div>
                  <div id="register-link" className="text-right">
                    <a href="#" className="text-info">
                      Register here
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </Helmet>
  );
}
