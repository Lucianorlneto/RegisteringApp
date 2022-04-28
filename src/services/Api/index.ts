import axios from 'axios';
import { Alert } from 'react-native';

const API = axios.create({
  baseURL: 'https://auth-api-laravel.herokuapp.com',
  // baseURL: 'http://10.0.2.2:8000',
});

const version = 'v1';

function handleReponse(status: number, data: any) {
  if (status >= 400) {
    return Alert.alert('Erro ao conectar-se', 'Ocorreu uma falha de conexão com a API.');
  }

  return data;
}

const Api = {
  async getAllUsers() {
    const response = await API.get(
      `${version}/users`,
    );

    const parsedData = response.data.data.map((user: any) => ({
      id: user.id,
      name: user.nome,
      birthDate: user.data_nascimento,
      avatarPictureName: user.avatar !== null ? user.avatar.original_nome : '',
      avatarPath: user.avatar !== null ? API.getUri() + user.avatar.path : '',
    }));

    return handleReponse(response.status, parsedData);
  },

  async createUser(data: any) {
    const response = await API.post(`${version}/users/create`, data, {
      headers: {
        accept: 'application/json',
        'Content-Type': 'multipart/form-data;',
      },
    });

    return handleReponse(response.status, response.data.data);
  },

  async updateUser(id: number, data: any) {
    const response = await API.post(`${version}/users/update/${id}`, data, {
      headers: {
        accept: 'application/json',
        'Content-Type': 'multipart/form-data;',
      },
    });

    return handleReponse(response.status, response.data.data);
  },

  async deleteUser(id: number) {
    const response = await API.delete(`${version}/users/delete/${id}`);

    return handleReponse(response.status, response.data.data);
  },
};

export default Api;
