import { AUTHORIZATION_KEY } from "../../Constants/authorizationConstants";
import { removeItemStorage, setItemStorage, getItemStorage } from "./localStorageProxy";

// função que remove o token de autorização do localstorage
export const unsetAuthorizationToken = () => removeItemStorage(AUTHORIZATION_KEY);

// função que armazena o token de autorização no localstorage
export const setAuthorizationToken = (token: string) => {
    if(token){
        setItemStorage(AUTHORIZATION_KEY, token); //Evita que salve token vazio
    }
};
    

// função que obtem o token de autorização do localstorage
export const getAuthorizationToken = () => getItemStorage(AUTHORIZATION_KEY);
