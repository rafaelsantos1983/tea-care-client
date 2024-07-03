import React, { useEffect, useState } from "react";
import Banner from "../Components/Banner";
import axios from "axios";
import PopUpConfirmation from "../Components/PopUpConfirmation";

const api = axios.create({
  baseURL: "http://localhost:3002",
  timeout: 1000,
});

const PatientRegistration = () => {
  const [patients, setPatients] = useState([]);
  const [newPatientName, setNewPatientName] = useState("");
  const [editingPatient, setEditingPatient] = useState(null);
  const [editingName, setEditingName] = useState("");
  const [popupVisible, setPopupVisible] = useState(false); // Estado para controlar a visibilidade do pop-up
  const [patientToDelete, setPatientToDelete] = useState(null); // Estado para armazenar o paciente a ser deletado

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/api/therapeutic-activity/patients");
        setPatients(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleAddPatient = () => {
    if (newPatientName.trim()) {
      const newPatient = {
        id: (patients.length + 1).toString(),
        nome: newPatientName,
      };
      setPatients([...patients, newPatient]);
      setNewPatientName("");
    }
  };

  const handleEditPatient = (patient) => {
    setEditingPatient(patient);
    setEditingName(patient.nome);
  };

  const handleSaveEdit = () => {
    setPatients(
      patients.map((patient) =>
        patient.id === editingPatient.id
          ? { ...patient, nome: editingName }
          : patient
      )
    );
    setEditingPatient(null);
    setEditingName("");
  };

  const handleDeletePatient = async (id) => {
    try {
      await api.delete(`/api/therapeutic-activity/patients/${id}`);
      setPatients(patients.filter((patient) => patient.id !== id));
    } catch (error) {
      console.error("Erro ao deletar paciente:", error);
    }
  };

  const confirmDeletion = (id) => {
    setPatientToDelete(id);
    setPopupVisible(true);
  };

  const handleConfirmDelete = () => {
    handleDeletePatient(patientToDelete);
    setPopupVisible(false);
    setPatientToDelete(null);
  };

  const handleCancelDelete = () => {
    setPopupVisible(false);
    setPatientToDelete(null);
  };

  return (
    <div className="min-h-screen bg-blue-500">
      <Banner name="Erick Saraiva" description="Psicopedagogo" />
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <div
          style={{
            backgroundColor: "#fff",
            borderRadius: "10px",
            padding: "20px",
            width: "100%",
            maxWidth: "800px",
          }}
        >
          <h1 className="font-bold text-center text-3xl mb-2">
            Registro de Pacientes
          </h1>
          <div style={{ marginBottom: "20px", textAlign: "center" }}>
            <input
              type="text"
              value={newPatientName}
              onChange={(e) => setNewPatientName(e.target.value)}
              placeholder="Nome do novo paciente"
              style={{
                backgroundColor: "#DCDCDC",
                marginRight: "10px",
                padding: "10px",
                borderRadius: "5px",
              }}
            />
            <button
              onClick={handleAddPatient}
              style={{
                padding: "10px 20px",
                fontSize: "16px",
                backgroundColor: "#4CAF50",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Registrar Paciente
            </button>
          </div>
          {patients.map((patient) => (
            <div
              key={patient.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              {editingPatient && editingPatient.id === patient.id ? (
                <>
                  <input
                    type="text"
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    style={{
                      marginRight: "10px",
                      padding: "10px",
                      borderRadius: "5px",
                    }}
                  />
                  <button
                    onClick={handleSaveEdit}
                    style={{
                      padding: "10px 20px",
                      fontSize: "16px",
                      backgroundColor: "#4CAF50",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Salvar
                  </button>
                </>
              ) : (
                <>
                  <span>
                    {patient.name} (CPF: {patient.cpf})
                  </span>
                  <div>
                    <button
                      onClick={() => handleEditPatient(patient)}
                      style={{
                        marginRight: "10px",
                        padding: "10px 20px",
                        fontSize: "16px",
                        backgroundColor: "#2196F3",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => confirmDeletion(patient.id)}
                      style={{
                        padding: "10px 20px",
                        fontSize: "16px",
                        backgroundColor: "#f44336",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
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
      {popupVisible && (
        <PopUpConfirmation
          message="Tem certeza que deseja deletar este paciente?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default PatientRegistration;
