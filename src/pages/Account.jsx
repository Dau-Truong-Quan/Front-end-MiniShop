import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import ArticleIcon from "@mui/icons-material/Article";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import KeyIcon from "@mui/icons-material/Key";
import {
  Avatar,
  Container,
  ListItemIcon,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import FormInputAccount from "../components/FormInputAccount";
import LabTabs from "../components/LabTabs";
import Address from "../components/Account/Address";
import Password from "../components/Account/Password";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Account() {
  const [tab, setTab] = React.useState("order");
  return (
    <Container maxWidth="lg">
      <Grid className="grid__account" container spacing={2}>
        <Grid item xs={2}>
          <Grid container>
            <Grid item xs={12}>
              <MenuItem onClick={() => setTab("order")}>
                <ListItemIcon>
                  <ArticleIcon fontSize="small" />
                </ListItemIcon>
                <Typography variant="inherit">Đơn mua</Typography>
              </MenuItem>
            </Grid>
            <Grid item xs={12}>
              <MenuItem onClick={() => setTab("address")}>
                <ListItemIcon>
                  <LocationOnIcon fontSize="small" />
                </ListItemIcon>
                <Typography variant="inherit">Địa chỉ</Typography>
              </MenuItem>
            </Grid>
            <Grid item xs={12}>
              <MenuItem onClick={() => setTab("account")}>
                <ListItemIcon>
                  <AccountCircleIcon fontSize="small" />
                </ListItemIcon>
                <Typography variant="inherit">Tài khoản của tôi</Typography>
              </MenuItem>
            </Grid>
            <Grid item xs={12}>
              <MenuItem onClick={() => setTab("password")}>
                <ListItemIcon>
                  <KeyIcon fontSize="small" />
                </ListItemIcon>
                <Typography variant="inherit">Đổi mật khẩu</Typography>
              </MenuItem>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={10}>
          <Grid container spacing={1} rowSpacing={2}>
            <Grid item xs={12}>
              {tab === "account" ? (
                <FormInputAccount />
              ) : tab === "order" ? (
                <LabTabs />
              ) : tab === "address" ? (
                <Address />
              ) : (
                <Password />
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Account;
