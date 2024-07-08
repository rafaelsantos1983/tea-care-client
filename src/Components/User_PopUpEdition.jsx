import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import ClearIcon from "@mui/icons-material/Clear";
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br'; // Importe a localização em português do Brasil de Day.js
import { ptBR } from '@mui/x-date-pickers/locales';
import axios from 'axios';

dayjs.locale('pt-br'); // Defina o local de Day.js para pt-BR

const api = axios.create({
    baseURL: "http://localhost:3001", 
    timeout: 1000,
});

const User_PopUpEdition = ({ userId, onConfirm, onCancel }) => {
    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [birthday, setBirthday] = useState(null);
    const [nameResponsavel, setNameResponsavel] = useState('');
    const [cpfResponsavel, setCpfResponsavel] = useState('');

    // Função para buscar dados do user pelo ID
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`/api/config/users/${userId}`);
                const { name, cpf, birthday } = response.data; // Supondo que a API retorna nome, cpf e birthday
                setName(name);
                setCpf(formatCPF(cpf)); // Formata o CPF ao setar o estado
                setBirthday(dayjs(birthday)); // Convertendo a data para o formato do DatePicker
            } catch (error) {
                console.error('Erro ao buscar dados do user:', error);
            }
        };

        if (userId) {
            fetchData();
        }
    }, [userId]);

    // Função para enviar os dados para a API
    const handleSave = async () => {
        try {
            const response = await api.post(`/api/config/users/${userId}`, {
                name: name,
                cpf: cpf,
                birthday: birthday
                // nameResponsavel: nameResponsavel,
                // cpfResponsavel: cpfResponsavel
            });
            console.log('Dados enviados com sucesso:', response.data);
            // Executa a função de confirmação
            onConfirm();
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
        }
    };

    // Função para formatar o CPF
    const formatCPF = (value) => {
        if (!value) return '';
        const numericValue = value.replace(/\D/g, ""); // Remove caracteres não numéricos
        const match = numericValue.match(/^(\d{3})(\d{3})(\d{3})(\d{2})$/);
        if (match) {
            return `${match[1]}.${match[2]}.${match[3]}-${match[4]}`;
        }
        return value;
    };

    // Função para manipular a mudança no campo CPF
    const handleCpfChange = (event, setCpfValue) => {
        let { value } = event.target;
        // Limita o tamanho do CPF para no máximo 14 caracteres (com formatação)
        value = value.slice(0, 14);
        // Remove caracteres não numéricos
        const numericValue = value.replace(/\D/g, "");
        setCpfValue(formatCPF(numericValue)); // Formata o CPF ao digitar
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
                
                <hr className="border-t border-gray-300"/>
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
                                style: { borderRadius: '10px' }
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
                                style: { borderRadius: '10px' }
                            }}
                            value={cpf}
                            onChange={(e) => handleCpfChange(e, setCpf)}
                        />
                    </div>

                </div>

                <hr className="border-t border-gray-300"/>
                <p className="text-gray-700 text-sm mb-4">Profissional</p>



                <hr className="border-t border-gray-300"/>

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
