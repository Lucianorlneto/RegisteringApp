import React, { useEffect, useState } from 'react';
import {
  Image, ScrollView, Text, View, TextInput, TouchableOpacity,
} from 'react-native';

import DatePicker from 'react-native-date-picker';

// import { Container } from './styles';

const Form: React.FC<any> = ({ route }) => {
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [avatarPictureName, setAvatarPictureName] = useState('');
  const [avatarPath, setAvatarPath] = useState('');

  const [datePickerModal, setDatePickerModal] = useState(false);

  useEffect(() => {
    const { onEdit, user } = route.params;
    if (onEdit) {
      setName(user.name);
      setBirthDate(new Date(user.birthDate));
      setAvatarPictureName(user.avatarPictureName);
      setAvatarPath(user.avatarPath);
    }
  }, []);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{
        flex: 1, margin: 8, padding: 8, backgroundColor: 'white',
      }}
      >
        <View style={{
          width: '100%', height: 110, justifyContent: 'center', alignItems: 'center', marginVertical: 4,
        }}
        >
          {avatarPath !== '' && <Image style={{ width: 100, height: 100 }} source={{ uri: avatarPath }} />}
        </View>

        <View style={{ marginVertical: 4 }}>
          <Text>Nome:</Text>
          <TextInput style={{ borderBottomWidth: 1, fontSize: 18 }} placeholder="Nome do usuário" value={name !== '' ? name : ''} />
        </View>
        <View style={{ marginVertical: 4 }}>
          <Text>Data de nascimento:</Text>
          <TouchableOpacity onPress={() => setDatePickerModal(true)}>
            <Text>{birthDate !== 'Escolha a data de nascimento' ? birthDate.toLocaleDateString('pt-BR') : ''}</Text>
          </TouchableOpacity>
          {/* <DatePicker
            modal
            open={datePickerModal}
            date={date}
            onConfirm={(date) => {
              setOpen(false);
              setDate(date);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          /> */}
        </View>
      </View>
    </ScrollView>
  );
};

export default Form;
