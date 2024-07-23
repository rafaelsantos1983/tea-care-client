import React from "react";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";
import InputAdornment from "@mui/material/InputAdornment";

// Classe para informações do Paciente
class InfosPaciente {
  constructor(cpf, name, birthday, nomeResponsavel) {
    this.cpf = cpf;
    this.name = name;
    this.birthday = birthday;
    this.nomeResponsavel = nomeResponsavel;
  }
}

const InfoPacienteField = styled(Button)(({ theme }) => ({
  alignContent: "center",
  fontWeight: "bold",
  width: "90%",
  height: "100px",
  borderRadius: "20px",
  color: "#000",
  fontSize: "14px",
  border: "none",
  backgroundColor: "#9DE0FD",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    backgroundColor: "#7DC3F2",
    transform: "scale(1.1)",
  },
}));

const Container = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

});

export default function InfoPaciente({ cpf, name, birthday, nomeResponsavel }) {
  const infos = new InfosPaciente(cpf, name, birthday, nomeResponsavel);

  return (
    <Container>
      <InfoPacienteField>
        <InputAdornment position="start">
        </InputAdornment>
        <span>
          CPF: {infos.cpf} | Nome: {infos.name} | 
          Data de Nascimento: {infos.birthday} | 
          Responsável: {infos.nomeResponsavel}
        </span>
      </InfoPacienteField>
    </Container>
  );
}
