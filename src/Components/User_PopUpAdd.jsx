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
  baseURL: 'http://localhost:3001',
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

  // Função para enviar os dados para a API
  const handleRegister = async () => {
    const userData = {
      name: name,
      email: email,
      cpf: cpf,
      phone: telefone,
      occupation: ocupation,
      birthday: '2004-02-04', // Data default 
      type: type, // Converte interno para 'I' ou 'E'
    };

    console.log('Enviando dados:', userData); // Log dos dados a serem enviados

    try {
      const response = await api.put('/api/config/users', userData);
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

  // Função para formatar o CPF
  const formatCPF = (value) => {
    if (!value) return '';
    const numericValue = value.replace(/\D/g, '');
    const match = numericValue.match(/^(\d{3})(\d{3})(\d{3})(\d{2})$/);
    if (match) {
      return `${match[1]}.${match[2]}.${match[3]}-${match[4]}`;
    }
    return value;
  };

  // Função para formatar o telefone
  const formatTelefone = (value) => {
    if (!value) return '';
    const numericValue = value.replace(/\D/g, '');
    const match = numericValue.match(/^(\d{2})(\d{5})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return value;
  };

  // Função para manipular a mudança no campo CPF
  const handleCpfChange = (event) => {
    let { value } = event.target;
    value = value.slice(0, 14);
    const numericValue = value.replace(/\D/g, '');
    setCpf(formatCPF(numericValue));
  };

  // Função para manipular a mudança no campo telefone
  const handleTelefoneChange = (event) => {
    let { value } = event.target;
    value = value.slice(0, 15);
    const numericValue = value.replace(/\D/g, '');
    setTelefone(formatTelefone(numericValue));
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

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      {/* FUNDO BRANCO */}
      <div className="w-[1000px] bg-white rounded-lg p-8 shadow-lg relative">
        {/* BOTÃO DE FECHAR */}
        <button
          onClick={onCancel}
          className="absolute top-0 right-0 mt-2 mr-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600"
        >
          <ClearIcon />
        </button>
        {/* TÍTULO */}
        <h1 className="font-bold text-center text-3xl mb-5">Novo Usuário</h1>

        <hr className="border-t border-gray-300" />
        {/* USER INFOS */}
        <p className="text-gray-700 text-sm mb-4">Usuário</p>

        {/* CAMPOS DE USUÁRIO */}
        <div className="flex gap-6 justify-between items-center mb-5">
          {/* CAMPO DE NOME */}
          <div className="flex-1">
            <InputLabel htmlFor="name-input">
              <p className="font-bold text-gray-950 text-sm">Nome</p>
            </InputLabel>
            <TextField
              id="name-input"
              name="name"
              placeholder="Insira o nome do usuário..."
              variant="outlined"
              className="w-full bg-gray-200 rounded-[10px]"
              InputProps={{ style: { borderRadius: '10px' } }}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          {/* CAMPO DE EMAIL */}
          <div className="flex-1">
            <InputLabel htmlFor="email-input">
              <p className="font-bold text-gray-950 text-sm">Email</p>
            </InputLabel>
            <TextField
              id="email-input"
              name="email"
              placeholder="Insira o email do usuário..."
              variant="outlined"
              className="w-full bg-gray-200 rounded-[10px]"
              InputProps={{ style: { borderRadius: '10px' } }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {/* CAMPO DE CPF */}
          <div className="flex-1">
            <InputLabel htmlFor="cpf-input">
              <p className="font-bold text-gray-950 text-sm">CPF</p>
            </InputLabel>
            <TextField
              id="cpf-input"
              name="cpf"
              placeholder="Insira o CPF do usuário..."
              variant="outlined"
              className="w-full bg-gray-200 rounded-[10px]"
              InputProps={{ style: { borderRadius: '10px' } }}
              value={cpf}
              onChange={(e) => handleCpfChange(e)}
            />
          </div>
          {/* CAMPO DE TELEFONE */}
          <div className="flex-1">
            <InputLabel htmlFor="telefone-input">
              <p className="font-bold text-gray-950 text-sm">Telefone</p>
            </InputLabel>
            <TextField
              id="telefone-input"
              name="telefone"
              placeholder="Insira o telefone do usuário..."
              variant="outlined"
              className="w-full bg-gray-200 rounded-[10px]"
              InputProps={{ style: { borderRadius: '10px' } }}
              value={telefone}
              onChange={(e) => handleTelefoneChange(e)}
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

        {/* CAMPOS PARA PROFISSIONAL DE SAÚDE */}
        <hr className="border-t border-gray-300" />
        <p className="text-gray-700 text-sm mb-4">Profissional</p>
        <div className="flex gap-6 justify-between items-center mb-10">
          <div className="flex-1">
            <InputLabel htmlFor="ocupation-select">
              <p className="font-bold text-gray-950 text-sm">Ocupação</p>
            </InputLabel>
            <FormControl variant="outlined" className="w-full bg-gray-200">
              <Select
                id="ocupation-select"
                value={ocupation}
                onChange={handleOccupationChange}
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
              </Select>
            </FormControl>
          </div>
        </div>

        <hr className="border-t border-gray-300" />

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
