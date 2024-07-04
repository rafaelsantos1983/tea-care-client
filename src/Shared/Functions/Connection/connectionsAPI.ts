import axios from "axios";
import { MethodsEnum } from "../../enums/methods.enum";
import { ERROR_ACCESS_DENIED, ERROR_CONNECTION } from "../../Constants/errosStatus";


//Metodos de conexão da API
export default class ConnectionAPI {
    static async call<T>(url: string, method: MethodsEnum, body?: Object): Promise<T> {
        switch (method) {
            case MethodsEnum.GET:
                return (await axios.get<T>(url)).data;
            case MethodsEnum.DELETE:
                return (await axios.delete<T>(url)).data;
            case MethodsEnum.POST:
                return (await axios.post<T>(url, body)).data;
            case MethodsEnum.PUT:
                return (await axios.put<T>(url, body)).data;
            case MethodsEnum.PATCH:
                return (await axios.patch<T>(url, body)).data;
            default:
                throw new Error(`Unsupported method: ${method}`);
        }
    }

    static async connect<T>(url: string, method: MethodsEnum, body?: Object): Promise<T> {
        try {
            return await ConnectionAPI.call<T>(url, method, body);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                switch (error.response.status) {
                    case 403:
                        throw new Error(ERROR_ACCESS_DENIED);
                    default:
                        throw new Error(ERROR_CONNECTION);
                }
            } else {
                throw new Error('Erro desconhecido!');
            }
        }
    }
}

//EXPORTANDO AS FUNÇÕES DA API

export const connectionAPIGet = async <T>(url: string): Promise<T> => {
    return ConnectionAPI.connect<T>(url, MethodsEnum.GET);
};

export const connectionAPIPost = async <T>(url: string, body: any): Promise<T> => {
    return ConnectionAPI.connect<T>(url, MethodsEnum.POST, body);
};

export const connectionAPIDelete = async <T>(url: string): Promise<T> => {
    return ConnectionAPI.connect<T>(url, MethodsEnum.DELETE);
};

export const connectionAPIPut = async <T>(url: string, body: any): Promise<T> => {
    return ConnectionAPI.connect<T>(url, MethodsEnum.PUT, body);
};

export const connectionAPIPatch = async <T>(url: string, body: any): Promise<T> => {
    return ConnectionAPI.connect<T>(url, MethodsEnum.PATCH, body);
};