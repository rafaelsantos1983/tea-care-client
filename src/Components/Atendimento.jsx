import React from "react";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";
import InputAdornment from "@mui/material/InputAdornment";

// Definição da classe AtendimentoInfos
class AtendimentoInfos {
  constructor(id,data, hora, duration, realizado, profissional) {
    this.id = id;
    this.data = data;
    this.hora = hora;
    this.duration = duration;
    this.realizado = realizado;
    this.profissional = profissional;
  }
}

// Estilização do componente Button
const AtendimentoInfosField = styled(Button)(({ theme, selected }) => ({
  backgroundColor: selected ? "#9DE0FD" : "inherit",
  width: "100%", // Corrigido para width ao invés de wcpfth
  height: "50px",
  borderRadius: "10px",
  color: "#000000",
  fontSize: "14px",
  border: selected ? "2px solid black" : "none", // Corrigido para 2px solid black
  "&:hover": {
    backgroundColor: "#9DE0FD",
  },
}));

// Componente Atendimento
export default function Atendimento({
  id,
  data,
  hora,
  duration,
  realizado,
  profissional,
}) {
  // Cria o objeto AtendimentoInfos
  const atendimento = new AtendimentoInfos(id,data, hora, duration, realizado, profissional);

  return (
    <div>
      <AtendimentoInfosField>
        <InputAdornment position="start">
          <SentimentSatisfiedAltIcon />
        </InputAdornment>
        <span>
          data: {atendimento.data} | 
          hora: {atendimento.hora} |
          duration: {atendimento.duration} |
          realizado: {atendimento.realizado} |
          profissional: {atendimento.profissional} |
        </span>
      </AtendimentoInfosField>
    </div>
  );
}
