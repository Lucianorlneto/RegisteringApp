import React from 'react';
import moment from 'moment';
import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// import { Container } from './styles';
interface User{
    data: {
        id: number;
        name: string;
        birthDate: string;
        avatarPictureName: string;
        avatarPath: string
    }
}

const ListItem: React.FC<User> = ({ data }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.push('Form', { onEdit: true, user: data })}
      style={{
        backgroundColor: 'white', borderRadius: 3, elevation: 3, margin: 8, padding: 8,
      }}
    >
      <Text>
        id:
        {' '}
        {data.id}
      </Text>
      <Text>
        Nome:
        {' '}
        {data.name}
      </Text>
      <Text>
        Data de nascimento:
        {' '}
        {moment(data.birthDate).format('DD/MM/yyyy')}
      </Text>
    </TouchableOpacity>
  );
};

export default ListItem;
