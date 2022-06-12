import * as React from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import DialogContentText from "@mui/material/DialogContentText";
import { useDispatch } from "react-redux";
import Slide from "@mui/material/Slide";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function Address() {
  let list = [];
  const [listaddress, setListaddress] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [province, setProvince] = React.useState("");
  const [listProvince, setListProvince] = React.useState("");
  const [district, setDistrict] = React.useState("");
  const [listDistrict, setListDistrict] = React.useState("");
  const [ward, setWard] = React.useState("");
  const [listWard, setListWard] = React.useState("");
  const dispatch = useDispatch();
  const [wardAdd, setWardAdd] = React.useState("");
  const [indexChoose, setIndexChoose] = React.useState(0);

  const [address, setAddress] = React.useState("");

  const [openDelete, setOpenDelete] = React.useState(false);

  const handleClickOpenDelete = (index) => {
    setOpenDelete(true);
    setIndexChoose(index);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteAddressOder = () => {
    let loginData = JSON.parse(localStorage.getItem("login"));

    axios
      .request({
        method: "DELETE",
        url: `http://localhost:8080/api/address/address/${listaddress[indexChoose].addressId}`,
        headers: {
          Authorization: "Bearer " + loginData.dataLogin.accessToken,
        },
      })
      .then((response) => {
        axios
          .get(
            `http://localhost:8080/api/address/address/${loginData.dataLogin.id}`,
            {
              headers: {
                Authorization: "Bearer " + loginData.dataLogin.accessToken,
              },
            }
          )
          .then((response) => {
            // setListaddress(response.data)
            response.data.map((item, index) => {
              list = [...list, item.specificAddress];
            });
            setListaddress(response.data);
          })
          .catch((eror) => {});
      });

    setOpenDelete(false);
  };

  const handleAddressOder = () => {
    let loginData = JSON.parse(localStorage.getItem("login"));

    axios
      .request({
        method: "POST",
        url: `http://localhost:8080/api/address/address/${loginData.dataLogin.id}`,
        headers: {
          Authorization: "Bearer " + loginData.dataLogin.accessToken,
        },
        data: {
          specificAddress: address,
          ward: wardAdd,
        },
      })
      .then((response) => {
        axios
          .get(
            `http://localhost:8080/api/address/address/${loginData.dataLogin.id}`,
            {
              headers: {
                Authorization: "Bearer " + loginData.dataLogin.accessToken,
              },
            }
          )
          .then((response) => {
            // setListaddress(response.data)
            response.data.map((item, index) => {
              list = [...list, item.specificAddress];
            });
            setListaddress(response.data);
          })
          .catch((eror) => {});
      });

    setOpen(false);
  };
  const handleChangeProvince = (event) => {
    let loginData = JSON.parse(localStorage.getItem("login"));

    setProvince(event.target.value);

    axios
      .request({
        method: "GET",
        url: `http://localhost:8080/api/address/district/${
          event.target.value * 1 + 1
        }`,
        headers: {
          Authorization: "Bearer " + loginData.dataLogin.accessToken,
        },
      })
      .then((response) => {
        setListDistrict(response.data);
      });
  };
  const handleChangeDistrict = (event) => {
    let loginData = JSON.parse(localStorage.getItem("login"));
    setDistrict(event.target.value);

    axios
      .request({
        method: "GET",
        url: `http://localhost:8080/api/address/ward/${
          event.target.value * 1 + 1
        }`,
        headers: {
          Authorization: "Bearer " + loginData.dataLogin.accessToken,
        },
      })
      .then((response) => {
        setListWard(response.data);
      })
      .catch((error) => {});
  };
  const handleChangeWard = (event) => {
    setWard(event.target.value);
    let loginData = JSON.parse(localStorage.getItem("login"));

    setWardAdd(listWard[event.target.value * 1]);
  };

  React.useEffect(() => {
    let loginData = JSON.parse(localStorage.getItem("login"));
    axios
      .get(
        `http://localhost:8080/api/address/address/${loginData.dataLogin.id}`,
        {
          headers: {
            Authorization: "Bearer " + loginData.dataLogin.accessToken,
          },
        }
      )
      .then((response) => {
        // setListaddress(response.data)
        response.data.map((item, index) => {
          list = [...list, item.specificAddress];
        });
        setListaddress(response.data);
      })
      .catch((eror) => {});
    axios
      .get(`http://localhost:8080/api/address/province`, {
        headers: {
          Authorization: "Bearer " + loginData.dataLogin.accessToken,
        },
      })
      .then((response) => {
        setListProvince(response.data);
      })
      .catch((eror) => {});
  }, []);

  const suaDiaChi = (index) => {
    let loginData = JSON.parse(localStorage.getItem("login"));

    setProvince(listaddress[index].ward.district.province.provinceId - 1);
    axios
      .request({
        method: "GET",
        url: `http://localhost:8080/api/address/district/${
          listaddress[index].ward.district.province.provinceId * 1
        }`,
        headers: {
          Authorization: "Bearer " + loginData.dataLogin.accessToken,
        },
      })
      .then((response) => {
        setListDistrict(response.data);
        setDistrict(listaddress[index].ward.district.districtId - 1);

        axios
          .request({
            method: "GET",
            url: `http://localhost:8080/api/address/ward/${listaddress[index].ward.district.districtId}`,
            headers: {
              Authorization: "Bearer " + loginData.dataLogin.accessToken,
            },
          })
          .then((response) => {
            setListWard(response.data);
            setWard(listaddress[index].ward.wardId - 1);
            setAddress(listaddress[index].specificAddress);
          })
          .catch((error) => {});
      });
    setOpen(true);
  };

  return (
    <div className="address__account">
      <div className="address__account__header">
        <div className="address__account__header__name">
          {listaddress?.length > 0 ? "Địa Chỉ Của Tôi" : "Chưa có địa chỉ"}
        </div>
        <div className="address__account__header__button">
          <button className="stardust-button vg-cf0" onClick={handleClickOpen}>
            <svg
              enableBackground="new 0 0 10 10"
              viewBox="0 0 10 10"
              role="img"
              className="stardust-icon stardust-icon-plus-sign _5qwP-1"
            >
              <path
                stroke="none"
                d="m10 4.5h-4.5v-4.5h-1v4.5h-4.5v1h4.5v4.5h1v-4.5h4.5z"
              />
            </svg>
            Thêm địa chỉ mới
          </button>
          <Dialog
            fullWidth={"xs"}
            maxWidth={"xs"}
            open={open}
            onClose={handleClose}
          >
            <DialogTitle>Thêm địa chỉ mới</DialogTitle>
            <DialogContent>
              <DialogContent>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth={true}>
                    <InputLabel id="demo-simple-select-label">
                      Province
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={province}
                      label="Province"
                      onChange={handleChangeProvince}
                    >
                      {listProvince &&
                        listProvince.length &&
                        listProvince.map((item, index) => {
                          return (
                            <MenuItem value={index} key={index}>
                              {item.provinceName}
                            </MenuItem>
                          );
                        })}
                    </Select>
                  </FormControl>
                </Box>
              </DialogContent>

              <DialogContent>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth={true}>
                    <InputLabel id="demo-simple-select-label">
                      District
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={district}
                      label="District"
                      onChange={handleChangeDistrict}
                    >
                      {listDistrict &&
                        listDistrict.length &&
                        listDistrict.map((item, index) => {
                          return (
                            <MenuItem value={index} key={index}>
                              {item.districtName}
                            </MenuItem>
                          );
                        })}
                    </Select>
                  </FormControl>
                </Box>
              </DialogContent>
              <DialogContent>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth={true}>
                    <InputLabel id="demo-simple-select-label">Ward</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={ward}
                      label="Ward"
                      onChange={handleChangeWard}
                    >
                      {listWard &&
                        listWard.length &&
                        listWard.map((item, index) => {
                          return (
                            <MenuItem value={index} key={index}>
                              {item.wardName}
                            </MenuItem>
                          );
                        })}
                    </Select>
                  </FormControl>
                </Box>
              </DialogContent>

              <DialogContent>
                <TextField
                  autoFocus
                  value={address}
                  margin="dense"
                  id="address"
                  label="Địa chỉ cụ thể"
                  type="input"
                  fullWidth={true}
                  variant="standard"
                  onChange={(event) => setAddress(event.target.value)}
                />
              </DialogContent>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Thoát</Button>
              <Button onClick={handleAddressOder}>Xác nhận</Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={openDelete}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleCloseDelete}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>{"Bạn có chắc muốn xoá địa chỉ này?"}</DialogTitle>

            <DialogActions>
              <Button onClick={handleCloseDelete}>Trở lại</Button>
              <Button
                onClick={() => {
                  handleDeleteAddressOder();
                }}
              >
                Xóa
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
      {listaddress &&
        listaddress.length &&
        listaddress.map((item, index) => {
          return (
            <div key={index}>
              <div className="border__seapare"></div>
              <div className="address__account__body">
                <div className="address__account__body__contentLeft">
                  <div>Địa chỉ</div>
                  <div>
                    {item.specificAddress +
                      "," +
                      item.ward.wardName +
                      "," +
                      item.ward.district.districtName +
                      "," +
                      item.ward.district.province.provinceName}
                  </div>
                </div>
                <div className="address__account__body__contentRight">
                  <button
                    className="stardust-button vg-cf0"
                    onClick={() => suaDiaChi(index)}
                  >
                    Sửa
                  </button>
                  <button
                    className="stardust-button vg-cf0"
                    onClick={() => {
                      handleClickOpenDelete(index);
                    }}
                  >
                    Xóa
                  </button>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default Address;
