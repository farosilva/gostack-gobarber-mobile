import React, {
  useEffect, useState, useRef, useCallback,
} from 'react';
import {
  Image, KeyboardAvoidingView, Platform, View, Keyboard, ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

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
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();

  const [isVisibleBackToSign, setIsVisibleBackToSign] = useState(true);

  const handleSubmit = useCallback((data: object) => {
    console.log(data);
  }, []);

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
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <Container>
            <Image source={logoImg} />

            {/* View - Permitir animação */}
            <View>
              <Title>Crie sua conta</Title>
            </View>

            <Form ref={formRef} onSubmit={handleSubmit}>
              <Input name="name" icon="user" placeholder="Nome" />
              <Input name="email" icon="mail" placeholder="E-mail" />
              <Input name="password" icon="lock" placeholder="Senha" />
            </Form>

            <Button
              onPress={() => formRef.current?.submitForm()}
            >
              Criar conta
            </Button>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      {isVisibleBackToSign && (
        <BackToSign onPress={() => navigation.navigate('SignIn')}>
          <Icon name="arrow-left" size={20} color="#fff" />
          <BackToSignText>
            Voltar para logon
          </BackToSignText>
        </BackToSign>
      )}
    </>
  );
};

export default SignUp;
