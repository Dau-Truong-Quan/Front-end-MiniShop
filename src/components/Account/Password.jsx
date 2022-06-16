import React, { useRef } from "react";
import ReactDOM from "react-dom";
import { Form, Field } from "react-final-form";
import { TextField, Checkbox, Radio, Select } from "final-form-material-ui";

import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { message } from "antd";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import EditIcon from "@mui/icons-material/Edit";
import { Grid, Paper, Typography } from "@mui/material";

const validate = (values) => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = "Required";
  }
  if (!values.lastName) {
    errors.lastName = "Required";
  }
  if (!values.email) {
    errors.email = "Required";
  }
  return errors;
};

function FormInputAccount() {
  const inputFile = useRef(null);
  const dispatch = useDispatch();

  let loginData = JSON.parse(localStorage.getItem("login"));

  const handleSubmit2 = (event) => {
    message.success("đổi thành công");
  };
  const onSubmit = async (values) => {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    await sleep(300);
    console.log("ok");
    axios
      .request({
        method: "PUT",
        url: `http://localhost:8080/api/users/change-password`,
        headers: {
          Authorization: "Bearer " + loginData.dataLogin.accessToken,
        },
        data: {
          id: loginData.dataLogin.id,
          oldPassword: values.passwordOld,
          newPassword: values.passwordNew,
        },
      })
      .then((response) => {
        message.success(response.data);
      })
      .catch((error) => {
        message.error(error.response.data);
      });
  };

  React.useEffect(() => {}, []);

  return (
    <div style={{ padding: 10, margin: "auto", maxWidth: 900 }}>
      <Form
        onSubmit={onSubmit}
        initialValues={{
          passwordOld: "",
          passwordNew: "",
          passwordNewRepeat: "",
        }}
        validate={validate}
        render={({ handleSubmit, reset, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit} noValidate>
            <Paper style={{ padding: 16 }}>
              <Typography variant="h5" align="left" component="h2" gutterBottom>
                Hồ Sơ Của Tôi
              </Typography>
              <Typography variant="h6" align="left" component="h4" gutterBottom>
                Quản lý thông tin hồ sơ để bảo mật tài khoản
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={8}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Field
                        fullWidth={true}
                        required={true}
                        name="passwordOld"
                        component={TextField}
                        type="password"
                        label="Mật Khẩu Hiện Tại"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        fullWidth={true}
                        required={true}
                        name="passwordNew"
                        component={TextField}
                        type="password"
                        label="Mật khẩu mới"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        fullWidth={true}
                        required={true}
                        name="passwordNewRepeat"
                        component={TextField}
                        type="password"
                        label="Mật khẩu mới"
                      />
                    </Grid>

                    <Grid item style={{ marginTop: 16 }}>
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        onClick={() => {
                          handleSubmit2();
                        }}
                      >
                        Submit
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={4}></Grid>
              </Grid>
            </Paper>
          </form>
        )}
      />
    </div>
  );
}

export default FormInputAccount;
