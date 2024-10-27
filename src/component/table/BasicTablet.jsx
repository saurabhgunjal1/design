import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tooltip,
} from "@mui/material";
import { useState } from "react";
import styles from "../table/tablet.module.css";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Checkbox from "@mui/material/Checkbox";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Grid from "@mui/material/Grid2";
import { styled } from "@mui/material/styles";
import axios from "axios";

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

//style for matrial ui  select tag for scrolbar in select tag
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

export default function BasicTable({ allPropertiesData }) {
  // console.log(allPropertiesData);
  // State hooks for managing various pieces of data
  // Stores the data fetched from the server
  const [data, setData] = useState([]);
  // Manages edit mode state
  const [editing, setEditing] = useState(false);
  // Stores the row currently being edited
  const [selectedRow, setSelectedRow] = useState(null);
  // Configuration for various component properties
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

  // Stores validation or other errors
  const [errors, setErrors] = useState({});
  // Tracks hover state for UI effects
  const [ishovered, setIsHovered] = useState(false);
  // Stores uploaded images
  const [uploadedImage, setuploadedImage] = useState([]);

  // hook for setting data in data state
  React.useEffect(() => {
    if (Array.isArray(allPropertiesData)) {
      setData(allPropertiesData);
    }
  }, [allPropertiesData]);
  // console.log(data);

  //it is onchange handler for tooltip checkbox
  // it updates the value of tooltip is it true or false
  const handleCheckboxChange = (e) => {
    // Get the new checkbox value
    const newCheckedValue = e.target.checked;
    console.log("new checked : ", newCheckedValue);
    console.log("before tooltip selected row : ", selectedRow);

    setSelectedRow((prevData) => ({
      ...prevData,
      Tooltip: newCheckedValue,
    }));

    console.log("aftere tooltip : ", data);
    console.log("after tooltip selected row : ", selectedRow);
  };

  // File change handler for image uploads
  const handleFileChange = (event) => {
    event.preventDefault();
    const files = Array.from(event.target.files);
    const validFiles = [];

    files.forEach((file) => {
      if (file.size > 2 * 1024 * 1024) {
        alert("File size greater than 2 MB. Please upload a smaller file.");
      } else {
        const fileData = [
          {
            name: file.name,
            type: file.type,
            size: file.size,
            lastModified: file.lastModified,
            // Create a URL that can be used locally
            url: URL.createObjectURL(file),
          },
        ];

        setSelectedRow((prevData) => ({
          ...prevData,
          ImportedImage: fileData,
        }));

        console.log("after file change", data);
      }
    });

    // setuploadedImage(validFiles); // Update state with valid files
  };

  // Handlers for mouse hover effects
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Function to handle editing a row
  const handleEdit = (id) => {
    const rowtoedit = data.find((row) => row.id === id); // Find the row to edit
    console.log("selected row : ", rowtoedit);
    setSelectedRow(rowtoedit); // Set the selected row state
    setEditing(true); // Enable editing mode
  };

  // Input change handler for editing row data
  const handleInputChange = (e) => {
    // Destructure name and value from event target
    const { name, value } = e.target;
    setSelectedRow((prevstate) => ({
      ...prevstate,
      // Update the selected row with the new value
      [name]: value,
    }));
  };

  // Save handler for updating data on the server
  const handleSave = async (e) => {
    console.log("main type of data : ", typeof data);
    console.log(" main data : ", data);
    e.preventDefault();
    try {
      console.log("Selected Row1:", selectedRow);
      // Update local state with the modified row
      setData((prevData) =>
        prevData.map((item) =>
          item.id === selectedRow.id ? selectedRow : item
        )
      );

      console.log("aftere stting data tyep : ", typeof data);
      console.log("after setting : ", data);
      // setData((prevData) => console.log("prevdata : ", prevData[0]));
      console.log("Data sent successfully2:", data);

      // Send updated data to server
      await axios.put(
        `http://localhost:8000/data/${selectedRow.id}`,
        selectedRow
      );
      console.log("Data sent successfully3:", data);

      setEditing(false); // Disable editing mode
      setSelectedRow(null); // Clear selected row
      setErrors({}); // Clear any errors
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  // Delete handler for removing a row
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete  this item")) return;

    try {
      // Send delete request to server
      await axios.delete(`http://localhost:8000/data/${id}`);
      setData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  // Cancel handler to exit edit mode
  const handleCancel = () => {
    setEditing(false); // Disable editing mode
    setSelectedRow(null); // Clear selected row
    setErrors({}); // Clear any errors
  };

  // Define the columns for the DataGrid
  const columns = [
    {
      field: "component",
      headerName: "Component Name",
      width: 250, // Reduced width
      headerAlign: "center",
      align: "center",
      headerClassName: "header-cell",
    },
    {
      field: "WidgetDescription",
      headerName: "Widget Description",
      width: 250, // Reduced width
      headerAlign: "center",
      align: "center",
      headerClassName: "header-cell",
    },
    {
      field: "Visibility",
      headerName: "Visibility",
      width: 160, // Reduced width
      headerAlign: "center",
      align: "center",
      headerClassName: "header-cell",
    },
    {
      field: "ValueType",
      headerName: "Value Type",
      width: 160, // Reduced width
      headerAlign: "center",
      align: "center",
      headerClassName: "header-cell",
    },
    {
      field: "Height",
      headerName: "Height",
      width: 160, // Reduced width
      headerAlign: "center",
      align: "center",
      headerClassName: "header-cell",
    },
    {
      field: "Width",
      headerName: "Width",
      width: 160, // Reduced width
      headerAlign: "center",
      align: "center",
      headerClassName: "header-cell",
    },

    {
      field: "edit",
      headerName: "Actions",
      headerAlign: "center",
      align: "center",
      justifyContent: "center",
      width: 200, // Reduced width
      "& .MuiDataGrid-cell MuiDataGrid-cell--textCenter": {
        border: "1px solid red",
      },
      renderCell: (params) => (
        <div
          className={styles.editdeletdiv}
          style={{ display: "flex", justifyContent: "space-around" }}
        >
          <EditIcon
            onClick={() => handleEdit(params.row.id)}
            sx={{ height: "20px", width: "20px", cursor: "pointer" }}
          />

          <DeleteIcon
            onClick={() => handleDelete(params.row.id)}
            sx={{ height: "20px", width: "20px", cursor: "pointer" }}
          />
        </div>
      ),
    },
  ];

  const paginationModel = { page: 0, pageSize: 10 };
  // const isComponentSelected = propertiesData.component !== "";
  return (
    <Paper
      sx={{
        marginTop: "60px",
        height: 700,
        width: "77%",
        border: "1px solid #f3f3f3",
      }}
    >
      <DataGrid
        rows={data} // Rows for the data grid
        columns={columns} // Columns for the data grid
        initialState={{ pagination: { paginationModel } }} // Initial pagination state
        pageSizeOptions={[5, 10]} // Options for page size
        rowHeight={40} // Reduced row height
        // getRowId={(row) => row.WidgetDescription || Math.random().toString()}
        getRowId={(row) => row.id}
        sx={{
          border: 0,
          fontSize: "15px",
          padding: 0,
          "& .MuiDataGrid-columnHeaders": {
            background: "#e4f0f0", // Custom background color
            color: "black", // Text color for headers
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: "bold",
          },
        }} // Reduced font size
      />

      <Dialog open={editing} onClose={handleCancel}>
        <DialogTitle sx={{ paddingTop: 1, paddingBottom: 0 }}>Edit</DialogTitle>
        <DialogContent sx={{ padding: 0 }}>
          {selectedRow && (
            <div className={styles.containerdiv}>
              <TextField
                id="xpos"
                label="Component"
                type="Text"
                size="small"
                name="component"
                value={selectedRow.component || ""}
                onChange={handleInputChange}
                sx={{
                  width: "563px",
                  background: "white",
                  position: "relative",
                  right: 8,
                  // Adjust height as needed
                }}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                  input: {
                    readOnly: true,
                    style: {
                      fontSize: "20px",
                      height: "40px",
                      // marginTop: "10px",
                      padding: "15px 0px 5px 0px",
                    },
                  },
                }}
              />

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
                  value={selectedRow.WidgetDescription}
                  onChange={handleInputChange}
                  helperText="Cannot modify widgetdiscription. Unique field"
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
                      readOnly: true,
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
                    value={selectedRow.Visibility}
                    name="Visibility"
                    onChange={handleInputChange}
                    // value={age}
                    label="visibility"
                    // onChange={handleInputChange}
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
                    value={selectedRow.ValueType}
                    onChange={handleInputChange}
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
                {(componentProperty.Height.includes(selectedRow.component) ||
                  selectedRow.component === "") && (
                  <TextField
                    id="height"
                    label="Height"
                    type="number"
                    name="Height"
                    size="small"
                    value={selectedRow.Height || ""}
                    onChange={handleInputChange}
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
                {(componentProperty.Width.includes(selectedRow.component) ||
                  selectedRow.component === "") && (
                  <TextField
                    id="width"
                    label="Width"
                    type="number"
                    size="small"
                    name="Width"
                    value={selectedRow.Width}
                    onChange={handleInputChange}
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
                {(componentProperty.Xpos.includes(selectedRow.component) ||
                  selectedRow.component === "") && (
                  <TextField
                    id="xpos"
                    label="X Position "
                    type="number"
                    size="small"
                    name="Xpos"
                    value={selectedRow.Xpos}
                    onChange={handleInputChange}
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
                {(componentProperty.Ypos.includes(selectedRow.component) ||
                  selectedRow.component === "") && (
                  <TextField
                    id="ypos"
                    label="Y Position"
                    name="Ypos"
                    type="number"
                    size="small"
                    value={selectedRow.Ypos}
                    onChange={handleInputChange}
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
                {(componentProperty.MarginRight.includes(
                  selectedRow.component
                ) ||
                  selectedRow.component === "") && (
                  <TextField
                    id="MR"
                    label="Margin Right"
                    type="number"
                    size="small"
                    name="MarginRight"
                    value={selectedRow.MarginRight}
                    onChange={handleInputChange}
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
                {(componentProperty.MarginLeft.includes(
                  selectedRow.component
                ) ||
                  selectedRow.component === "") && (
                  <TextField
                    id="ML"
                    label="Margin Left"
                    value={selectedRow.MarginLeft}
                    name="MarginLeft"
                    onChange={handleInputChange}
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
                {(componentProperty.MarginTop.includes(selectedRow.component) ||
                  selectedRow.component === "") && (
                  <TextField
                    id="MT"
                    label="Margin Top"
                    name="MarginTop"
                    value={selectedRow.MarginTop}
                    onChange={handleInputChange}
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
                {(componentProperty.MarginBottom.includes(
                  selectedRow.component
                ) ||
                  selectedRow.component === "") && (
                  <TextField
                    id="MB"
                    label="Margin Bottom"
                    value={selectedRow.MarginBottom}
                    onChange={handleInputChange}
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
                {(componentProperty.PaddingRight.includes(
                  selectedRow.component
                ) ||
                  selectedRow.component === "") && (
                  <TextField
                    id="PR"
                    label="Padding Right"
                    name="PaddingRight"
                    value={selectedRow.PaddingRight}
                    onChange={handleInputChange}
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
                {(componentProperty.PaddingLeft.includes(
                  selectedRow.component
                ) ||
                  selectedRow.component === "") && (
                  <TextField
                    id="PL"
                    label="Padding Left"
                    name="PaddingLeft"
                    value={selectedRow.PaddingLeft}
                    onChange={handleInputChange}
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
                {(componentProperty.PaddingTop.includes(
                  selectedRow.component
                ) ||
                  selectedRow.component === "") && (
                  <TextField
                    id="PT"
                    label="Padding Top"
                    name="PaddingTop"
                    value={selectedRow.PaddingTop}
                    onChange={handleInputChange}
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
                {(componentProperty.PaddingBottom.includes(
                  selectedRow.component
                ) ||
                  selectedRow.component === "") && (
                  <TextField
                    id="PB"
                    label="Padding Bottom"
                    name="PaddingBottom"
                    value={selectedRow.PaddingBottom}
                    onChange={handleInputChange}
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
                {(componentProperty.BackgroundColor.includes(
                  selectedRow.component
                ) ||
                  selectedRow.component === "") && (
                  <TextField
                    id="color-picker"
                    label="Background Color"
                    type="color"
                    name="BackgroundColor"
                    value={selectedRow.BackgroundColor}
                    onChange={handleInputChange}
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
                  selectedRow.component
                ) ||
                  selectedRow.component === "") && (
                  <TextField
                    id="Transparency"
                    label="Transparency %"
                    type="number"
                    size="small"
                    name="TransparencyPercentage"
                    value={selectedRow.TransparencyPercentage}
                    onChange={handleInputChange}
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
                {(componentProperty.LabelColor.includes(
                  selectedRow.component
                ) ||
                  selectedRow.component === "") && (
                  <TextField
                    id="color-picker"
                    label="LabelColor"
                    type="color"
                    name="LabelColor"
                    value={selectedRow.LabelColor}
                    onChange={handleInputChange}
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
                {(componentProperty.FontWeight.includes(
                  selectedRow.component
                ) ||
                  selectedRow.component === "") && (
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
                      value={selectedRow.FontWeight}
                      onChange={handleInputChange}
                      label="FontWeight"
                      // onChange={handleInputChange}
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
                {(componentProperty.FontSize.includes(selectedRow.component) ||
                  selectedRow.component === "") && (
                  <TextField
                    id="fontsize"
                    label="FontSize"
                    name="FontSize"
                    value={selectedRow.FontSize}
                    onChange={handleInputChange}
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
                {(componentProperty.Border.includes(selectedRow.component) ||
                  selectedRow.component === "") && (
                  <TextField
                    id="border"
                    label="Border"
                    name="Border"
                    value={selectedRow.Border}
                    onChange={handleInputChange}
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
                {(componentProperty.OverflowWrap.includes(
                  selectedRow.component
                ) ||
                  selectedRow.component === "") && (
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
                      value={selectedRow.OverflowWrap}
                      onChange={handleInputChange}
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
                {(componentProperty.BlockSize.includes(selectedRow.component) ||
                  selectedRow.component === "") && (
                  <TextField
                    id="Blocksize"
                    label="BlockSize"
                    name="BlockSize"
                    value={selectedRow.BlockSize}
                    onChange={handleInputChange}
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
                {(componentProperty.Redirection.includes(
                  selectedRow.component
                ) ||
                  selectedRow.component === "") && (
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
                      value={selectedRow.Redirection}
                      onChange={handleInputChange}
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
                {(componentProperty.RedirectionLink.includes(
                  selectedRow.component
                ) ||
                  selectedRow.component === "") && (
                  <TextField
                    id="RedirectionLink"
                    label="RedirectionLink"
                    name="RedirectionLink"
                    value={selectedRow.RedirectionLink}
                    onChange={handleInputChange}
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
                {(componentProperty.TextAlign.includes(selectedRow.component) ||
                  selectedRow.component === "") && (
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
                      value={selectedRow.TextAlign}
                      name="TextAlign"
                      label="TextAlign"
                      onChange={handleInputChange}
                      // onChange={handleInputChange}
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
                {(componentProperty.Layer.includes(selectedRow.component) ||
                  selectedRow.component === "") && (
                  <TextField
                    id="Layer"
                    label="Layer"
                    name="Layer"
                    value={selectedRow.Layer}
                    onChange={handleInputChange}
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
                {(componentProperty.Tooltip.includes(selectedRow.component) ||
                  selectedRow.component === "") && (
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
                        checked={selectedRow.Tooltip}
                        onChange={handleCheckboxChange}
                      />
                    }
                    label="Tooltip"
                  />
                )}
                {selectedRow.Tooltip &&
                  (componentProperty.TooltipText.includes(
                    selectedRow.component
                  ) ||
                    selectedRow.component === "") && (
                    <TextField
                      id="outlined-text"
                      label="TooltipText"
                      name="TooltipText"
                      value={selectedRow.TooltipText}
                      onChange={handleInputChange}
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

                {(componentProperty.ImportedImage.includes(
                  selectedRow.component
                ) ||
                  selectedRow.component === "") && (
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
                    {selectedRow.ImportedImage.length > 0 && (
                      <Stack>
                        {selectedRow.ImportedImage.map((file, index) => (
                          <Stack
                            key={index}
                            sx={{
                              //   border: "1px solid #C4C4C4",
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
                              src={file.url}
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
              {/* <div className={styles.savebtn}>
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
                </div> */}
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCancel()}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
