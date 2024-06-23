import Button from "@mui/material/Button";

import PropTypes from "prop-types";

const customButtonStyle = {
  backgroundColor: "#043058", // Cor verde clara
  width: "250px",
  height: "50px", // Altura aumentada para 40px para melhorar a legibilidade
  color: "#FFE01D", // Texto branco
  "&:hover": {
    backgroundColor: "#689f38", // Cor mais escura ao passar o mouse
  },
};

BlueButton.propTypes = {
  text: PropTypes.string,
  tipo: PropTypes.string,
};

function BlueButton({ text, tipo }) {
  return (
    <Button variant="contained" style={customButtonStyle} type={tipo}>
      {text}
    </Button>
  );
}

export default BlueButton;
