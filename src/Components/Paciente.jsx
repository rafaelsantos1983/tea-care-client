import React from "react";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";
import InputAdornment from "@mui/material/InputAdornment";

// Classe Criança com Id e Nome
class Kid {
  constructor(id, name) {
    this.name = name;
    this.id = id;
  }
}

// Cria o botão com as informações da criança
const KidField = styled(Button)(({ theme, selected }) => ({
  backgroundColor: selected ? "#9DE0FD" : "inherit",
  width: "full",
  height: "50px",
  borderRadius: "10px",
  color: "#000000",
  fontSize: "14px",
  border: selected ? "2px solid black" : "none",
  "&:hover": {
    backgroundColor: "#9DE0FD",
  },
}));

export default function Paciente({ id, name, selected, onClick }) {
  // Cria o obj criança
  const paciente = new Kid(id, name);

  return (
    <div>
      <KidField selected={selected} onClick={() => onClick(id)}>
        <InputAdornment position="start">
          <SentimentSatisfiedAltIcon />
        </InputAdornment>
        <span>
          ID: {paciente.id} | Nome: {paciente.name}
        </span>
        <span></span>
      </KidField>
    </div>
  );
}
