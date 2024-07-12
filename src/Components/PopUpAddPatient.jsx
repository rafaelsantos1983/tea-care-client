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
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import axios from 'axios';

dayjs.locale('pt-br'); // Defina o local de Day.js para pt-BR

const api = axios.create({
    baseURL: "http://localhost:3002",
    timeout: 1000,
});

const PopUpEdition = ({ onConfirm, onCancel }) => {
    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [birthday, setBirthday] = useState(null);
    const [nameResponsavel, setNameResponsavel] = useState('');
    const [cpfResponsavel, setCpfResponsavel] = useState('');


    // Função para enviar os dados para a API
    const handleRegister = async () => {
        try {
            const response = await api.post(`/api/therapeutic-activity/patients`, {
                name: name,
                cpf: cpf,
                birthday: birthday
                //faltam adicionar os campos no back:
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
                <h1 className="font-bold text-center text-3xl mb-5">Novo paciente</h1>
                
                <hr className="border-t border-gray-300"/>
                <p className="text-gray-700 text-sm mb-4">Paciente</p>

                <div className="flex gap-6 justify-between items-center mb-10">
                    <div className="flex-1">
                        <InputLabel htmlFor="name-input">
                            <p className="font-bold text-gray-950 text-sm">Nome</p>
                        </InputLabel>
                        <TextField
                            id="name-input"
                            name="name"
                            placeholder="Insira o nome do paciente..."
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
                            placeholder="Insira o CPF do paciente..."
                            variant="outlined"
                            className="w-full bg-gray-200 rounded-[10px]"
                            InputProps={{
                                style: { borderRadius: '10px' }
                            }}
                            value={cpf}
                            onChange={(e) => handleCpfChange(e, setCpf)}
                        />
                    </div>

                    <div className="flex-1">
                        <InputLabel htmlFor="date-picker">
                            <p className="font-bold text-gray-950 text-sm">Data de Nascimento</p>
                        </InputLabel>
                        <LocalizationProvider 
                            dateAdapter={AdapterDayjs}
                            locale={ptBR}
                            localeText={ptBR.components.MuiLocalizationProvider.defaultProps.localeText}
                            className="bg-gray-200"
                        >
                            <DatePicker
                                value={birthday}
                                onChange={(newDate) => setBirthday(newDate)}
                                format="DD/MM/YYYY"
                                className="bg-gray-200"
                                textField={(props) => (
                                    <TextField
                                        {...props}
                                        id="date-picker"
                                        variant="outlined"
                                        className="w-full bg-gray-200 rounded-[10px]"
                                        sx={{ input: { height: '100%' } }}
                                    />
                                )}
                            />

                        </LocalizationProvider>
                    </div>
                </div>

                <hr className="border-t border-gray-300"/>
                <p className="text-gray-700 text-sm mb-4">Responsável</p>

                <div className="flex gap-6 justify-between items-center mb-10">
                    <div className="flex-1">
                        <InputLabel htmlFor="responsavel-select">
                            <p className="font-bold text-gray-950 text-sm">Nome</p>
                        </InputLabel>
                        <FormControl variant="outlined" className="w-full bg-gray-200">
                            <Select
                                id="responsavel-select"
                                value={nameResponsavel}
                                onChange={(e) => setNameResponsavel(e.target.value)}
                                displayEmpty
                                disablePortal
                                inputProps={{
                                    style: { borderRadius: '10px' }
                                }}
                                MenuProps={{
                                    disableScrollLock: true
                                }}
                            >
                                <MenuItem value="">
                                    <em>Selecione o responsável...</em>
                                </MenuItem>
                                {/* colocar os responsaveis depois*/}
                            </Select>
                        </FormControl>
                    </div>
                </div>

                <hr className="border-t border-gray-300"/>

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

PopUpEdition.propTypes = {
    patientId: PropTypes.string.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

export default PopUpEdition;
