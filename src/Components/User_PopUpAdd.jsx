import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ClearIcon from '@mui/icons-material/Clear';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

// Cria uma instância do axios para chamadas à API
const api = axios.create({
  baseURL: 'http://localhost:3001/api/config/users',
  timeout: 1000,
});

const User_PopUpAdd = ({ onConfirm, onCancel }) => {
  // State declarations
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [type, setType] = useState('');
  const [ocupation, setOcupation] = useState('');
  const [email, setEmail] = useState(''); 
  const [perfilIds, setPerfilIds] = useState([]);
  // Para mensagens de erros
  const [errors, setErrors] = useState({});
  const [alertMessage, setAlertMessage] = useState('');


  // Função para enviar os dados para a API
  const handleRegister = async () => {
    const newErrors = {}; // Lista para guardar erros

    // Verifica se os campos estão vazios
    if (name === '') {
      newErrors.name = "Campo obrigatório";
    }
    if (email === '') {
      newErrors.email = "Campo obrigatório";
    }
    if (cpf === '') {
      newErrors.cpf = "Campo obrigatório";
    }
    if (telefone === '') {
      newErrors.telefone = "Campo obrigatório";
    }
    if (type === 'I' && ocupation === '') {
      newErrors.ocupation = "Campo obrigatório";
    }
    if(perfilIds.length === 0){
      newErrors.perfilIds = "Campo obrigatório";
    }

    // Verifica se a lista tem objetos
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setAlertMessage("Preencha Campos Obrigatórios!");
      return;
    }

    const userData = {
      name: name,
      email: email,
      cpf: cpf,
      phone: telefone,
      occupation: ocupation,
      birthday: '2004-02-04', // Data default 
      type: type, 
      profileIds: perfilIds,
    };

    console.log('Enviando dados:', userData); // Log dos dados a serem enviados

    try {
      const response = await api.put('http://localhost:3001/api/config/users', userData);
      console.log('Dados enviados com sucesso:', response.data);
      onConfirm(); // Executa a função de confirmação
    } catch (error) {
      if (error.response) {
        // A resposta foi recebida do servidor, mas com um status de erro
        console.error('Erro ao enviar dados:', error.response.data);
      } else if (error.request) {
        // A solicitação foi feita, mas nenhuma resposta foi recebida
        console.error('Nenhuma resposta recebida:', error.request);
      } else {
        // Outro tipo de erro
        console.error('Erro:', error.message);
      }
    }
  };

  const formatCPF = (value) => {
    if (!value) return '';
    const numericValue = value.replace(/\D/g, ''); // Remove caracteres não numéricos
    const match = numericValue.match(/^(\d{3})(\d{3})(\d{3})(\d{2})$/);
    if (match) {
      return `${match[1]}.${match[2]}.${match[3]}-${match[4]}`;
    }
    return value;
  };
  // Função para manipular a mudança no campo CPF
  // Função para manipular a mudança no campo CPF
  const handleCpfChange = (event) => {
    let { value } = event.target;
    value = value.slice(0, 14);
    const formattedValue = formatCPF(value);
    setCpf(formattedValue);
  };

  // Função para manipular a mudança no campo telefone
  const handleTelefoneChange = (event) => {
    let { value } = event.target;
    value = value.slice(0, 11);
    setTelefone(value);
  };

  // Função para manipular a mudança no tipo (interno ou externo)
  const handleTypeChange = (event) => {
    const { checked } = event.target;
    const type = checked ? "I" : "E";
    setType(type);
  };

  // Função para manipular a mudança na ocupação
  const handleOccupationChange = (event) => {
    let { value } = event.target;
    setOcupation(value);
  };

  const handlePerfilChange = (event) => {
    const { value, checked } = event.target;
    setPerfilIds((prev) => {
      if (checked) {
        return [...prev, value];
      } else {
        return prev.filter((id) => id !== value);
      }
    });
  };
  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      {/* FUNDO BRANCO */}
      <div className="w-[1000px] bg-white rounded-lg p-8 shadow-lg relative">
        {/* BOTÃO DE FECHAR */}
        <button
          onClick={onCancel}
          className="absolute top-0 right-0 md:mt-2 md:mr-2 mt-8 mr-5 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600"
                >
          <ClearIcon />
        </button>
        {/* TÍTULO */}
        <h1 className="font-bold text-center text-xl md:text-3xl mb-5">Novo Usuário</h1>

        <hr className="border-t border-gray-300" />
        {/* USER INFOS */}
        <p className="text-gray-700 text-sm mb-4">Usuário</p>

        {/* CAMPOS DE USUÁRIO */}
        <div className="md:flex gap-6 justify-between items-center md:mb-5">
          {/* CAMPO DE NOME */}
          <div className="md:flex-1">
            <InputLabel htmlFor="name-input">
              <p className="font-bold text-gray-950 text-xs md:text-sm">Nome</p>
            </InputLabel>
            <TextField
              id="name-input"
              name="name"
              placeholder="Insira o nome do usuário..."
              variant="outlined"
              className={`w-full bg-gray-200 rounded-[10px] ${errors.name ? 'bg-red-200' : 'bg-gray-200'}`}
              InputProps={{ style: { borderRadius: '10px' } }}
              value={name}
              error={!!errors.name}
              helperText={errors.name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) {
                  setErrors((prev) => ({ ...prev, name: '' }));
                }
              }}
            />
          </div>
          {/* CAMPO DE EMAIL */}
          <div className="md:flex-1">
            <InputLabel htmlFor="email-input">
              <p className="font-bold text-gray-950 text-xs md:text-sm">Email</p>
            </InputLabel>
            <TextField
              id="email-input"
              name="email"
              placeholder="Insira o email do usuário..."
              variant="outlined"
              className={`w-full bg-gray-200 rounded-[10px] ${errors.email ? 'bg-red-200' : 'bg-gray-200'}`}
              InputProps={{ style: { borderRadius: '10px' } }}
              value={email}
              error={!!errors.email}
              helperText={errors.email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) {
                  setErrors((prev) => ({ ...prev, email: '' }));
                }
              }}
            />
          </div>
          {/* CAMPO DE CPF */}
          <div className="md:flex-1">
            <InputLabel htmlFor="cpf-input">
              <p className="font-bold text-gray-950 text-xs md:text-sm">CPF</p>
            </InputLabel>
            <TextField
              id="cpf-input"
              name="cpf"
              placeholder="Insira o cpf do usuário..."
              variant="outlined"
              className={`w-full bg-gray-200 rounded-[10px] ${errors.cpf ? 'bg-red-200' : 'bg-gray-200'}`}
              InputProps={{ style: { borderRadius: '10px' } }}
              value={cpf}
              error={!!errors.cpf}
              helperText={errors.cpf}
              onChange={(e) => {
                handleCpfChange(e);
                if (errors.cpf) {
                  setErrors((prev) => ({ ...prev, cpf: '' }));
                }
              }}
            />
          </div>
          {/* CAMPO DE TELEFONE */}
          <div className="md:flex-1">
            <InputLabel htmlFor="telefone-input">
              <p className="font-bold text-gray-950 text-xs md:text-sm">Telefone</p>
            </InputLabel>
            <TextField
              id="telefone-input"
              name="telefone"
              placeholder="Insira o telefone do usuário..."
              variant="outlined"
              className={`w-full bg-gray-200 rounded-[10px] ${errors.telefone ? 'bg-red-200' : 'bg-gray-200'}`}
              InputProps={{ style: { borderRadius: '10px' } }}
              value={telefone}
              error={!!errors.telefone}
              helperText={errors.telefone}
              onChange={(e) => {
                handleTelefoneChange(e);
                if (errors.telefone) {
                  setErrors((prev) => ({ ...prev, telefone: '' }));
                }
              }}
            />
          </div>
        </div>

        {/* CheckBox De Funcionário */}
        <div className='text-start'>
          <FormControlLabel
            control={
              <Checkbox
                checked={type === "I"}
                onChange={handleTypeChange}
              />
            }
            label="Funcionário da PRAXIS?"
          />
        </div>

        {/* Mostrar o campo de ocupação apenas se for interno */}
        {type === 'I' && (
          <>
            <hr className="border-t border-gray-300" />
            <p className="text-gray-700 text-xs md:text-sm mb-4">Profissional</p>
            <div className="flex gap-6 justify-between items-center mb-10">
              <div className="flex-1">
                <InputLabel htmlFor="ocupation-select">
                  <p className="font-bold text-gray-950 text-xs md:text-sm">Ocupação</p>
                </InputLabel>
                <FormControl
                  variant="outlined"
                  className={`w-full bg-gray-200 ${errors.ocupation ? 'bg-red-200' : 'bg-gray-200'}`}
                >
                  <Select
                    id="ocupation-select"
                    value={ocupation}
                    error={!!errors.ocupation}
                    onChange={(e) => {
                      handleOccupationChange(e);
                      if (errors.ocupation) {
                        setErrors((prev) => ({ ...prev, ocupation: '' }));
                      }
                    }}
                    displayEmpty
                    inputProps={{
                      style: { borderRadius: '10px' },
                    }}
                    MenuProps={{
                      disableScrollLock: true,
                    }}
                  >
                    <MenuItem value=""><em>Selecione a ocupação...</em></MenuItem>
                    <MenuItem value="TO">Terapeuta Ocupacional</MenuItem>
                    <MenuItem value="FONO">Fonoaudiólogo</MenuItem>
                    <MenuItem value="PP">Psicopedagogo</MenuItem>
                    <MenuItem value="PSI">Psicologo(a)</MenuItem>
                    <MenuItem value="AT_ESC">Escola</MenuItem>
                    <MenuItem value="PSICO">Psicomotricidade</MenuItem>
                    <MenuItem value="NUTRI">Nutrição</MenuItem>
                    <MenuItem value="ADM">Administração</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
          </>
        )}
        <hr className="border-t border-gray-300" />
        <InputLabel>
          <p className="font-bold text-gray-950 text-xs md:text-sm">Perfil</p>
        </InputLabel>
        <FormControl className={`w-full bg-gray-200 rounded-[10px] ${errors.perfilIds ? 'bg-red-200' : 'bg-gray-200'}`}>
          <div className="w-full">
            <FormControlLabel
              control={
                <Checkbox
                  checked={perfilIds.includes('66889115e01fda923b864da6')}
                  onChange={handlePerfilChange}
                  value="66889115e01fda923b864da6"
                  color="primary"
                  className='text-xs md:text-sm'
                />
              }
              className='text-xs md:text-sm'
              label="Administrador"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={perfilIds.includes('66889115e01fda923b864da7')}
                  onChange={handlePerfilChange}
                  value="66889115e01fda923b864da7"
                  color="primary"
                  className='text-xs md:text-sm'
                />
              }
              className='text-xs md:text-sm'
              label="Profissional de Saúde"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={perfilIds.includes('66889115e01fda923b864da8')}
                  onChange={handlePerfilChange}
                  value="66889115e01fda923b864da8"
                  color="primary"
                  className='text-xs md:text-sm'
                />
              }
              className='text-xs md:text-sm'
              label="Responsável"
            />
          </div>
        </FormControl>



        {/* MENSAGEM VERMELHA DE ERRO!!!! */}
        {alertMessage && (
          <div className="text-red-500 text-center mb-4">
            {alertMessage}
          </div>
        )}
        <div className="flex justify-end space-x-4 mt-4">
          <button
            onClick={handleRegister}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Registrar
          </button>
        </div>
      </div>
    </div>
  );
};

User_PopUpAdd.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default User_PopUpAdd;
