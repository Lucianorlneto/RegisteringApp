import styled from 'styled-components/native';

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  margin: 8px;
  padding: 8px;
  background-color: white;
`;

export const ImageContainer = styled.View`
  width: 100px;
  height: 100px;
  justify-content: center;
  align-items: center;
  margin-top: 4px;
  margin-bottom: 4px;
  border-width: ${(props) => (props.avatarPath === '' && props.newImage === null ? '1px' : '0px')};
  align-self: center;
  border-radius: 10px;
`;

export const ButtonMenu = styled.View`
  justify-content: center;
  align-items: center;
  margin-top: 4px;
  margin-bottom: 4px;
  align-self: center;
`;

export const Button = styled.TouchableOpacity`
    background-color: lightgray;
    padding: 4px;
    border-radius: 3px;
    width: 100px;
    align-items: center;
    justify-content: center;
    margin: 4px;
    flex-direction: row;
`;

export const Field = styled.View`
    margin-top: 4px;
    margin-bottom: 4px;
`;

export const Label = styled.Text`
    font-size: 18px;
    margin-top: 4px;
    margin-bottom: 4px;
`;

export const DateButton = styled.TouchableOpacity`
    background-color: lightgray;
    padding: 4px;
    border-radius: 3px;
    align-items: center;
    justify-content: center;
    margin: 4px;
    flex-direction: row;
`;

export const SubmitButtonContainer = styled.View`
  bottom: 20px;
  position: absolute;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const SubmitButton = styled.TouchableOpacity`
  padding: 8px;
  elevation: 3;
  background-color: lightgray;
  border-radius: 3px;
  width: 150px;
  height: 50px;
  justify-content: center;
  align-items: center;
`;
