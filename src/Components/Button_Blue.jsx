import Button from "@mui/material/Button";
import PropTypes from "prop-types";

const customButtonStyle = {
  backgroundColor: "#034287", 
  width: "200px",
  height: "50px", 
  color: "#ffffff", 
  "&:hover": {
    backgroundColor: "#043058", 
  },
};

BlueButton.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func
};

function BlueButton({text, onClick}) {
  return (
    <Button onClick={onClick} variant="contained" sx={customButtonStyle}>
      {text}
    </Button>
  );
}

export default BlueButton;
