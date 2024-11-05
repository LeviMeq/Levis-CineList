import React from "react";
import PropTypes from "prop-types";
import { Container, AppBar, Tabs, Tab, Typography, Box, styled } from "@mui/material";
import Api from "./Api";
import Contact from "./Contact";
import Upcoming from "../components/upcoming/Upcoming";
import LocalStor from "./LocalStor";

// Styled component for root
const RootBox = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  background: 'lightgrey',
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Container
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={1}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </Container>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    "aria-controls": `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

export default function Header() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <RootBox>
      <AppBar position="static" sx={{ background: "orange", color: "black" }}>
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
        >
          <LinkTab label="movies" href="/drafts" {...a11yProps(0)} />
          <LinkTab label="upcoming" href="/trash" {...a11yProps(1)} />
          <LinkTab label="favoris" href="/spam" {...a11yProps(2)} />
          <LinkTab label="contact" href="/spam" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Api />
      </TabPanel >
      <TabPanel value={value} index={1}  style={{ padding: 0, backgroundColor: 'yellow'}}>
        <Upcoming />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <LocalStor />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Contact />
      </TabPanel>
    </RootBox>
  );
}
