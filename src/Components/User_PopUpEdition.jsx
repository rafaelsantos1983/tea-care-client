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

const api = axios.create({
    baseURL: 'http://localhost:3001',
    timeout: 1000,
});

const User_PopUpEdition = ({ userId, onConfirm, onCancel }) => {
    // State declarations
    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [telefone, setTelefone] = useState('');
    const [interno, setInterno] = useState('');
    const [ocupation, setOcupation] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`/api/config/users/${userId}`);
                const { name, cpf, telefone, ocupation, email, type } = response.data;
                setName(name);
                setCpf(formatCPF(cpf));
                setTelefone(formatTelefone(telefone));
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

    const handleSave = async () => {
        try {
            const response = await api.put(`/api/config/users/${userId}`, {
                name: name,
                email: email,
                cpf: cpf,
                phone: telefone,
                occupation: ocupation,
                birthday: '2004-02-04', // Data default
                type: interno === 'I' ? 'I' : 'E',
            });
            console.log('Dados enviados com sucesso:', response.data);
            onConfirm();
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
        }
    };

    const formatCPF = (value) => {
        if (!value) return '';
        const numericValue = value.replace(/\D/g, '');
        const match = numericValue.match(/^(\d{3})(\d{3})(\d{3})(\d{2})$/);
        if (match) {
            return `${match[1]}.${match[2]}.${match[3]}-${match[4]}`;
        }
        return value;
    };

    const handleCpfChange = (event) => {
        let { value } = event.target;
        value = value.slice(0, 14);
        const numericValue = value.replace(/\D/g, '');
        setCpf(formatCPF(numericValue));
    };

    const handleTelefoneChange = (event) => {
        let { value } = event.target;
        value = value.slice(0, 15);
        const numericValue = value.replace(/\D/g, '');
        setTelefone(formatTelefone(numericValue));
    };

    const formatTelefone = (value) => {
        if (!value) return '';
        const numericValue = value.replace(/\D/g, '');
        const match = numericValue.match(/^(\d{2})(\d{5})(\d{4})$/);
        if (match) {
            return `(${match[1]}) ${match[2]}-${match[3]}`;
        }
        return value;
    };

    const handleTypeChange = (event) => {
        const { checked } = event.target;
        const type = checked ? 'I' : 'E';
        setInterno(type);
    };

    const handleOccupationChange = (event) => {
        let { value } = event.target;
        setOcupation(value);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-[1000px] bg-white rounded-lg p-8 shadow-lg relative">
                <button
                    onClick={onCancel}
                    className="absolute top-0 right-0 mt-2 mr-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600"
                >
                    <ClearIcon />
                </button>
                <h1 className="font-bold text-center text-3xl mb-5">Editar Usuário</h1>
                <hr className="border-t border-gray-300" />
                <p className="text-gray-700 text-sm mb-4">Dados do Usuário</p>
                <div className="flex gap-6 justify-between items-center mb-5">
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
                            onChange={handleTelefoneChange}
                        />
                    </div>
                </div>
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
