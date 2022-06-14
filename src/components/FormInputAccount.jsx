import React, { useRef } from "react";
import ReactDOM from "react-dom";
import { Form, Field } from "react-final-form";
import { TextField, Checkbox, Radio, Select } from "final-form-material-ui";
import {
  Typography,
  Paper,
  Link,
  Grid,
  CssBaseline,
  RadioGroup,
  FormLabel,
  MenuItem,
  FormGroup,
  FormControl,
  FormControlLabel,
} from "@material-ui/core";
import Button from "@mui/material/Button";
import AppAvatar from "../components/ImageUpload";
import { useDispatch, useSelector } from "react-redux";
import { setImage } from "../redux/uploadImage/uploadImage";
import axios from "axios";
import { message } from "antd";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import EditIcon from "@mui/icons-material/Edit";
const galleryImageList = [
  "https://raw.githubusercontent.com/dxyang/StyleTransfer/master/style_imgs/mosaic.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
  "https://raw.githubusercontent.com/ShafeenTejani/fast-style-transfer/master/examples/dora-maar-picasso.jpg",
  "https://pbs.twimg.com/profile_images/925531519858257920/IyYLHp-u_400x400.jpg",
  "https://raw.githubusercontent.com/ShafeenTejani/fast-style-transfer/master/examples/dog.jpg",
  "http://r.ddmcdn.com/s_f/o_1/cx_462/cy_245/cw_1349/ch_1349/w_720/APL/uploads/2015/06/caturday-shutterstock_149320799.jpg",
];
const onSubmit = async (values) => {
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  await sleep(300);

  let o = JSON.stringify(values, 0, 2);
};
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
  const img = useSelector((state) => state.uploadImage.value);

  let loginData = JSON.parse(localStorage.getItem("login"));
  const [user, setUser] = React.useState();
  const [imageUser, setImageUser] = React.useState("");
  const handleClick = (imgage) => {
    dispatch(setImage(imgage));
  };
  const handleUploadAvatar = () => {
    inputFile.current.click();
  };
  const onChangeFile = (event) => {
    event.preventDefault();
    handleConfirmAddFile(event.target.files[0]);
  };
  const handleConfirmAddFile = (file) => {
    let loginData = JSON.parse(localStorage.getItem("login"));
    const formData = new FormData();
    formData.append("file", file);
    axios
      .post("http://localhost:8080/api/image/user2", formData, {
        headers: {
          Authorization: "Bearer " + loginData.dataLogin.accessToken,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);

          setImageUser(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSubmitForm = () => {
    axios
      .request({
        method: "PUT",
        url: `http://localhost:8080/api/users/edit-profile`,
        headers: {
          Authorization: "Bearer " + loginData.dataLogin.accessToken,
        },
        data: {
          id: user.id,
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
          image: img,
        },
      })
      .then((response) => {
        message.success(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  React.useEffect(() => {
    axios
      .get(`http://localhost:8080/api/users/${loginData.dataLogin.id}`, {
        headers: {
          Authorization: "Bearer " + loginData.dataLogin.accessToken,
        },
      })
      .then((response) => {
        setUser(response.data);
        setImageUser(response.data.image);
        console.log(response.data.image);
      })
      .catch((eror) => {
        console.log("no");
      });
  }, []);

  return (
    <div style={{ padding: 10, margin: "auto", maxWidth: 900 }}>
      <Form
        onSubmit={onSubmit}
        initialValues={{
          firstName: user != null ? user.firstName : "",
          lastName: user != null ? user.lastName : "",
          email: user != null ? user.email : "",
          phone: user != null ? user.phone : "",
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
                    <Grid item xs={6}>
                      <Field
                        fullWidth={true}
                        required={true}
                        name="firstName"
                        component={TextField}
                        type="text"
                        label="First Name"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Field
                        fullWidth={true}
                        required={true}
                        name="lastName"
                        component={TextField}
                        type="text"
                        label="Last Name"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        name="email"
                        fullWidth={true}
                        required={true}
                        component={TextField}
                        type="email"
                        label="Email"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        name="phone"
                        fullWidth={true}
                        required={true}
                        component={TextField}
                        type="phone"
                        label="Phone"
                      />
                    </Grid>

                    <Grid item xs={12}></Grid>

                    <Grid item style={{ marginTop: 16 }}>
                      <Button
                        type="button"
                        variant="contained"
                        onClick={reset}
                        disabled={submitting || pristine}
                      >
                        Reset
                      </Button>
                    </Grid>
                    <Grid item style={{ marginTop: 16 }}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          handleSubmitForm();
                        }}
                      >
                        Submit
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={4}>
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    badgeContent={
                      <IconButton
                        style={{ backgroundColor: "rgb(222 216 213)" }}
                        aria-label="edit"
                        size="medium"
                        color="success"
                        onClick={() => {
                          handleUploadAvatar();
                        }}
                      >
                        <EditIcon fontSize="inherit" />
                      </IconButton>
                    }
                  >
                    <AppAvatar
                      url={`http://localhost:8080/users/${imageUser}`}
                      imgSize={100}
                    />
                  </Badge>
                </Grid>
              </Grid>
              <input
                type="file"
                id="file"
                ref={inputFile}
                style={{ display: "none" }}
                onChange={(event) => onChangeFile(event)}
              />
            </Paper>
            <pre>{JSON.stringify(values, 0, 2)}</pre>
          </form>
        )}
      />
    </div>
  );
}

export default FormInputAccount;
