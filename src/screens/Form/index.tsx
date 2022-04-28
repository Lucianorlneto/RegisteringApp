import React, { useEffect, useState } from 'react';
import moment from 'moment';
import FormData from 'form-data';

import {
  Image,
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { launchCamera } from 'react-native-image-picker';

import Toast from 'react-native-toast-message';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import DatePicker from 'react-native-date-picker';

import { useNavigation } from '@react-navigation/native';
import { Api } from '../../services';

import {
  Container,
  ImageContainer,
  ButtonMenu,
  Button,
  Field,
  Label,
  DateButton,
  SubmitButtonContainer,
  SubmitButton,
} from './styles';

const Form: React.FC<any> = ({ route }) => {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [avatarPath, setAvatarPath] = useState('');
  const [newImage, setNewImage] = useState(null);

  const [datePickerModal, setDatePickerModal] = useState(false);
  const { onEdit, user } = route.params;

  useEffect(() => {
    if (onEdit) {
      setName(user.name);
      setBirthDate(new Date(user.birthDate));
      setAvatarPath(user.avatarPath);
    }
  }, []);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Container
        style={{
          flex: 1, margin: 8, padding: 8, backgroundColor: 'white',
        }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ImageContainer avatarPath={avatarPath} newImage={newImage}>
          {(avatarPath === '' && newImage === null) ? <FontAwesome name="camera" size={70} /> : (newImage !== null) ? <Image style={{ width: 100, height: 100 }} source={{ uri: newImage.uri }} /> : <Image style={{ width: 100, height: 100 }} source={{ uri: avatarPath }} /> }
        </ImageContainer>
        <ButtonMenu>
          <Button onPress={() => {
            launchCamera({ maxWidth: 100, maxHeight: 100 }, (res) => {
              setNewImage(res.assets[0]);
            });
          }}
          >
            <Text>Abrir Camera</Text>
          </Button>
          <Button onPress={() => { setNewImage(null); setAvatarPath(''); }}>
            <Text>Remover Foto</Text>
          </Button>
        </ButtonMenu>
        <Field>
          <Label>Nome:</Label>
          <TextInput style={{ borderBottomWidth: 1, fontSize: 18 }} placeholder="Nome do usuário" value={name !== '' ? name : ''} onChangeText={(text) => setName(text)} />
        </Field>
        <Field>
          <Label>Data de nascimento:</Label>
          <DateButton style={{ flexDirection: 'row' }} onPress={() => setDatePickerModal(true)}>
            <Text style={{ marginRight: 8, fontSize: 18, color: 'black' }}>
              {birthDate !== '' ? moment(birthDate).format('DD/MM/yyyy') : 'Pressione para data de nascimento'}
            </Text>
            <FontAwesome style={{ alignSelf: 'center' }} name="calendar" size={18} color="black" />
          </DateButton>
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
        </Field>
        <SubmitButtonContainer>
          <SubmitButton

            onPress={() => {
              if (name === '' || birthDate === '') {
                return Alert.alert('Preencha o formulário', 'Por favor, preencha nome e data de nascimento.');
              }

              const form = new FormData();
              form.append('nome', name);
              form.append('data_nascimento', moment(birthDate).format('yyyy-MM-DD'));

              if (newImage !== null) {
                form.append('avatar', {
                  uri: newImage.uri,
                  name: newImage.fileName,
                  type: newImage.type,
                });
              }

              setLoading(true);
              if (onEdit) {
                if (user.avatarPath !== '' && avatarPath === '') {
                  form.append('avatar', 'remove');
                }

                return Api.updateUser(
                  user.id,
                  form,
                ).then((data) => {
                  Toast.show({
                    type: 'info',
                    text1: 'Usuário editado',
                  });
                  setLoading(false);
                }).catch((e) => {
                  Toast.show({
                    type: 'error',
                    text1: 'Ocorreu um erro',
                  });
                  setLoading(false);
                });
              }

              return Api.createUser(
                form,
              ).then((data) => {
                Toast.show({
                  type: 'success',
                  text1: 'Usuário cadastrado',
                });
                navigation.goBack();
                setLoading(false);
              }).catch((e) => {
                Toast.show({
                  type: 'error',
                  text1: 'Ocorreu um erro',
                });
                setLoading(false);
              });
            }}
          >
            {loading ? <ActivityIndicator size="large" /> : <Text>{onEdit ? 'Editar Usuário' : 'Cadastrar Usuário'}</Text>}
          </SubmitButton>
        </SubmitButtonContainer>
      </Container>
    </ScrollView>
  );
};

export default Form;
