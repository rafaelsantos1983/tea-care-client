import Button from '@mui/material/Button';
import { styled } from '@mui/system';

const GreenButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#66D168',
  width: '250px',
  height: '50px',
  color: '#ffffff',
  '&:hover': {
    backgroundColor: '#689f38',
  },
}));

export default function CustomButton({ children, ...props }) {
  return (
    <GreenButton {...props}>
      {children || 'Enviar'}
    </GreenButton>
  );
}
