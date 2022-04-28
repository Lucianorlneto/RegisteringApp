import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

import { Container, Title } from './styles';

interface Props {
    onPress: () => void;
}

const AddButton: React.FC<Props> = ({ onPress }) => (
  <Container
    onPress={onPress}
  >
    <Title>+</Title>
  </Container>
);

export default AddButton;
