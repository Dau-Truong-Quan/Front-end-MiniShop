import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import OrderView from "./OrderView";

export default function LabTabs() {
  const [value, setValue] = React.useState("0");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Tất cả" value="0" />
            <Tab label="Chờ xử lý" value="1" />
            <Tab label="Yêu cầu hủy" value="2" />
            <Tab label="Đang giao" value="3" />
            <Tab label="Đã giao" value="4" />
            <Tab label="Đã hủy" value="5" />
          </TabList>
        </Box>
        <TabPanel value="0">
          <OrderView status="0" />
        </TabPanel>
        <TabPanel value="1">
          <OrderView status="1" />
        </TabPanel>
        <TabPanel value="2">
          <OrderView status="2" />
        </TabPanel>
        <TabPanel value="3">
          <OrderView status="3" />
        </TabPanel>
        <TabPanel value="4">
          <OrderView status="4" />
        </TabPanel>
        <TabPanel value="5">
          <OrderView status="5" />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
