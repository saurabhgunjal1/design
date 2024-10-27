import * as React from "react";
import { useEffect } from "react";
import styles from "./dropdown.module.css";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";

import PropertiesForm from "../propertiesform/propertiesForm";

import BasicTable from "../table/BasicTablet";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};
function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;
  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          aria-hidden="false"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 0,
            top: 0,
            padding: 0.5,
            // border: "2px solid green",
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}
export default function DropDown() {
  // const [selectedOption, setSelectedOption] = React.useState("");
  const [allPropertiesData, setallPropertiesData] = React.useState([]);
  // console.log(allPropertiesData);
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/data`);
        setallPropertiesData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchdata();
  }, []);
  const [open, setOpen] = React.useState(false); // Define open state
  const handleClickOpen = (event) => {
    event.preventDefault();
    setOpen(true); // Open the dialog
  };
  const handleClose = (event) => {
    event.preventDefault();
    setOpen(false); // Close the dialog
  };
  const handleAddProperty = (newProperty) => {
    setallPropertiesData((prevData) => [...prevData, newProperty]);
  };
  // console.log(allPropertiesData);
  return (
    <div className={styles.wrapperdiv}>
      <Paper
        style={{
          maxWidth: "fit-content",
          flex: 1,
          padding: "6px",
          // border: "1px solid red",
        }}
        sx={{
          p: 1,
          width: "100%",
          margin: "auto",
          position: "relative",
          overflow: "hidden !important",
          "&.MuiDataGrid-main": {
            overflowX: "hidden !important",
            overflowY: "hidden !important",
          },
        }}
      >
        {/* Add a button to open the dialog */}
        <button type="button" onClick={handleClickOpen}>
          Add
        </button>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
          PaperProps={{
            style: {
              overflowY: "hidden",
              backgroundColor: "#f9fcff",
              backgroundImage:
                "linear-gradient(147deg, #f9fcff 0%, #dee4ea 74%)",
              overflowX: "hidden",
              minWidth: "350px", // Change this value as needed
              maxWidth: "630px", // Change this value as needed
            },
          }}
        >
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={handleClose}
          >
            <PropertiesForm
              onAddProperty={handleAddProperty}
              allPropertiesData={allPropertiesData}
            />
            {/* <PropertiesForm2 /> */}
          </BootstrapDialogTitle>
        </BootstrapDialog>
      </Paper>
      <BasicTable allPropertiesData={allPropertiesData} />
    </div>
  );
}
