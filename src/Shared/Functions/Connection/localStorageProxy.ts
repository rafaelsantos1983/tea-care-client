
//Função para salvar diretamente no localstorage
//funções de manipulação de armazenamento local do módulo localStorageProxy.
export const setItemStorage = (key: string, value: string) => localStorage.setItem(key, value); //coloca algo no local storage

export const removeItemStorage = (key: string) => localStorage.removeItem(key); // remove algo do local storage

export const getItemStorage = (key: string) => localStorage.getItem(key); // pega item do local storage


