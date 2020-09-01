import React, { useEffect, useState } from 'react';
import {
  Image, KeyboardAvoidingView, Platform, View, Keyboard, ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.png';

import {
  Container,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccountButton,
  CreateAccountButtonText,
} from './styles';

const SignIn: React.FC = () => {
  const [isVisibleCreateAccountButton, setIsVisibleCreateAccountButton] = useState(true);

  useEffect(() => {
    const keyboardShow = Keyboard.addListener('keyboardDidShow',
      () => setIsVisibleCreateAccountButton(false));

    const keyboardHide = Keyboard.addListener('keyboardDidHide',
      () => setIsVisibleCreateAccountButton(true));

    return () => {
      keyboardShow.remove();
      keyboardHide.remove();
    };
  }, []);

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ flex: 1 }}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <Container>
          <Image source={logoImg} />

          {/* View - Permitir animação */}
          <View>
            <Title>Faça seu logon</Title>
          </View>

          <Input name="email" icon="mail" placeholder="E-mail" />
          <Input name="password" icon="lock" placeholder="Senha" />

          <Button
            onPress={() => { console.log(''); }}
          >
            Entrar
          </Button>

          <ForgotPassword onPress={() => { console.log(''); }}>
            <ForgotPasswordText>Esqueceu sua senha?</ForgotPasswordText>
          </ForgotPassword>
        </Container>
      </KeyboardAvoidingView>

      {isVisibleCreateAccountButton && (
        <CreateAccountButton onPress={() => { console.log(''); }}>
          <Icon name="log-in" size={20} color="#ff9000" />
          <CreateAccountButtonText>
            Criar uma conta
          </CreateAccountButtonText>
        </CreateAccountButton>
      )}
    </ScrollView>
  );
};

export default SignIn;
