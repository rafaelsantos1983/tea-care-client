import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { getItemStorage, removeItemStorage } from './Shared/Functions/Connection/localStorageProxy';

// Rota protegida para verificar o token
const ProtectedRoute = ({ children }) => {
  const token = getItemStorage('accessToken');  // Consistência no uso da função

  if (!token) {
    // Redireciona para a página de login se o token não estiver presente
    return <Navigate to="/" />;
  }

  // Caso o token esteja presente, renderiza o conteúdo da rota
  return children;
};

// Configura o interceptor global do Axios
axios.interceptors.request.use(
  (config) => {
    const accessToken = getItemStorage('accessToken');  // Consistência no uso da função
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para lidar com respostas de erro (token expirado)
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      removeItemStorage('accessToken');  // Remove o token expirado
      window.location.href = '/';  // Redireciona para o login
    }
    return Promise.reject(error);
  }
);

export default ProtectedRoute;
