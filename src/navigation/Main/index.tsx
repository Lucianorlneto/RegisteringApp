import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

import { Home, Form } from '../../screens';

const Main: React.FC = () => {
  const MainStack = createStackNavigator();

  return (
    <MainStack.Navigator>
      <MainStack.Screen name="Home" component={Home} options={{ title: 'Usuários', headerTitleAlign: 'center' }} />
      <MainStack.Screen name="Form" component={Form} options={({ route }) => ({ title: route.params.onEdit ? 'Editar' : 'Cadastrar', headerTitleAlign: 'center', ...TransitionPresets.SlideFromRightIOS })} />
    </MainStack.Navigator>
  );
};

export default Main;
