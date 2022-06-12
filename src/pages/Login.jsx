import axios from "axios";
import * as React from "react";
import Helmet from "../components/Helmet";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

import Alert from "@mui/material/Alert";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeAllItem } from "../redux/shopping-cart/cartItemsSlide";

export default function Login() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [login, setLogin] = React.useState(false);
  const [store, setStore] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);
  const history = useHistory();

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const handleCloseError = (reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenError(false);
  };
  const handleClick = () => {
    setOpen(true);
  };
  const loginRequest = () => {
    axios({
      method: "post",
      url: "http://localhost:8080/api/auth/signin",
      headers: {},
      data: {
        username,
        password,
      },
    })
      .then((response) => {
        setOpen(true);
        localStorage.setItem(
          "login",
          JSON.stringify({
            login: true,
            dataLogin: response.data,
          })
        );
      })
      .catch((error) => {
        setOpenError(true);
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

      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Login succes!
          </Alert>
        </Snackbar>
        <Snackbar
          open={openError}
          autoHideDuration={6000}
          onClose={handleCloseError}
        >
          <Alert
            onClose={handleCloseError}
            severity="error"
            sx={{ width: "100%" }}
          >
            Login false!
          </Alert>
        </Snackbar>
      </Stack>
    </Helmet>
  );
}
