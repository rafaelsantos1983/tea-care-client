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

const PopUpAddPatient = ({ onConfirm, onCancel }) => {
    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [birthday, setBirthday] = useState(null);
    const [idResponsavel, setIdResponsavel] = useState('');
    const [responsaveis, setResponsaveis] = useState([]);
    const [errors, setErrors] = useState({});
    const [alertMessage, setAlertMessage] = useState('');

    // Função para buscar os responsáveis
    useEffect(() => {
        const fetchResponsaveis = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/users');
                setResponsaveis(response.data);
            } catch (error) {
                console.error('Erro ao buscar responsáveis:', error);
            }
        };

        fetchResponsaveis();
    }, []);

    // Função para enviar os dados para a API
    const handleSave = async () => {
        const newErrors = {}; // Lista para guardar erros
        
        // Verifica se os campos estão vazios
        if (name === '') {
            newErrors.name = "Campo obrigatório";
        }
        if (cpf === '') {
            newErrors.cpf = "Campo obrigatório";
        }
        if (!birthday) {
            newErrors.birthday = "Campo obrigatório";
        }
        if (idResponsavel === '') {
            newErrors.idResponsavel = "Campo obrigatório";
        }
        
        // Verifica se a lista tem objetos
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setAlertMessage("Preencha Todos os Campos!");
            return;
        }

        try {
            const response = await api.put(`/api/therapeutic-activity/patients`, {
                name: name,
                cpf: cpf,
                birthday: birthday,
                responsibleId: idResponsavel
            });
            console.log('Dados enviados com sucesso:', response.data);
            onConfirm();
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
            setAlertMessage('Erro ao enviar dados!');
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
        value = value.slice(0, 14);
        const numericValue = value.replace(/\D/g, "");
        setCpfValue(formatCPF(numericValue));
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
                <h1 className="font-bold text-center text-3xl mb-5">Registrar Paciente</h1>
                
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
                            className={`w-full rounded-[10px] ${errors.name ? 'bg-red-200' : 'bg-gray-200'}`}
                            InputProps={{
                                style: { borderRadius: '10px' }
                            }}
                            error={!!errors.name}
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                                if (errors.name) {
                                    setErrors((prev) => ({ ...prev, name: '' }));
                                }
                            }}
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
                            className={`w-full rounded-[10px] ${errors.cpf ? 'bg-red-200' : 'bg-gray-200'}`}
                            InputProps={{
                                style: { borderRadius: '10px' }
                            }}
                            error={!!errors.cpf}
                            value={cpf}
                            onChange={(e) => {
                                handleCpfChange(e, setCpf);
                                if (errors.cpf) {
                                    setErrors((prev) => ({ ...prev, cpf: '' }));
                                }
                            }}
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
                                onChange={(newDate) => {
                                    setBirthday(newDate);
                                    if (errors.birthday) {
                                        setErrors((prev) => ({ ...prev, birthday: '' }));
                                    }
                                }}
                                format="DD/MM/YYYY"
                                className={`bg-gray-200 ${errors.birthday ? 'bg-red-200' : 'bg-gray-200'}`}
                                textField={(props) => (
                                    <TextField
                                        {...props}
                                        id="date-picker"
                                        variant="outlined"
                                        className={`w-full rounded-[10px] ${errors.birthday ? 'bg-red-200' : 'bg-gray-200'}`}
                                        error={!!errors.birthday}
                                        helperText={errors.birthday}
                                        sx={{ input: { height: '100%' } }}
                                    />
                                )}
                            />
                        </LocalizationProvider>
                    </div>
                </div>

                <hr className="border-t border-gray-300"/>
                <br />

                <div className="flex gap-6 justify-between items-center mb-10">
                <div className="flex-1">
                    <InputLabel htmlFor="responsavel-select">
                        <p className="font-bold text-gray-950 text-sm">Responsável</p>
                    </InputLabel>
                    <FormControl variant="outlined" className={`w-full ${errors.idResponsavel ? 'bg-red-200' : 'bg-gray-200'}`}>
                        <Select
                            id="responsavel-select"
                            value={idResponsavel}
                            onChange={(e) => {
                                setIdResponsavel(e.target.value);
                                if (errors.idResponsavel) {
                                    setErrors((prev) => ({ ...prev, idResponsavel: '' }));
                                }
                            }}
                            displayEmpty
                            disablePortal
                            inputProps={{
                                style: { borderRadius: '10px' }
                            }}
                            MenuProps={{
                                disableScrollLock: true
                            }}
                            error={!!errors.idResponsavel}
                        >
                            <MenuItem value="" disabled>
                                Selecione o responsável
                            </MenuItem>
                            {responsaveis.map((responsavel) => (
                                <MenuItem key={responsavel._id} value={responsavel._id}>
                                    {responsavel.name} (CPF: {responsavel.cpf ? formatCPF(responsavel.cpf) : "Não disponível"})
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>

                </div>

                {alertMessage && (
                    <div className="text-red-500 mb-4">
                        {alertMessage}
                    </div>
                )}

                <hr className="border-t border-gray-300"/>

                <div className="flex justify-end space-x-4 mt-4">
                    <button
                        onClick={handleSave}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                    >
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
};

PopUpAddPatient.propTypes = {
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

export default PopUpAddPatient;
