import React from "react";
import ReactDOM from "react-dom";
import { Form, Field } from "react-final-form";
import { TextField, Checkbox, Radio, Select } from "final-form-material-ui";
import {
  Typography,
  Paper,
  Link,
  Grid,
  Button,
  CssBaseline,
  RadioGroup,
  FormLabel,
  MenuItem,
  FormGroup,
  FormControl,
  FormControlLabel,
} from "@material-ui/core";
import ImageUpload from "../components/ImageUpload";
import { useDispatch, useSelector } from "react-redux";
import { setImage } from "../redux/uploadImage/uploadImage";
import axios from "axios";
import { message } from "antd";
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
  const dispatch = useDispatch();
  const img = useSelector((state) => state.uploadImage.value);
  let loginData = JSON.parse(localStorage.getItem("login"));
  const [user, setUser] = React.useState();
  const handleClick = (imgage) => {
    dispatch(setImage(imgage));
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
        console.log(response.data);
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

                    {/* <Grid item>
                      <FormControl component="fieldset">
                        <FormLabel component="legend">giới tính</FormLabel>
                        <RadioGroup row>
                          <FormControlLabel
                            label="Name"
                            control={
                              <Field
                                name="nam"
                                component={Radio}
                                type="radio"
                                value="larry"
                              />
                            }
                          />
                          <FormControlLabel
                            label="Nữ"
                            control={
                              <Field
                                name="nu"
                                component={Radio}
                                type="radio"
                                value="moe"
                              />
                            }
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid> */}
                    {/* <Grid item>
                      <FormControl component="fieldset">
                        <FormLabel component="legend">Sauces</FormLabel>
                        <FormGroup row>
                          <FormControlLabel
                            label="Ketchup"
                            control={
                              <Field
                                name="sauces"
                                component={Checkbox}
                                type="checkbox"
                                value="ketchup"
                              />
                            }
                          />
                          <FormControlLabel
                            label="Mustard"
                            control={
                              <Field
                                name="sauces"
                                component={Checkbox}
                                type="checkbox"
                                value="mustard"
                              />
                            }
                          />
                          <FormControlLabel
                            label="Salsa"
                            control={
                              <Field
                                name="sauces"
                                component={Checkbox}
                                type="checkbox"
                                value="salsa"
                              />
                            }
                          />
                        </FormGroup>
                      </FormControl>
                    </Grid> */}

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
                  <ImageUpload
                    cardName="Input Image"
                    handleClick={handleClick}
                    imageGallery={galleryImageList}
                  />
                </Grid>
              </Grid>
            </Paper>
            <pre>{JSON.stringify(values, 0, 2)}</pre>
          </form>
        )}
      />
    </div>
  );
}

export default FormInputAccount;
