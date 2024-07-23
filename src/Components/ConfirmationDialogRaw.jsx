import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import axios from "axios";
import { setItemStorage } from "../Shared/Functions/Connection/localStorageProxy";
import { useNavigate } from "react-router-dom";

const presenca = ["Ausente", "Presente"];

const api = axios.create({
  baseURL: "http://localhost:3002",
  timeout: 1000,
});

function ConfirmationDialogRaw(props) {
  const { onClose, value: valueProp, open, ...other } = props;
  const [value, setValue] = React.useState(valueProp);
  const radioGroupRef = React.useRef(null);
  const navigate = useNavigate(); // useNavigate deve ser chamado aqui

  function parseJwt(token) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  }

  const idPaciente = localStorage.getItem("selectedPacienteId");
  const token = localStorage.getItem("accessToken");
  const payload = parseJwt(token);
  const idProfissional = payload.user.id;

  React.useEffect(() => {
    if (!open) {
      setValue(valueProp);
    }
  }, [valueProp, open]);

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };

  const handleCancel = () => {
    onClose(); // Chama a função onClose com o estado atual do value
  };

  const handleOk = async () => {
    console.log(value);

    const currentTime = new Date();
    console.log("Horário do Atendimento: ", currentTime);

    if (value === "Ausente") {
      try {
        const response = await api.put(
          `/api/therapeutic-activity/cares/absent`,
          {
            patientId: idPaciente,
            professionalId: idProfissional,
          }
        );
        console.log("Dados enviados com sucesso:", response.data);
      } catch (error) {
        console.error("Erro ao enviar dados:", error);
      }
    } else if (value === "Presente") {
      try {
        const response = await api.put(`/api/therapeutic-activity/cares`, {
          patientId: idPaciente,
          professionalId: idProfissional,
        });
        console.log("Dados enviados com sucesso:", response.data);

        // Acessando o id específico da resposta
        const id = response.data.id; // Ajuste isso de acordo com a estrutura da resposta
        console.log("ID do atendimento:", id);

        setItemStorage("atendimentoId", id);
        window.location.href = "/Questions";
      } catch (error) {
        console.error("Erro ao enviar dados:", error);
      }
    }

    onClose(value); // Passa o valor atual para a função onClose
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
      maxWidth="xs"
      TransitionProps={{ onEntering: handleEntering }}
      open={open}
      {...other}
    >
      <DialogTitle>O paciente se encontra:</DialogTitle>
      <DialogContent dividers>
        <RadioGroup
          ref={radioGroupRef}
          aria-label="ringtone"
          name="ringtone"
          value={value}
          onChange={handleChange}
        >
          {presenca.map((option) => (
            <FormControlLabel
              value={option}
              key={option}
              control={<Radio />}
              label={option}
            />
          ))}
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Cancelar
        </Button>
        <Button onClick={handleOk}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
}

ConfirmationDialogRaw.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
};

export default ConfirmationDialogRaw;
