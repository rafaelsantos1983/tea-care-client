import Button from '@mui/material/Button';
const customButtonStyle = {
  backgroundColor: '#043058', // Cor verde clara
  width: '250px',
  height: '50px', // Altura aumentada para 40px para melhorar a legibilidade
  color: '#FFE01D', // Texto branco
  '&:hover': {
    backgroundColor: '#689f38', // Cor mais escura ao passar o mouse
  },
};

function BlueButton({text}) {
  return (
    <Button variant="contained" style={customButtonStyle}>
      {text}
    </Button>
  );
}

export default BlueButton;
