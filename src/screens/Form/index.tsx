import React, { useEffect, useState } from 'react';
import moment from 'moment';
import {
  Image, ScrollView, Text, View, TextInput, TouchableOpacity,
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import DatePicker from 'react-native-date-picker';

// import { Container } from './styles';

const Form: React.FC<any> = ({ route }) => {
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [avatarPictureName, setAvatarPictureName] = useState('');
  const [avatarPath, setAvatarPath] = useState('');

  const [datePickerModal, setDatePickerModal] = useState(false);
  const { onEdit, user } = route.params;

  useEffect(() => {
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
          <TextInput style={{ borderBottomWidth: 1, fontSize: 18 }} placeholder="Nome do usuário" value={name !== '' ? name : ''} onChangeText={(text) => setName(text)} />
        </View>
        <View style={{ marginVertical: 4 }}>
          <Text>Data de nascimento:</Text>
          <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => setDatePickerModal(true)}>
            <Text style={{ marginRight: 8, fontSize: 18 }}>
              {birthDate !== '' ? moment(birthDate).format('DD/MM/yyyy') : 'Escolha a data de nascimento'}
            </Text>
            <FontAwesome style={{ alignSelf: 'center' }} name="calendar" size={18} />
          </TouchableOpacity>
          <DatePicker
            modal
            open={datePickerModal}
            date={birthDate === '' ? new Date() : birthDate}
            mode="date"
            onConfirm={(date) => {
              setDatePickerModal(false);
              setBirthDate(date);
            }}
            onCancel={() => {
              setDatePickerModal(false);
            }}
          />
        </View>
        <View style={{
          bottom: 20, position: 'absolute', width: '100%', justifyContent: 'center', alignItems: 'center',
        }}
        >
          <TouchableOpacity
            style={{
              padding: 8, elevation: 3, backgroundColor: 'gray', borderRadius: 3,
            }}
            onPress={() => console.log('botão')}
          >
            <Text>{onEdit ? 'Editar Usuário' : 'Cadastrar Usuário'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Form;
