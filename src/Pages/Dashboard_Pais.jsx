import * as React from 'react';
import Banner from '../Components/Banner';
import userImage from '../Imagens/Ft_perfil.jpg';

function Dashboard_Pais() {
  return (
    <div className="min-h-screen bg-blue-500"> {/* Cor de fundo azul #14B1F4 usando Tailwind CSS */}
      <Banner name="André Silva" description="pai de Luís" />

      <div className="flex justify-center items-center h-[600px] mt-8">
        <div className="bg-white w-[900px] h-[450px] rounded-[50px] shadow-lg">

        </div>
      </div>
    </div>
  );
}

export default Dashboard_Pais;

