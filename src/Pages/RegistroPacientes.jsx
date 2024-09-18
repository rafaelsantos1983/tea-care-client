import React, { useEffect, useState } from "react";
import Banner from "../Components/Banner";
import axios from "axios";
import PopUpConfirmation from "../Components/PopUpConfirmation";
import PopUpEditionPatient from "../Components/PopUpEditionPatient";
import PopUpAddPatient from "../Components/PopUpAddPatient";

// JA TEM REQUEST DE TOKEN FOI CONFIG DE AXIOS GLOBAL
const api = axios.create({
  baseURL: "http://localhost:3002",
  timeout: 1000,
});

const PatientRegistration = () => {
  const [patients, setPatients] = useState([]);
  const [editingPatient, setEditingPatient] = useState(null);
  const [popUpConfirm, setPopUpConfirm] = useState(false);
  const [popUpEdit, setPopUpEdit] = useState(false);
  const [popUpAdd, setPopUpAdd] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState(null);

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

  const handleAddPatient = async () => {
    setPopUpAdd(false);

    //carregando os pacientes atualizados após a edição
    try {
      const response = await api.get("/api/therapeutic-activity/patients");
      setPatients(response.data);
    } catch (error) {
      console.error("Erro ao carregar pacientes:", error);
    }
  };

  const handleEditPatient = (id) => {
    const patientToEdit = patients.find((patient) => patient.id === id);
    setEditingPatient(patientToEdit);
    setPopUpEdit(true);
  };

  const handleSaveEdit = async () => {
    setEditingPatient(null);
    setPopUpEdit(false);

    //carregando os pacientes atualizados após a edição
    try {
      const response = await api.get("/api/therapeutic-activity/patients");
      setPatients(response.data);
    } catch (error) {
      console.error("Erro ao carregar pacientes:", error);
    }
  };

  const handleDeletePatient = async (id) => {
    try {
      await api.delete(`/api/therapeutic-activity/patients/${id}`);
      const response = await api.get("/api/therapeutic-activity/patients");
      setPatients(response.data);
    } catch (error) {
      console.error("Erro ao deletar paciente:", error);
    }
  };

  const confirmDeletion = (id) => {
    setPatientToDelete(id);
    setPopUpConfirm(true);
  };

  const handleConfirmDelete = () => {
    handleDeletePatient(patientToDelete);
    setPopUpConfirm(false);
    setPatientToDelete(null);
  };

  const handleCancel = () => {
    setPopUpConfirm(false);
    setPopUpEdit(false);
    setPopUpAdd(false);
    setPatientToDelete(null);
    setEditingPatient(null);
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
          <h1 className="font-bold text-center text-3xl mb-5">Pacientes</h1>
          <div style={{ marginBottom: "20px", textAlign: "end" }}>
            <button
              onClick={() => {
                setPopUpAdd(true);
              }}
              className="w-[181px] bg-green-500 hover:bg-green-600"
              style={{
                padding: "10px 20px",
                fontSize: "16px",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Adicionar
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
                      onClick={() => handleEditPatient(patient.id)}
                      className="bg-blue-500 hover:bg-blue-600"
                      style={{
                        marginRight: "10px",
                        padding: "10px 20px",
                        fontSize: "16px",
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
                      className="bg-red-500 hover:bg-red-800"
                      style={{
                        padding: "10px 20px",
                        fontSize: "16px",
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
      {popUpConfirm && (
        <PopUpConfirmation
          message="Tem certeza que deseja deletar este paciente?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancel}
        />
      )}
      {popUpEdit && editingPatient && (
        <PopUpEditionPatient
          patientId={editingPatient.id}
          onConfirm={handleSaveEdit}
          onCancel={handleCancel}
        />
      )}
      {popUpAdd && (
        <PopUpAddPatient onConfirm={handleAddPatient} onCancel={handleCancel} />
      )}
    </div>
  );
};

export default PatientRegistration;
