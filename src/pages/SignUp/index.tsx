import React, { useEffect, useState } from 'react';
import {
  Image, KeyboardAvoidingView, Platform, View, Keyboard, ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.png';

import {
  Container,
  Title,
  BackToSign,
  BackToSignText,
} from './styles';

const SignUp: React.FC = () => {
  const navigation = useNavigation();

  const [isVisibleBackToSign, setIsVisibleBackToSign] = useState(true);

  useEffect(() => {
    const keyboardShow = Keyboard.addListener('keyboardDidShow',
      () => setIsVisibleBackToSign(false));

    const keyboardHide = Keyboard.addListener('keyboardDidHide',
      () => setIsVisibleBackToSign(true));

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
            <Title>Crie sua conta</Title>
          </View>

          <Input name="name" icon="user" placeholder="Nome" />

          <Input name="email" icon="mail" placeholder="E-mail" />

          <Input name="password" icon="lock" placeholder="Senha" />

          <Button
            onPress={() => { console.log(''); }}
          >
            Criar conta
          </Button>
        </Container>
      </KeyboardAvoidingView>

      {isVisibleBackToSign && (
        <BackToSign onPress={() => navigation.navigate('SignIn')}>
          <Icon name="arrow-left" size={20} color="#fff" />
          <BackToSignText>
            Voltar para logon
          </BackToSignText>
        </BackToSign>
      )}
    </ScrollView>
  );
};

export default SignUp;
