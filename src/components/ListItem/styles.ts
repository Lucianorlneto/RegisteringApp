import styled from 'styled-components/native';
import colors from '../../utils/styles/colors';

export const Container = styled.TouchableOpacity`
  background-color: white;
  border-radius: 3px;
  elevation: 3;
  margin: 8px;
  padding: 8px;
`;

export const Field = styled.View`
    flex-direction: row;
`;

export const Label = styled.Text`
    font-size: 18px;
`;

export const Value = styled.Text`
    margin-left: 4px;
    font-size: 14px;
    text-align: center;
    align-items: center;
    justify-content: center;
    align-self: flex-end;
`;
