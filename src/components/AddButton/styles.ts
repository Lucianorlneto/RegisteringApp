import styled from 'styled-components/native';
import colors from '../../utils/styles/colors';

export const Container = styled.TouchableOpacity`
  position: absolute;
  bottom: 25px;
  right: 60px;
  width: 48px;
  height: 48px;
  background-color: lightgray;
  border-radius: 999px;
  justify-content: center;
  align-items: center;
  elevation: 3;
`;

export const Title = styled.Text`
    font-size: 30px;
`;
