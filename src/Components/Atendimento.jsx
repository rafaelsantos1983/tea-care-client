import React from "react";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";
import InputAdornment from "@mui/material/InputAdornment";

// Definição da classe AtendimentoInfos
class AtendimentoInfos {
  constructor(id, initialDate, finalDate, absent, professional) {
    this.id = id;
    this.data = `${initialDate.getDate()}/${initialDate.getMonth() + 1}/${initialDate.getFullYear()}`; // formata para d/m/y
    this.initialDate = initialDate;
    this.finalDate = finalDate;
    this.duration = (finalDate - initialDate) / (1000 * 60 * 60); // horas
    this.absent = absent;
    this.professional = professional;
  }
}

// Estilização do componente Button
const AtendimentoInfosField = styled(Button)(({ selected }) => ({
  backgroundColor: selected ? "#9DE0FD" : "inherit",
  width: "100%",
  height: "50px",
  borderRadius: "10px",
  color: "#000000",
  fontSize: "14px",
  border: selected ? "2px solid black" : "none",
  "&:hover": {
    backgroundColor: "#9DE0FD",
  },
}));

// Componente Atendimento
export default function Atendimento({
  id,
  initialDate,
  finalDate,
  absent,
  professional,
}) {
  // Cria o objeto AtendimentoInfos
  const atendimento = new AtendimentoInfos(id, initialDate, finalDate, absent, professional);

  return (
    <div>
      <AtendimentoInfosField>
        <InputAdornment position="start">
          <SentimentSatisfiedAltIcon />
        </InputAdornment>
        <span>
          data: {atendimento.data} | 
          initialDate: {atendimento.initialDate.toLocaleString()} |
          duration: {atendimento.duration.toFixed(2)} horas |
          absent: {atendimento.absent ? "Sim" : "Não"} |
          profissional: {atendimento.professional} |
        </span>
      </AtendimentoInfosField>
    </div>
  );
}
