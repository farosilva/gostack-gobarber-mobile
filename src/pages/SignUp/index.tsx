import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  View,
  Keyboard,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import Input from '../../components/Input';
import Button from '../../components/Button';

import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';

import logoImg from '../../assets/logo.png';

import { Container, Title, BackToSign, BackToSignText } from './styles';
import Loading from '../../components/Loading';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const emailInputForm = useRef<TextInput>(null);
  const passwordInputForm = useRef<TextInput>(null);

  const navigation = useNavigation();

  const [isVisibleBackToSign, setIsVisibleBackToSign] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSignUp = useCallback(
    async (data: SignUpFormData) => {
      setLoading(true);
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('E-mail inválido'),
          password: Yup.string().min(6, 'No mínimo 6 digítos'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/users', data);

        Alert.alert(
          'Cadastro realizado com sucesso!',
          'Você já pode realizar logon na aplicação.',
        );

        setLoading(false);
        navigation.navigate('SignIn');
      } catch (err) {
        setLoading(false);
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        Alert.alert(
          'Erro no cadastro',
          'Ocorreu um erro ao fazer o cadastro, tente novamente',
        );
      }
    },
    [navigation],
  );

  useEffect(() => {
    const keyboardShow = Keyboard.addListener('keyboardDidShow', () =>
      setIsVisibleBackToSign(false),
    );

    const keyboardHide = Keyboard.addListener('keyboardDidHide', () =>
      setIsVisibleBackToSign(true),
    );

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

            <Form ref={formRef} onSubmit={handleSignUp}>
              <Input
                name="name"
                icon="user"
                placeholder="Nome"
                autoCapitalize="words"
                returnKeyType="next"
                onSubmitEditing={() => {
                  emailInputForm.current?.focus();
                }}
              />

              <Input
                ref={emailInputForm}
                name="email"
                icon="mail"
                placeholder="E-mail"
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordInputForm.current?.focus();
                }}
              />

              <Input
                ref={passwordInputForm}
                name="password"
                icon="lock"
                placeholder="Senha"
                secureTextEntry
                textContentType="newPassword"
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />
            </Form>

            {loading ? (
              <Loading />
            ) : (
              <Button onPress={() => formRef.current?.submitForm()}>
                Criar conta
              </Button>
            )}
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      {isVisibleBackToSign && (
        <BackToSign onPress={() => navigation.navigate('SignIn')}>
          <Icon name="arrow-left" size={20} color="#fff" />
          <BackToSignText>Voltar para logon</BackToSignText>
        </BackToSign>
      )}
    </>
  );
};

export default SignUp;
