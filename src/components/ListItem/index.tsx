import React from 'react';
import moment from 'moment';
import { Text, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Api } from '../../services';

import {
  Container, Field, Label, Value,
} from './styles';

interface User{
    data: {
        id: number;
        name: string;
        birthDate: string;
        avatarPictureName: string;
        avatarPath: string
    }
    getUsers: () => void;
    setLoading: (value: boolean) => void;
}

const ListItem: React.FC<User> = ({ data, getUsers, setLoading }) => {
  const navigation = useNavigation();

  return (
    <Container
      onPress={() => navigation.push('Form', { onEdit: true, user: data })}
    >
      <Field>
        <Label>
          id:
        </Label>
        <Value>
          {data.id}
        </Value>
      </Field>
      <Field>
        <Label>
          Nome:
        </Label>
        <Value>
          {data.name}
        </Value>
      </Field>
      <Field>
        <Label>
          Nascimento:
        </Label>
        <Value>
          {moment(data.birthDate).format('DD/MM/yyyy')}
        </Value>
      </Field>
      <TouchableOpacity
        style={{ alignSelf: 'flex-end' }}
        onPress={() => {
          Alert.alert(
            'Remover usuário',
            `Deseja realmente remover o usuário ${data.name}?`,
            [
              {
                text: 'NÂO',
                style: 'cancel',
              },
              {
                text: 'SIM',
                onPress: () => {
                  setLoading(true);
                  Api.deleteUser(data.id).then((res) => {
                    getUsers();
                    Toast.show({
                      type: 'info',
                      text1: res,
                    });
                  });
                },
              },
            ],
          );
        }}
      >
        <FontAwesome name="trash" size={24} />
      </TouchableOpacity>
    </Container>
  );
};

export default ListItem;
