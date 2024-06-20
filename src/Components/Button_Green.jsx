import React from 'react';
import Button from '@mui/material/Button';

const customButtonStyle = {
  backgroundColor: '#66D168', // Cor verde clara
  width: '250px',
  height: '50px', // Altura aumentada para 40px para melhorar a legibilidade
  color: '#ffffff', // Texto branco
  '&:hover': {
    backgroundColor: '#689f38', // Cor mais escura ao passar o mouse
  },
};

function CustomButton() {
  return (
    <Button variant="contained" style={customButtonStyle}>
      Enviar
    </Button>
  );
}

export default CustomButton;
