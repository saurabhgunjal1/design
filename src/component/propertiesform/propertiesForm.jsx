import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import styles from "../propertiesform/propertiesForm.module.css";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid2";
// import { v4 as uuidv4 } from "uuid";
import { object } from "prop-types";
import { red } from "@mui/material/colors";
import axios from "axios";
// let idCounter = 0; //Each child in a list should have a unique "key" prop.
//style for upload button text "upload file 2mb"
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
//style for matrial ui select tag for scrolbar in select tag
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 1;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
export default function PropertiesForm({ onAddProperty, allPropertiesData }) {
  console.log(allPropertiesData);
  // const uniqueID = uuidv4();
  //componentproperty object for showing properties input field based on selected component
  const [componentProperty, setcomponentProperty] = useState({
    Visibility: [
      "backgroundImage",
      "button",
      "Table",
      "checkbox",
      "Messagebox",
      "PopupWindow",
      "Slider",
      "Switch",
      "TextInput",
      "TextDisplay",
    ],
    ValueType: [
      "backgroundImage",
      "button",
      "Table",
      "checkbox",
      "Messagebox",
      "PopupWindow",
      "Slider",
      "Switch",
      "TextInput",
      "TextDisplay",
    ],
    Height: [
      "backgroundImage",
      "button",
      "Table",
      "checkbox",
      "Messagebox",
      "PopupWindow",
      "Slider",
      "Switch",
      "TextInput",
      "TextDisplay",
    ],
    //
    Width: [
      "backgroundImage",
      "button",
      "Table",
      "checkbox",
      "Messagebox",
      "PopupWindow",
      "Slider",
      "Switch",
      "TextInput",
      "TextDisplay",
    ],
    WidgetDescription: [
      "backgroundImage",
      "button",
      "Table",
      "checkbox",
      "Messagebox",
      "PopupWindow",
      "Slider",
      "Switch",
      ,
      "TextInput",
      "TextDisplay",
    ],
    Xpos: [
      "backgroundImage",
      "button",
      "Table",
      "checkbox",
      "Messagebox",
      "PopupWindow",
      "Slider",
      "Switch",
      ,
      "TextInput",
      "TextDisplay",
    ],
    Ypos: [
      "backgroundImage",
      "button",
      "Table",
      "checkbox",
      "Messagebox",
      "PopupWindow",
      "Slider",
      "Switch",
      ,
      "TextInput",
      "TextDisplay",
    ],
    MarginLeft: [
      "backgroundImage",
      "button",
      "Table",
      "checkbox",
      "Messagebox",
      "PopupWindow",
      "Slider",
      "Switch",
      ,
      "TextInput",
      "TextDisplay",
    ],
    MarginRight: [
      "backgroundImage",
      "button",
      "Table",
      "checkbox",
      "Messagebox",
      "PopupWindow",
      "Slider",
      "Switch",
      "TextInput",
      "TextDisplay",
    ],
    MarginTop: [
      "backgroundImage",
      "button",
      "Table",
      "checkbox",
      "Messagebox",
      "PopupWindow",
      "Slider",
      "Switch",
      "TextInput",
      "TextDisplay",
    ],
    MarginBottom: [
      "backgroundImage",
      "button",
      "Table",
      "checkbox",
      "Messagebox",
      "PopupWindow",
      "Slider",
      "Switch",
      "TextInput",
      "TextDisplay",
    ],
    PaddingLeft: [
      "backgroundImage",
      "button",
      "Table",
      "TextInput",
      "TextDisplay",
    ],
    PaddingRight: [
      "backgroundImage",
      "button",
      "Table",
      "TextInput",
      "TextDisplay",
    ],
    PaddingTop: [
      "backgroundImage",
      "button",
      "Table",
      "TextInput",
      "TextDisplay",
    ],
    PaddingBottom: [
      "backgroundImage",
      "button",
      "Table",
      "TextInput",
      "TextDisplay",
    ],
    BackgroundColor: [
      "button",
      "Table",
      "PopupWindow",
      "TextInput",
      "TextDisplay",
    ],
    TransparencyPercentage: [
      "backgroundImage",
      "button",
      "Table",
      "PopupWindow",
      "Switch",
    ],
    LabelColor: [
      "button",
      "Table",
      "checkbox",
      "Messagebox",
      "Switch",
      "TextInput",
      "TextDisplay",
    ],
    FontWeight: [
      "button",
      "Table",
      "checkbox",
      "Messagebox",
      "Switch",
      "TextInput",
      "TextDisplay",
    ],
    FontSize: [
      "button",
      "Table",
      "checkbox",
      "Messagebox",
      "Switch",
      "TextInput",
      "TextDisplay",
    ],
    Border: [
      "backgroundImage",
      "button",
      "Table",
      "checkbox",
      "Messagebox",
      "PopupWindow",
      "Switch",
      ,
      "TextInput",
      "TextDisplay",
    ],
    OverflowWrap: ["backgroundImage", "button", "Table"],
    BlockSize: ["backgroundImage", "button", "Table"],
    Redirection: ["button", "Table"],
    RedirectionLink: ["button", "Table"],
    TextAlign: ["button", "Table", "Messagebox", "TextInput", "TextDisplay"],
    Tooltip: ["backgroundImage", "button", "Switch"],
    TooltipText: ["backgroundImage", "button", "Switch"],
    /* zindex */ Layer: ["backgroundImage", "button", "Switch"],
    ImportedImage: [
      "backgroundImage",
      "PopupWindow",
      "Slider",
      "Switch",
      "TextInput",
      ,
      "TextDisplay",
    ],
  });
  // data array for saving all data when submited data
  const [data, setdata] = useState([]);
  //uploadedImage for the saving the image file data when uploaded
  const [uploadedImage, setuploadedImage] = useState([]);
  // for styling upload image button
  const [ishovered, setIsHovered] = useState(false);
  //Intializing the error state to store validation errors
  const [errors, setErrors] = useState({});
  // properties object contain all properties
  const [properties, setProperties] = useState({
    component: "",
    WidgetDescription: "",
    Visibility: true,
    ValueType: "",
    Height: 100,
    Width: 100,
    Xpos: 0,
    Ypos: 0,
    MarginLeft: 0,
    MarginRight: 0,
    MarginTop: 0,
    MarginBottom: 0,
    PaddingLeft: 0,
    PaddingRight: 0,
    PaddingTop: 0,
    PaddingBottom: 0,
    BackgroundColor: "#000000",
    TransparencyPercentage: 0,
    LabelColor: "#000000",
    FontWeight: "normal",
    FontSize: 12,
    Border: 0,
    OverflowWrap: "break-word",
    BlockSize: 50,
    Redirection: true,
    RedirectionLink: "",
    TextAlign: "Center",
    Tooltip: false,
    TooltipText: "",
    Layer: 0,
    ImportedImage: [],
  });
  // common onchange handler for all the input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperties((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  //it is onchange handler for tooltip checkbox
  // it updates the value of tooltip is it true or false
  const handleCheckboxChange = (e) => {
    setProperties((prev) => ({
      ...prev,
      Tooltip: e.target.checked,
    }));
  };
  // handlefilechange is for uploaded image handler
  //it checks file size and then add it to ImportedImage property in properties object
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    files.forEach((file) => {
      if (file.size > 2 * 1024 * 1024) {
        alert("File size greater than 2 MB. Please upload a smaller file.");
      } else {
        setuploadedImage(files);
        setProperties((prev) => ({
          ...prev,
          ImportedImage: files, // Store the entire file objects in importedimage
        }));
      }
    });
  };
  //this is handler for selection of component
  //we are adding component name for component property in properties object
  const handleComponentChange = (e) => {
    const selectedComponent = e.target.value;
    setProperties((prev) => ({
      ...prev,
      component: selectedComponent,
    }));
    //search in data array if the selected component is present
    //if present show the existing properties data of that component
    //if not add it to data array as new property data of that selected component
    const existingProperties = data.find(
      (item) => item.component === selectedComponent
    );
    if (existingProperties) {
      setProperties(existingProperties);
    } else {
      setProperties((prev) => ({
        ...prev,
        // component: "",
        // id: idCounter++,
        WidgetDescription: "",
        Visibility: true,
        ValueType: "",
        Height: 100,
        Width: 100,
        Xpos: 0,
        Ypos: 0,
        MarginLeft: 0,
        MarginRight: 0,
        MarginTop: 0,
        MarginBottom: 0,
        PaddingLeft: 0,
        PaddingRight: 0,
        PaddingTop: 0,
        PaddingBottom: 0,
        BackgroundColor: "#000000",
        TransparencyPercentage: 0,
        LabelColor: "#000000",
        FontWeight: "normal",
        FontSize: 12,
        Border: 0,
        OverflowWrap: "break-word",
        BlockSize: 50,
        Redirection: true,
        RedirectionLink: "",
        TextAlign: "Center",
        Tooltip: false,
        TooltipText: "",
        Layer: 0,
        ImportedImage: uploadedImage,
      }));
    }
  };
  //function for validating the form
  const validateForm = () => {
    //object to store errors
    let formErrors = {};
    //it check widgetDescription properties. we check is it empty or filled and show require
    // message.
    if (!properties.WidgetDescription) {
      formErrors.WidgetDescription = "widget description is required*";
    }
    //return if any error found
    return formErrors;
  };
  //handlesubmit added on save button for form submission and adding data to localstorage.
  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent the default form submit behavior
    const formErrors = validateForm(); // validate form and get any errors
    // const small_id = uniqueID.slice(0, 8);
    //check if there are no validation errors
    if (Object.keys(formErrors).length === 0) {
      console.log("form submitted:"); // no error found, procced with form submission
    } else {
      //set the errors state to show error msg in UI
      setErrors(formErrors);
      return;
    }
    //object will store only the properties that are relevant to the currently selected component.
    const applicableProperties = {};
    //loop iterates over each key in the properties object
    for (const key in properties) {
      //check if the current key from properties exists in the componentProperty object and if the
      // currently selected component (e.g., backgroundImage, button, or Table) is in the array for that
      // key.
      if (
        componentProperty[key] &&
        componentProperty[key].includes(properties.component)
      ) {
        applicableProperties[key] = properties[key];
      }
    }
    //retrive existing data from localstorage
    // let storedData = localStorage.getItem("data");
    //parse the existing array or create a new one
    // let dataArray = storedData ? JSON.parse(storedData) : [];
    // console.log(dataArray);
    // isDuplicate for checking the widgetDescription is unique or not
    // console.log(allPropertiesData);
    const isDuplicate = allPropertiesData.some(
      (item) => item.WidgetDescription === properties.WidgetDescription
    );
    // check isDuplicate true or false and also check widgetdescription input empty or not and
    // give alert
    //if everything ok we push the data to dataarray
    if (isDuplicate || properties.WidgetDescription === "") {
      alert("widget description should be unique and it should not be empty");
    } else {
      //If the key is applicable, we add it to the applicableProperties object with its corresponding
      // value from properties
      applicableProperties.component = properties.component;
      const propertiesdata = {
        ...applicableProperties,
        // id: small_id,
      };

      console.log(`before request`, propertiesdata);
      console.log("properties data all : ", propertiesdata.ImportedImage);

      if (propertiesdata.ImportedImage !== undefined) {
        const file = propertiesdata.ImportedImage[0];
        propertiesdata.ImportedImage = [
          {
            name: file.name,
            type: file.type,
            size: file.size,
            lastModified: file.lastModified,
            // Create a URL that can be used locally
            url: URL.createObjectURL(file),
          },
        ];
      }

      try {
        const response = await axios.post(
          "http://localhost:8000/data",
          propertiesdata
        );
        console.log("data saved:", response.data);
        // Update the state with the new data
        onAddProperty(response.data);
      } catch (error) {
        console.error("Error saving data:", error);
        alert("There was an error saving the data. Please try again.");
      }
      //append new form data to the array
      // allPropertiesData.push(propertiesdata);
      // setallPropertiesData(allPropertiesData);
    }
    //save the updated array back to localstorage
    // localStorage.setItem("data", JSON.stringify(dataArray));
    // console.log(dataArray);
  };
  //image validation events
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  //this checks if the component property contains any value or its empty. based on it we
  // conditionally render the input field
  const isComponentSelected = properties.component !== "";
  return (
    <div className={styles.containerdiv}>
      <FormControl
        fullWidth
        sx={{
          marginTop: "1px",
          position: "relative",
          left: "9px",
          "@media (max-width:600px)": { left: "-5px" },
        }}
        size="small"
        required
      >
        <InputLabel
          htmlFor={"input-id"}
          id="label"
          sx={{
            fontSize: "20px",
          }}
        >
          Select a Component
        </InputLabel>
        <Select
          labelId="label"
          label="Select a Component"
          inputProps={{ id: "input-id" }}
          name="component"
          value={properties.component}
          onChange={handleComponentChange}
          MenuProps={MenuProps}
          sx={{
            "@media (max-width:600px)": { width: "319px" },
            background: "white",
            width: "565px ",
            height: "40px",
            fontSize: "20px",
          }}
        >
          <MenuItem value="backgroundImage" sx={{ fontSize: "20px" }}>
            Background Image
          </MenuItem>
          <MenuItem value="button" sx={{ fontSize: "20px" }}>
            Button
          </MenuItem>
          <MenuItem value="Table" sx={{ fontSize: "20px" }}>
            Table
          </MenuItem>
          <MenuItem value="checkbox" sx={{ fontSize: "20px" }}>
            checkBox
          </MenuItem>
          <MenuItem value="Messagebox" sx={{ fontSize: "20px" }}>
            Messagebox
          </MenuItem>
          <MenuItem value="PopupWindow" sx={{ fontSize: "20px" }}>
            PopupWindow
          </MenuItem>
          <MenuItem value="Slider" sx={{ fontSize: "20px" }}>
            Slider
          </MenuItem>
          <MenuItem value="Switch" sx={{ fontSize: "20px" }}>
            Switch
          </MenuItem>
          <MenuItem value="TextInput" sx={{ fontSize: "20px" }}>
            TextInput
          </MenuItem>
          <MenuItem value="TextDisplay" sx={{ fontSize: "20px" }}>
            TextDisplay
          </MenuItem>
        </Select>
      </FormControl>
      <Grid
        container
        spacing={0}
        size={{ xs: 13, sm: 12, md: 12, lg: 12, xl: 12 }}
        sx={{
          height: "500px",
          "@media (max-width:600px)": {
            // marginLeft: 0,
            marginBottom: 2,
          },
          // border: "1px solid red",
          overflowY: "auto",
          overflowX: "hidden",
          display: "flex",
          // flexWrap: "wrap",
          rowGap: 2,
          columnGap: 2,
          marginBottom: 2,
          justifyContent: "start",
          marginTop: 2,
          padding: 1,
        }}
      >
        <TextField
          id="widgetdiscription"
          label="Widget Description"
          type="text"
          size="small"
          required
          name="WidgetDescription"
          value={properties.WidgetDescription}
          onChange={handleChange}
          sx={{
            width: "565px",
            background: "white",
            // Adjust height as needed
          }}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
            input: {
              style: {
                fontSize: "20px",
                height: "40px",
                // marginTop: "10px",
                padding: "15px 0px 5px 0px",
              },
            },
            // Set input font size
          }}
        />
        {errors.WidgetDescription && (
          <p
            style={{
              color: "red",
              fontSize: "4px",
              margin: "0px",
            }}
          >
            {errors.WidgetDescription}
          </p>
        )}
        <FormControl sx={{}} size="small">
          <InputLabel
            htmlFor={"visiblityform"}
            id="demo-simple-select-label"
            sx={{ fontSize: "22px" }}
          >
            visibility
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            inputProps={{ id: "visiblityform" }}
            value={properties.Visibility}
            name="Visibility"
            onChange={handleChange}
            // value={age}
            label="visibility"
            // onChange={handleChange}
            sx={{
              background: "white",
              width: "565px",
              fontSize: "20px",
              height: "40px",
              "@media (max-width:600px)": { width: "320px" },
              padding: "5px 5px 5px 3px",
            }}
          >
            <MenuItem value="true" sx={{ fontSize: "20px" }}>
              true
            </MenuItem>
            <MenuItem value="false" sx={{ fontSize: "20px" }}>
              false
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl
          sx={{
            position: "relative",
            maxWidth: "250px",
          }}
          size="small"
        >
          <InputLabel
            id="component-select-label"
            htmlFor={"valuetype"}
            sx={{
              fontSize: "20px",
            }}
          >
            Value Type
          </InputLabel>
          <Select
            labelId="component-select-label"
            inputProps={{ id: "valuetype" }}
            name="ValueType"
            value={properties.ValueType}
            onChange={handleChange}
            label="Value Type"
            sx={{
              background: "white",
              // border: "1px solid blue",
              padding: "5px 5px 5px 3px",
              "@media (max-width:600px)": { width: "320px" },
              width: "565px",
              height: "40px",
              fontSize: "20px",
            }}
          >
            <MenuItem value="static" sx={{ fontSize: "20px" }}>
              static
            </MenuItem>
            <MenuItem value="dynamic" sx={{ fontSize: "20px" }}>
              dynamic
            </MenuItem>
          </Select>
        </FormControl>
        {/* conditionally render textfield based on seleted component*/}
        {(componentProperty.Height.includes(properties.component) ||
          properties.component === "") && (
          <TextField
            id="height"
            label="Height"
            type="number"
            name="Height"
            size="small"
            value={properties.Height}
            onChange={handleChange}
            sx={{
              background: "white",
              width: "565px",
              // Adjust height as needed
            }}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
              input: {
                style: {
                  fontSize: "20px",
                  height: "40px",
                  // marginTop: "10px",
                  padding: "15px 0px 5px 0px",
                },
              },
            }}
          />
        )}
        {(componentProperty.Width.includes(properties.component) ||
          properties.component === "") && (
          <TextField
            id="width"
            label="Width"
            type="number"
            size="small"
            name="Width"
            value={properties.Width}
            onChange={handleChange}
            sx={{
              width: "565px",
              background: "white",
              // Adjust height as needed
            }}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
              input: {
                style: {
                  fontSize: "20px",
                  height: "40px",
                  // marginTop: "10px",
                  padding: "15px 0px 5px 0px",
                },
              },
              // Set input font size
            }}
          />
        )}
        {(componentProperty.Xpos.includes(properties.component) ||
          properties.component === "") && (
          <TextField
            id="xpos"
            label="X Position "
            type="number"
            size="small"
            name="Xpos"
            value={properties.Xpos}
            onChange={handleChange}
            sx={{
              width: "565px",
              background: "white",
              // Adjust height as needed
            }}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
              input: {
                style: {
                  fontSize: "20px",
                  height: "40px",
                  // marginTop: "10px",
                  padding: "15px 0px 5px 0px",
                },
              },
            }}
          />
        )}
        {(componentProperty.Ypos.includes(properties.component) ||
          properties.component === "") && (
          <TextField
            id="ypos"
            label="Y Position"
            name="Ypos"
            type="number"
            size="small"
            value={properties.Ypos}
            onChange={handleChange}
            sx={{
              width: "565px",
              background: "white",
              // Adjust height as needed
            }}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
              input: {
                style: {
                  fontSize: "20px",
                  height: "40px",
                  // marginTop: "10px",
                  padding: "15px 0px 5px 0px",
                },
              },
            }}
          />
        )}
        {(componentProperty.MarginRight.includes(properties.component) ||
          properties.component === "") && (
          <TextField
            id="MR"
            label="Margin Right"
            type="number"
            size="small"
            name="MarginRight"
            value={properties.MarginRight}
            onChange={handleChange}
            sx={{
              background: "white",
              width: "565px",
              // Adjust height as needed
            }}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
              input: {
                style: {
                  fontSize: "20px",
                  height: "40px",
                  // marginTop: "10px",
                  padding: "15px 0px 5px 0px",
                },
              },
            }}
          />
        )}
        {(componentProperty.MarginLeft.includes(properties.component) ||
          properties.component === "") && (
          <TextField
            id="ML"
            label="Margin Left"
            value={properties.MarginLeft}
            name="MarginLeft"
            onChange={handleChange}
            type="number"
            size="small"
            sx={{
              background: "white",
              width: "565px",
              // Adjust height as needed
            }}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
              input: {
                style: {
                  fontSize: "20px",
                  height: "40px",
                  // marginTop: "10px",
                  padding: "15px 0px 5px 0px",
                },
              },
            }}
          />
        )}
        {(componentProperty.MarginTop.includes(properties.component) ||
          properties.component === "") && (
          <TextField
            id="MT"
            label="Margin Top"
            name="MarginTop"
            value={properties.MarginTop}
            onChange={handleChange}
            type="number"
            size="small"
            sx={{
              background: "white",
              width: "565px",
              // Adjust height as needed
            }}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
              input: {
                style: {
                  fontSize: "20px",
                  height: "40px",
                  // marginTop: "10px",
                  padding: "15px 0px 5px 0px",
                },
              },
            }}
          />
        )}
        {(componentProperty.MarginBottom.includes(properties.component) ||
          properties.component === "") && (
          <TextField
            id="MB"
            label="Margin Bottom"
            value={properties.MarginBottom}
            onChange={handleChange}
            name="MarginBottom"
            type="number"
            size="small"
            sx={{
              background: "white",
              width: "565px",
              // Adjust height as needed
            }}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
              input: {
                style: {
                  fontSize: "20px",
                  height: "40px",
                  // marginTop: "10px",
                  padding: "15px 0px 5px 0px",
                },
              },
            }}
          />
        )}
        {(componentProperty.PaddingRight.includes(properties.component) ||
          properties.component === "") && (
          <TextField
            id="PR"
            label="Padding Right"
            name="PaddingRight"
            value={properties.PaddingRight}
            onChange={handleChange}
            type="number"
            size="small"
            sx={{
              background: "white",
              width: "565px",
              // Adjust height as needed
            }}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
              input: {
                style: {
                  fontSize: "20px",
                  height: "40px",
                  // marginTop: "10px",
                  padding: "15px 0px 5px 0px",
                },
              },
            }}
          />
        )}
        {(componentProperty.PaddingLeft.includes(properties.component) ||
          properties.component === "") && (
          <TextField
            id="PL"
            label="Padding Left"
            name="PaddingLeft"
            value={properties.PaddingLeft}
            onChange={handleChange}
            type="number"
            size="small"
            sx={{
              background: "white",
              width: "565px",
              // Adjust height as needed
            }}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
              input: {
                style: {
                  fontSize: "20px",
                  height: "40px",
                  // marginTop: "10px",
                  padding: "15px 0px 5px 0px",
                },
              },
            }}
          />
        )}
        {(componentProperty.PaddingTop.includes(properties.component) ||
          properties.component === "") && (
          <TextField
            id="PT"
            label="Padding Top"
            name="PaddingTop"
            value={properties.PaddingTop}
            onChange={handleChange}
            type="number"
            size="small"
            sx={{
              background: "white",
              width: "565px",
              // Adjust height as needed
            }}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
              input: {
                style: {
                  fontSize: "20px",
                  height: "40px",
                  // marginTop: "10px",
                  padding: "15px 0px 5px 0px",
                },
              },
            }}
          />
        )}
        {(componentProperty.PaddingBottom.includes(properties.component) ||
          properties.component === "") && (
          <TextField
            id="PB"
            label="Padding Bottom"
            name="PaddingBottom"
            value={properties.PaddingBottom}
            onChange={handleChange}
            type="number"
            size="small"
            sx={{
              background: "white",
              width: "565px",
              // Adjust height as needed
            }}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
              input: {
                style: {
                  fontSize: "20px",
                  height: "40px",
                  // marginTop: "10px",
                  padding: "15px 0px 5px 0px",
                },
              },
            }}
          />
        )}
        {(componentProperty.BackgroundColor.includes(properties.component) ||
          properties.component === "") && (
          <TextField
            id="color-picker"
            label="Background Color"
            type="color"
            name="BackgroundColor"
            value={properties.BackgroundColor}
            onChange={handleChange}
            size="small"
            sx={{
              width: "565px",
              background: "white",
              // Adjust height as needed
            }}
            slotProps={{
              input: {
                style: {
                  fontSize: "15px",
                  height: "40px",
                  padding: "15px 0px 5px 0px",
                },
              },
            }}
          />
        )}
        {(componentProperty.TransparencyPercentage.includes(
          properties.component
        ) ||
          properties.component === "") && (
          <TextField
            id="Transparency"
            label="Transparency %"
            type="number"
            size="small"
            name="TransparencyPercentage"
            value={properties.TransparencyPercentage}
            onChange={handleChange}
            sx={{
              width: "565px",
              background: "white",
            }}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
              input: {
                style: {
                  fontSize: "20px",
                  height: "40px",
                  padding: "15px 0px 5px 0px",
                },
              },
            }}
          />
        )}
        {(componentProperty.LabelColor.includes(properties.component) ||
          properties.component === "") && (
          <TextField
            id="color-picker"
            label="LabelColor"
            type="color"
            name="LabelColor"
            value={properties.LabelColor}
            onChange={handleChange}
            size="small"
            sx={{
              width: "565px",
              background: "white",
            }}
            slotProps={{
              input: {
                style: {
                  fontSize: "15px",
                  height: "40px",
                  padding: "15px 0px 5px 0px",
                },
              },
            }}
          />
        )}
        {(componentProperty.FontWeight.includes(properties.component) ||
          properties.component === "") && (
          <FormControl sx={{ margin: 0 }} size="small">
            <InputLabel
              id="demo-simple-select-label"
              htmlFor={"fontweight"}
              sx={{
                fontSize: "22px",
              }}
            >
              FontWeight
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              // id="demo-simple-select"
              inputProps={{ id: "fontweight" }}
              name="FontWeight"
              value={properties.FontWeight}
              onChange={handleChange}
              label="FontWeight"
              // onChange={handleChange}
              sx={{
                "@media (max-width:600px)": { width: "320px" },
                width: "565px",
                fontSize: "20px",
                height: "42px",
                padding: "5px 5px 5px 3px",
                background: "white",
              }}
            >
              <MenuItem value="bold" sx={{ fontSize: "20px" }}>
                bold
              </MenuItem>
              <MenuItem value="bolder" sx={{ fontSize: "20px" }}>
                bolder
              </MenuItem>
              <MenuItem value="lighter" sx={{ fontSize: "20px" }}>
                lighter
              </MenuItem>
              <MenuItem value="normal" sx={{ fontSize: "20px" }}>
                normal
              </MenuItem>
            </Select>
          </FormControl>
        )}
        {(componentProperty.FontSize.includes(properties.component) ||
          properties.component === "") && (
          <TextField
            id="fontsize"
            label="FontSize"
            name="FontSize"
            value={properties.FontSize}
            onChange={handleChange}
            type="number"
            size="small"
            sx={{
              width: "565px",
              background: "white",
            }}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
              input: {
                style: {
                  fontSize: "20px",
                  height: "40px",
                  padding: "15px 0px 5px 0px",
                },
              },
            }}
          />
        )}
        {(componentProperty.Border.includes(properties.component) ||
          properties.component === "") && (
          <TextField
            id="border"
            label="Border"
            name="Border"
            value={properties.Border}
            onChange={handleChange}
            type="number"
            size="small"
            sx={{
              width: "565px",
              background: "white",
              // Adjust height as needed
            }}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
              input: {
                style: {
                  fontSize: "20px",
                  height: "40px",
                  // marginTop: "10px",
                  padding: "15px 0px 5px 0px",
                },
              },
            }}
          />
        )}
        {(componentProperty.OverflowWrap.includes(properties.component) ||
          properties.component === "") && (
          <FormControl sx={{}} size="small">
            <InputLabel
              id="demo-simple-select-label"
              htmlFor={"overflowwrap"}
              sx={{ fontSize: "22px" }}
            >
              OverflowWrap
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              inputProps={{ id: "overflowwrap" }}
              name="OverflowWrap"
              value={properties.OverflowWrap}
              onChange={handleChange}
              label="OverflowWrap"
              sx={{
                "@media (max-width:600px)": { width: "320px" },
                width: "565px",
                fontSize: "20px",
                height: "42px",
                padding: "5px 5px 5px 3px",
                background: "white",
              }}
            >
              <MenuItem value="break-word" sx={{ fontSize: "20px" }}>
                break-word
              </MenuItem>
              <MenuItem value="normal" sx={{ fontSize: "20px" }}>
                normal
              </MenuItem>
              <MenuItem value="anywhere" sx={{ fontSize: "20px" }}>
                anywhere
              </MenuItem>
            </Select>
          </FormControl>
        )}
        {(componentProperty.BlockSize.includes(properties.component) ||
          properties.component === "") && (
          <TextField
            id="Blocksize"
            label="BlockSize"
            name="BlockSize"
            value={properties.BlockSize}
            onChange={handleChange}
            type="number"
            size="small"
            sx={{
              width: "565px",
              // Adjust height as needed
            }}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
              input: {
                style: {
                  fontSize: "20px",
                  height: "40px",
                  // marginTop: "10px",
                  padding: "15px 0px 5px 0px",
                  background: "white",
                },
              },
            }}
          />
        )}
        {(componentProperty.Redirection.includes(properties.component) ||
          properties.component === "") && (
          <FormControl sx={{}} size="small">
            <InputLabel
              id="demo-simple-select-label"
              htmlFor={"redirections"}
              sx={{ fontSize: "22px" }}
            >
              Redirection
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              inputProps={{ id: "redirections" }}
              value={properties.Redirection}
              onChange={handleChange}
              label="Redirection"
              name="Redirection"
              sx={{
                background: "white",
                "@media (max-width:600px)": { width: "320px" },
                width: "565px",
                fontSize: "20px",
                height: "42px",
                padding: "5px 5px 5px 3px",
              }}
            >
              <MenuItem value="true" sx={{ fontSize: "20px" }}>
                true
              </MenuItem>
              <MenuItem value="false" sx={{ fontSize: "20px" }}>
                false
              </MenuItem>
            </Select>
          </FormControl>
        )}
        {(componentProperty.RedirectionLink.includes(properties.component) ||
          properties.component === "") && (
          <TextField
            id="RedirectionLink"
            label="RedirectionLink"
            name="RedirectionLink"
            value={properties.RedirectionLink}
            onChange={handleChange}
            type="text"
            size="small"
            sx={{
              width: "565px",
              background: "white",
            }}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
              input: {
                style: {
                  fontSize: "20px",
                  height: "40px",
                  padding: "15px 0px 5px 0px",
                },
              },
            }}
          />
        )}
        {(componentProperty.TextAlign.includes(properties.component) ||
          properties.component === "") && (
          <FormControl sx={{}} size="small">
            <InputLabel
              htmlFor={"textalign"}
              id="demo-simple-select-label"
              sx={{ fontSize: "22px" }}
            >
              TextAlign
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              inputProps={{ id: "textalign" }}
              value={properties.TextAlign}
              name="TextAlign"
              label="TextAlign"
              onChange={handleChange}
              // onChange={handleChange}
              sx={{
                "@media (max-width:600px)": { width: "320px" },
                width: "565px",
                fontSize: "20px",
                height: "42px",
                padding: "5px 5px 5px 3px",
                background: "white",
              }}
            >
              <MenuItem value="Start" sx={{ fontSize: "20px" }}>
                start
              </MenuItem>
              <MenuItem value="Center" sx={{ fontSize: "20px" }}>
                center
              </MenuItem>
              <MenuItem value="End" sx={{ fontSize: "20px" }}>
                end
              </MenuItem>
            </Select>
          </FormControl>
        )}
        {(componentProperty.Layer.includes(properties.component) ||
          properties.component === "") && (
          <TextField
            id="Layer"
            label="Layer"
            name="Layer"
            value={properties.Layer}
            onChange={handleChange}
            type="number"
            size="small"
            sx={{
              width: "565px",
              background: "white",
              // Adjust height as needed
            }}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
              input: {
                style: {
                  fontSize: "20px",
                  height: "40px",
                  // marginTop: "10px",
                  padding: "15px 0px 5px 0px",
                },
              },
            }}
          />
        )}
        {(componentProperty.Tooltip.includes(properties.component) ||
          properties.component === "") && (
          <FormControlLabel
            sx={{
              border: "1px solid #C4C4C4",
              width: "565px",
              margin: 0,
              height: "40px",
              background: "white",
              "& .MuiTypography-root": {
                fontSize: "20px",
                fontWeight: "400",
                color: "#828282",
              },
            }}
            control={
              <Checkbox
                id="checkbox"
                sx={{
                  "& .css-18w7uxr-MuiSvgIcon-root": {
                    fontSize: "25px",
                    background: "white",
                  },
                }}
                size="small"
                checked={properties.Tooltip}
                onChange={handleCheckboxChange}
              />
            }
            label="Tooltip"
          />
        )}
        {properties.Tooltip &&
          (componentProperty.TooltipText.includes(properties.component) ||
            properties.component === "") && (
            <TextField
              id="outlined-text"
              label="TooltipText"
              name="TooltipText"
              value={properties.TooltipText}
              onChange={handleChange}
              type="text"
              size="small"
              sx={{
                width: "565px",
                background: "white",
              }}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
                input: {
                  style: {
                    fontSize: "20px",
                    height: "40px",
                    padding: "15px 0px 5px 0px",
                  },
                },
              }}
            />
          )}
        {(componentProperty.ImportedImage.includes(properties.component) ||
          properties.component === "") && (
          <Stack
            sx={{
              // border: "5px solid #C4C4C4",
              width: "567px",
              height: "460px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
              background: "white",
            }}
          >
            <Stack
              sx={{
                // border: "1px solid blue",
                height: "70px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                sx={{
                  marginTop: "10px",
                  width: "365px",
                  // "@media (max-width:600px)": { width: "205px" },
                  height: "42px",
                  padding: "5px 5px 5px 15px",
                  textTransform: "none",
                  background: "none",
                  border: "0px solid rgb(196 196 196)",
                  color: "rgba(0, 0, 0, 0.6)",
                  boxShadow: "none",
                  fontWeight: "400",
                  "@media (max-width:600px)": { width: "315px" },
                }}
                onMouseEnter={handleMouseEnter}
                onMouseDown={handleMouseLeave}
              >
                Upload Image
                <VisuallyHiddenInput
                  type="file"
                  accept="image/*"
                  name="Image"
                  // onChange={(event) => console.log(event.target.files)}
                  onChange={handleFileChange}
                />
              </Button>
              {ishovered && (
                <span
                  style={{
                    color: "red",
                    marginTop: "0px",
                    padding: "0",
                    fontWeight: "300",
                    fontSize: "15px",
                  }}
                >
                  Upload file of size less than 2MB
                </span>
              )}
            </Stack>
            {properties.ImportedImage.length > 0 && (
              <Stack>
                {properties.ImportedImage.map((file, index) => (
                  <Stack
                    key={index}
                    sx={{
                      //
                      border: "1px solid #C4C4C4",
                      left: "290px",
                      "@media (max-width:600px)": { width: "315px" },
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-evenly",
                      width: "565px",
                      height: "400px",
                    }}
                  >
                    <img
                      key={index}
                      src={URL.createObjectURL(file)}
                      alt={`Preview ${index + 1}`}
                      className="previewImage"
                      style={{
                        // width: "560px",
                        // height: "370px",
                        width: "98%",
                        height: "350px",
                        // border: "1px solid black",
                      }}
                    />
                    <span
                      key={index + 1}
                      style={{
                        fontWeight: "300",
                        paddingBottom: "5px",
                        paddingTop: "2px",
                        fontSize: "20px",
                      }}
                    >
                      {file.name}
                    </span>
                  </Stack>
                ))}
              </Stack>
            )}
          </Stack>
        )}
      </Grid>
      <div className={styles.savebtn}>
        <Button
          variant="outlined"
          sx={{
            left: 250,
            textTransform: "none",
            background: "white",
            position: "absolute",
          }}
          size="small"
          onClick={handleSubmit}
          disabled={!isComponentSelected}
        >
          Save
        </Button>
      </div>
    </div>
  );
}
