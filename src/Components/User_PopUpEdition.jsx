import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ClearIcon from '@mui/icons-material/Clear';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import axios from 'axios';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

dayjs.locale('pt-br');

const api = axios.create({
    baseURL: 'http://localhost:3001',
    timeout: 1000,
});

const User_PopUpEdition = ({ userId, onConfirm, onCancel }) => {
    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [ocupation, setOcupation] = useState('');
    const [telefone, setTelefone] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`/api/config/users/${userId}`);
                const { name, cpf, birthday } = response.data;
                setName(name);
                setCpf(formatCPF(cpf));
                setBirthday(dayjs(birthday));
            } catch (error) {
                console.error('Erro ao buscar dados do user:', error);
            }
        };

        if (userId) {
            fetchData();
        }
    }, [userId]);

    const handleSave = async () => {
        try {
            const response = await api.post(`/api/config/users/${userId}`, {
                name,
                cpf,
                ocupation,
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
        // Função para manipular a mudança no campo telefone
    const handleTelefoneChange = (event, setTelefoneValue) => {
            let { value } = event.target;
            value = value.slice(0, 15);
            const numericValue = value.replace(/\D/g, '');
            setTelefoneValue(formatTelefone(numericValue));
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
                <h1 className="font-bold text-center text-3xl mb-5">Atualizar Dados</h1>

                <hr className="border-t border-gray-300" />
                <p className="text-gray-700 text-sm mb-4">Usuário</p>

                <div className="flex gap-6 justify-between items-center mb-10">
                    <div className="flex-1">
                        <InputLabel htmlFor="name-input">
                            <p className="font-bold text-gray-950 text-sm">Nome</p>
                        </InputLabel>
                        <TextField
                            id="name-input"
                            name="name"
                            placeholder="Insira o nome do user..."
                            variant="outlined"
                            className="w-full bg-gray-200 rounded-[10px]"
                            InputProps={{
                                style: { borderRadius: '10px' },
                            }}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="flex-1">
                        <InputLabel htmlFor="cpf-input">
                            <p className="font-bold text-gray-950 text-sm">CPF</p>
                        </InputLabel>
                        <TextField
                            id="cpf-input"
                            name="cpf"
                            placeholder="Insira o CPF do user..."
                            variant="outlined"
                            className="w-full bg-gray-200 rounded-[10px]"
                            InputProps={{
                                style: { borderRadius: '10px' },
                            }}
                            value={cpf}
                            onChange={handleCpfChange}
                        />
                    </div>
                </div>

                <div className='text-start'>
                    <FormControlLabel control={<Checkbox />} label="Funcionário da PRAXIS?" />
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
                                onChange={(e) => setOcupation(e.target.value)}
                                displayEmpty
                                inputProps={{
                                    style: { borderRadius: '10px' },
                                }}
                                MenuProps={{
                                    disableScrollLock: true,
                                }}
                            >
                                <MenuItem value="">
                                    <em>Selecione a ocupação...</em>
                                </MenuItem>
                                {/* Adicione opções de ocupação aqui */}
                            </Select>
                        </FormControl>
                    </div>
                </div>

                <hr className="border-t border-gray-300" />

                <div className="flex justify-end space-x-4 mt-4">
                    <button
                        onClick={handleSave}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
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
