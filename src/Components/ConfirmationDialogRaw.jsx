import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useNavigate } from 'react-router-dom';

//esse componente do material ui é utilizado para fazermos a listagem das habilidades e escolhermos para o questionário

const habilidades = [
    'Comunicação',
    'Alimentação',
    'Comportamento',
    'Socialização(sem pag por enquanto)',
    'Autonomia',
    'Habilidades Sociais',
  ];

function ConfirmationDialogRaw(props) {
  const navigate = useNavigate();
  const { onClose, value: valueProp, open, ...other } = props;
  const [value, setValue] = React.useState(valueProp);
  const radioGroupRef = React.useRef(null);

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
    onClose();
  };

  const handleOk = () => {
    onClose(value)
    //existem algumas habilidades a mais, enviadas pela praxis, presentes no documento
    if(value === "Comunicação"){
        navigate('/Pergunta_Comunicacao');
    } else if(value === "Alimentação"){
        navigate('/Pergunta_Alimentacao');
    } else if(value === "Comportamento"){
        navigate('/Pergunta_Comportamento');
    } else if(value === "Socialização"){
        // navigate('/Pergunta_Socializacao');
    } else if(value === "Autonomia"){
        navigate('/Pergunta_Autonomia');
    } else if(value === "Habilidades Sociais"){
        navigate('/Pergunta_HabSocial');
    }
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
      maxWidth="xs"
      TransitionProps={{ onEntering: handleEntering }}
      open={open}
      {...other}
    >
      <DialogTitle>Escolha a habilidade</DialogTitle>
      <DialogContent dividers>
        <RadioGroup
          ref={radioGroupRef}
          aria-label="ringtone"
          name="ringtone"
          value={value}
          onChange={handleChange}
        >
          {habilidades.map((option) => (
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