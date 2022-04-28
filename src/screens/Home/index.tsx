import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator, ScrollView, View,
} from 'react-native';

import { Api } from '../../services';

// import { Container } from './styles';
import { ListItem } from '../../components';

const Home: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    Api.getAllUsers().then((data) => {
      setUsers(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ margin: 8 }}>
        {users.map((user: any) => <ListItem key={user.id} data={user} />)}
      </View>
    </ScrollView>
  );
};

export default Home;
