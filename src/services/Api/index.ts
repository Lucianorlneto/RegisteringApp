import axios from 'axios';
import { Alert } from 'react-native';

const API = axios.create({
  baseURL: 'https://auth-api-laravel.herokuapp.com',
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
};

export default Api;
