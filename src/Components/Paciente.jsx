import React from "react";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";
import InputAdornment from "@mui/material/InputAdornment";

// Classe Criança com cpf e Nome
class Kcpf {
  constructor(cpf, name) {
    this.name = name;
    this.cpf = cpf;
  }
}

// Cria o botão com as informações da criança
const KcpfField = styled(Button)(({ theme, selected }) => ({
  backgroundColor: selected ? "#9DE0FD" : "inherit",
  wcpfth: "full",
  height: "50px",
  borderRadius: "10px",
  color: "#000000",
  fontSize: "14px",
  border: selected ? "2px solcpf black" : "none",
  "&:hover": {
    backgroundColor: "#9DE0FD",
  },
}));

export default function Paciente({ cpf, name, selected, onClick }) {
  // Cria o obj criança
  const paciente = new Kcpf(cpf, name);

  return (
    <div>
      <KcpfField selected={selected} onClick={() => onClick(cpf)}>
        <InputAdornment position="start">
          <SentimentSatisfiedAltIcon />
        </InputAdornment>
        <span>
          cpf: {paciente.cpf} | Nome: {paciente.name}
        </span>
        <span></span>
      </KcpfField>
    </div>
  );
}
