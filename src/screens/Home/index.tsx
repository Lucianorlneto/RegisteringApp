import React, { useEffect, useState, useCallback } from 'react';
import {
  ActivityIndicator, ScrollView, View, RefreshControl, Text,
} from 'react-native';

import { useFocusEffect } from '@react-navigation/native';

import { Api } from '../../services';

import {
  Container, LoadingContainer, EmptyContainer, EmptyText1, EmptyText2,
} from './styles';
import { ListItem, AddButton } from '../../components';

const Home: React.FC = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  function getUsers() {
    setLoading(true);
    Api.getAllUsers().then((data) => {
      setUsers(data);
      setLoading(false);
    });
  }

  useEffect(() => {
    getUsers();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getUsers();
    }, []),
  );

  if (loading) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="large" />
      </LoadingContainer>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {users.length > 0 ? (
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          refreshControl={(
            <RefreshControl
              refreshing={loading}
              onRefresh={() => {
                getUsers();
              }}
            />
        )}
        >
          <Container>
            {users.map((user: any) => <ListItem key={user.id} data={user} getUsers={() => getUsers()} setLoading={(value) => setLoading(value)} />)}
          </Container>
        </ScrollView>
      ) : (
        <EmptyContainer>
          <EmptyText1>Nenhum usuário encontrato.</EmptyText1>
          <EmptyText2>Por favor, utilize o botão de + abaixo.</EmptyText2>
        </EmptyContainer>
      )}
      <AddButton onPress={() => navigation.push('Form', { onEdit: false })} />
    </View>
  );
};

export default Home;
