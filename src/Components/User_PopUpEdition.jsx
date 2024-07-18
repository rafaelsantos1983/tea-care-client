import React, { useState, useEffect } from 'react';
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
import dayjs from 'dayjs'; // Importe o dayjs ou o módulo de data de sua escolha
import InputMask from 'react-input-mask';

// Cria uma instância do axios para chamadas à API
const api = axios.create({
    baseURL: 'http://localhost:3001/api/config/users',
    timeout: 1000,
});

const User_PopUpEdition = ({ userId, onConfirm, onCancel }) => {
    // Declaração de estados
    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [telefone, setTelefone] = useState('');
    const [interno, setInterno] = useState('');
    const [ocupation, setOcupation] = useState('');
    const [email, setEmail] = useState('');
    // Para mensagens de erros
    const [errors, setErrors] = useState({});
    const [alertMessage, setAlertMessage] = useState('');

    // Busca os dados do usuário quando o componente é montado
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`http://localhost:3001/api/config/users/${userId}`);
                const { name, cpf, telefone, ocupation, email, type } = response.data;
                setName(name);
                setCpf(cpf);
                setTelefone(telefone);
                setOcupation(ocupation);
                setEmail(email);
                setInterno(type === 'I' ? 'I' : 'E');
            } catch (error) {
                console.error('Erro ao buscar dados do usuário:', error);
            }
        };

        if (userId) {
            fetchData();
        }
    }, [userId]);

    // Função para salvar os dados editados
    const handleSave = async () => {
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
        if (interno === 'I' && ocupation === '') {
            newErrors.ocupation = "Campo obrigatório";
        }

        // Verifica se a lista tem objetos
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setAlertMessage("Preencha Campos Obrigatórios!");
            return;
        }

        try {
            const response = await api.put(`/api/config/users/${userId}`, {
                name: name,
                email: email,
                cpf: cpf,
                phone: telefone,
                occupation: ocupation,
                birthday: '2004-02-04', // Data default
                type: interno,
            });
            console.log('Dados enviados com sucesso:', response.data);
            onConfirm();
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
            // Adicione um feedback visual para o usuário
            alert('Erro ao salvar os dados. Por favor, tente novamente.');
        }
    };

    // Função para manipular a mudança no campo CPF
    const handleCpfChange = (event) => {
        let { value } = event.target;
        value = value.slice(0, 14);
        setCpf(value);
    };

    // Função para manipular a mudança no campo telefone
    const handleTelefoneChange = (event) => {
        let { value } = event.target;
        value = value.slice(0, 15);
        setTelefone(value);
    };

    // Função para manipular a mudança no tipo (interno ou externo)
    const handleTypeChange = (event) => {
        const { checked } = event.target;
        const type = checked ? 'I' : 'E';
        setInterno(type);
    };

    // Função para manipular a mudança na ocupação
    const handleOccupationChange = (event) => {
        let { value } = event.target;
        setOcupation(value);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-[1000px] bg-white rounded-lg p-8 shadow-lg relative">
                {/* BOTÃO DE FECHAR */}
                <button
                    onClick={onCancel}
                    className="absolute top-0 right-0 mt-2 mr-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600"
                >
                    <ClearIcon />
                </button>
                {/* TÍTULO */}
                <h1 className="font-bold text-center text-3xl mb-5">Editar Usuário</h1>
                <hr className="border-t border-gray-300" />
                <p className="text-gray-700 text-sm mb-4">Dados do Usuário</p>
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
                    <div className="flex-1">
                        <InputLabel htmlFor="email-input">
                            <p className="font-bold text-gray-950 text-sm">Email</p>
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
                    <div className="flex-1">
                        <InputLabel htmlFor="cpf-input">
                            <p className="font-bold text-gray-950 text-sm">CPF</p>
                        </InputLabel>
                        <InputMask
                            mask="999.999.999-99"
                            value={cpf}
                            onChange={(e) => {
                                setCpf(e.target.value);
                                if (errors.cpf) {
                                    setErrors((prev) => ({ ...prev, cpf: '' }));
                                }
                            }}
                        >
                            {(inputProps) => (
                                <TextField
                                    {...inputProps}
                                    id="cpf-input"
                                    name="cpf"
                                    placeholder="Insira o cpf do usuário..."
                                    variant="outlined"
                                    className={`w-full bg-gray-200 rounded-[10px] ${errors.cpf ? 'bg-red-200' : 'bg-gray-200'}`}
                                    InputProps={{ style: { borderRadius: '10px' } }}
                                    error={!!errors.cpf}
                                    helperText={errors.cpf}
                                />
                            )}
                        </InputMask>
                    </div>
                    {/* CAMPO DE TELEFONE */}
                    <div className="flex-1">
                        <InputLabel htmlFor="telefone-input">
                            <p className="font-bold text-gray-950 text-sm">Telefone</p>
                        </InputLabel>
                        <InputMask
                            mask="(99) 99999-9999"
                            value={telefone}
                            onChange={(e) => {
                                setTelefone(e.target.value);
                                if (errors.telefone) {
                                    setErrors((prev) => ({ ...prev, telefone: '' }));
                                }
                            }}
                        >
                            {(inputProps) => (
                                <TextField
                                    {...inputProps}
                                    id="telefone-input"
                                    name="telefone"
                                    placeholder="Insira o telefone do usuário..."
                                    variant="outlined"
                                    className={`w-full bg-gray-200 rounded-[10px] ${errors.telefone ? 'bg-red-200' : 'bg-gray-200'}`}
                                    InputProps={{ style: { borderRadius: '10px' } }}
                                    error={!!errors.telefone}
                                    helperText={errors.telefone}
                                />
                            )}
                        </InputMask>
                    </div>
                </div>
                {/* CheckBox De Funcionário */}
                <div className='text-start'>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={interno === "I"}
                                onChange={handleTypeChange}
                            />
                        }
                        label="Funcionário da PRAXIS?"
                    />
                </div>
                {/* Mostrar o campo de ocupação apenas se for interno */}
                {interno === 'I' && (
                    <>
                        <hr className="border-t border-gray-300" />
                        <p className="text-gray-700 text-sm mb-4">Profissional</p>
                        <div className="flex gap-6 justify-between items-center mb-10">
                            <div className="flex-1">
                                <InputLabel htmlFor="ocupation-select">
                                    <p className="font-bold text-gray-950 text-sm">Ocupação</p>
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
                                        <MenuItem value="ESC">Escola</MenuItem>
                                        <MenuItem value="PSM">Psicomotricidade</MenuItem>
                                        <MenuItem value="NUTRI">Nutrição</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                    </>
                )}
                {/* MENSAGEM VERMELHA DE ERRO!!!! */}
                {alertMessage && (
                    <div className="text-red-500 text-center mb-4">
                        {alertMessage}
                    </div>
                )}
                <div className="flex justify-end space-x-4 mt-4">
                    <button
                        onClick={handleSave}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        Salvar
                    </button>
                </div>
            </div>
        </div>
    );
};

User_PopUpEdition.propTypes = {
    userId: PropTypes.string.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

export default User_PopUpEdition;
