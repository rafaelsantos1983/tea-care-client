import React, { useEffect, useState } from "react";
import Banner from "../Components/Banner";
import axios from "axios";
import PopUpConfirmation from "../Components/PopUpConfirmation";
import User_PopUpEdition from "../Components/User_PopUpEdition";
import User_PopUpAdd from "../Components/User_PopUpAdd";

// Configuração do Axios para a API
const api = axios.create({
  baseURL: "http://localhost:3001", // Trocar para a porta correta do serviço de usuários
  timeout: 1000,
});

const UserRegistration = () => {
  // Estados do componente
  const [Users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [popUpConfirm, setPopUpConfirm] = useState(false);
  const [popUpEdit, setPopUpEdit] = useState(false);
  const [userPopUpAdd, setUserPopUpAdd] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  // Faz o GET no backend para carregar os usuários
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/api/config/users"); // Trocar para a rota correta de usuários
        setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // Função para adicionar um novo usuário
  const handleAddUser = async () => {
    setUserPopUpAdd(false);
    try {
      const response = await api.get("/api/config/users"); 
      setUsers(response.data);
    } catch (error) {
      console.error("Erro ao carregar usuários:", error);
    }
  };

  // Função para iniciar a edição de um usuário
  const handleEditUser = (id) => {
    const userToEdit = Users.find((User) => User.id === id);
    setEditingUser(userToEdit);
    setPopUpEdit(true);
  };

  // Função para salvar a edição de um usuário
  const handleSaveEdit = async () => {
    setEditingUser(null);
    setPopUpEdit(false);
    try {
      const response = await api.get("/api/config/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Erro ao carregar usuários:", error);
    }
  };

  // Função para deletar um usuário
  const handleDeleteUser = async (id) => {
    try {
      await api.delete(`/api/config/users/${id}`);
      const response = await api.get("/api/config/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
    }
  };

  // Função para confirmar a deleção de um usuário
  const confirmDeletion = (id) => {
    setUserToDelete(id);
    setPopUpConfirm(true);
  };

  // Função para confirmar a deleção após confirmação
  const handleConfirmDelete = () => {
    handleDeleteUser(userToDelete);
    setPopUpConfirm(false);
    setUserToDelete(null);
  };

  // Função para cancelar qualquer ação de pop-up
  const handleCancel = () => {
    setPopUpConfirm(false);
    setPopUpEdit(false);
    setUserPopUpAdd(false);
    setUserToDelete(null);
    setEditingUser(null);
  };

  return (
    // Fundo azul
    <div className="min-h-screen bg-blue-500">
      {/* Banner amarelo */}
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
          {/* Título */}
          <h1 className="font-bold text-center text-3xl mb-5">
            Registro de usuários
          </h1>
          {/* Botão de Registrar */}
          <div style={{ marginBottom: "20px", textAlign: "center" }}>
            <button
              onClick={() => setUserPopUpAdd(true)}
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
              Registrar usuário
            </button>
          </div>
          {/* Lista de usuários */}
          {Users.map((User) => (
            <div
              key={User.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              {editingUser && editingUser.id === User.id ? (
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
              ) : (
                <>
                  <span>
                    {User.name} (CPF: {User.cpf})
                  </span>
                  <div>
                    <button
                      onClick={() => handleEditUser(User.id)}
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
                      onClick={() => confirmDeletion(User.id)}
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
      {/* Pop-ups de confirmação, edição e adição */}
      {popUpConfirm && (
        <PopUpConfirmation
          message="Tem certeza que deseja deletar este usuário?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancel}
        />
      )}
      {popUpEdit && editingUser && (
        <User_PopUpEdition
          UserId={editingUser.id}
          onConfirm={handleSaveEdit}
          onCancel={handleCancel}
        />
      )}
      {userPopUpAdd && (
        <User_PopUpAdd
          onConfirm={handleAddUser}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default UserRegistration;
