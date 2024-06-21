import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';

import userImage from '../Imagens/Ft_perfil.jpg';
import Logo from '../Imagens/LOGO_TEACARE.png'

function Banner({ name, description }) {

  return (
    <div className="bg-[#FFE01D] rounded-b-[30px] overflow-hidden h-[90px] flex items-center justify-between px-4">
      <div className="flex items-center">

          <Avatar src={userImage} sx={{ width: 60, height: 60 }} /> {/* Ajuste o tamanho conforme necessário */}

        <div className="flex flex-col ml-5">
            <div className="text-black text-xl font-bold">{name}</div> {/* Ajuste de tamanho e negrito */}
            <div className="text-black text-sm">{description}</div> {/* Ajuste de tamanho do description */}
        </div>
      </div>
      <div className="flex items-center mb-4">
        <img src={Logo} className="w-[140px] h-[140px]" alt="Logo" /> {/* Ajuste o tamanho conforme necessário */}
        
      </div>
    </div>
  );
}

Banner.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
};

export default Banner;
