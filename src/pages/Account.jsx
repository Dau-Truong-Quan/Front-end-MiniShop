import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import {
  Avatar,
  Container,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import FormInputAccount from "../components/FormInputAccount";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Account() {
  const [name, setName] = React.useState("");
  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Grid container spacing={1} rowSpacing={2}>
            <Grid item xs={12}>
              <MenuItem>
                <Avatar sx={{ width: 24, height: 24 }} /> Tài khoản của tôi
              </MenuItem>
            </Grid>
            <Grid item xs={12}>
              <MenuItem>
                <Typography variant="inherit">Đơn mua</Typography>
              </MenuItem>
            </Grid>
            <Grid item xs={12}>
              <MenuItem>
                <Typography variant="inherit">Địa chỉ</Typography>
              </MenuItem>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={10}>
          <Grid container spacing={1} rowSpacing={2}>
            <Grid item xs={12}>
              <FormInputAccount />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Account;
