import React, { useState } from 'react';
import Banner from '../Components/Banner';
import { useHistory } from 'react-router-dom';

const PatientRegistration = () => {
  const [patients, setPatients] = useState([]);
  const [newPatientName, setNewPatientName] = useState('');
  const [editingPatient, setEditingPatient] = useState(null);
  const [editingName, setEditingName] = useState('');
  const history = useHistory();

  const handleAddPatient = () => {
    if (newPatientName.trim()) {
      const newPatient = { id: (patients.length + 1).toString(), nome: newPatientName };
      setPatients([...patients, newPatient]);
      setNewPatientName('');
    }
  };

  const handleEditPatient = (patient) => {
    setEditingPatient(patient);
    setEditingName(patient.nome);
  };

  const handleSaveEdit = () => {
    setPatients(patients.map(patient => patient.id === editingPatient.id ? { ...patient, nome: editingName } : patient));
    setEditingPatient(null);
    setEditingName('');
  };

  const handleDeletePatient = (id) => {
    setPatients(patients.filter(patient => patient.id !== id));
  };

  const handleViewPatients = () => {
    // Navega para a página Pacientes.jsx, passando o array de pacientes como state
    history.push('/Pacientes', { patients });
  };

  return (
    <div className= "min-h-screen bg-blue-500">
      <Banner name="Erick Saraiva" description="Psicopedagogo" />
      <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
        <div style={{ backgroundColor: '#fff', borderRadius: '10px', padding: '20px', width: '100%', maxWidth: '800px' }}>
            <h1 className='font-bold text-center text-3xl mb-2'>Registro de Pacientes</h1>
            <div style={{ marginBottom: '20px', textAlign: 'center' }}>
            <input 
                type="text" 
                value={newPatientName} 
                onChange={(e) => setNewPatientName(e.target.value)} 
                placeholder="Nome do novo paciente"
                style={{ backgroundColor: '#DCDCDC', marginRight: '10px', padding: '10px', borderRadius: '5px' }}
            />
            <button 
                onClick={handleAddPatient}
                style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: '#4CAF50', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
            >
                Registrar Paciente
            </button>
            </div>
            {patients.map(patient => (
            <div key={patient.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                {editingPatient && editingPatient.id === patient.id ? (
                <>
                    <input 
                    type="text" 
                    value={editingName} 
                    onChange={(e) => setEditingName(e.target.value)} 
                    style={{ marginRight: '10px', padding: '10px', borderRadius: '5px' }}
                    />
                    <button 
                    onClick={handleSaveEdit}
                    style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: '#4CAF50', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                    >
                    Salvar
                    </button>
                </>
                ) : (
                <>
                    <span>{patient.nome} (ID: {patient.id})</span>
                    <div>
                    <button 
                        onClick={() => handleEditPatient(patient)}
                        style={{ marginRight: '10px', padding: '10px 20px', fontSize: '16px', backgroundColor: '#2196F3', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                    >
                        Editar
                    </button>
                    <button 
                        onClick={() => handleDeletePatient(patient.id)}
                        style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: '#f44336', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                    >
                        Deletar
                    </button>
                    </div>
                </>
                )}
            </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PatientRegistration;
