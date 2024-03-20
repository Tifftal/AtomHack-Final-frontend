import { useState } from 'react';
import { Stepper, Button, Group, TextInput, PasswordInput, Code } from '@mantine/core';
import { useForm } from '@mantine/form';
import s from './Registration.module.scss';

const Registration = () => {
  const [active, setActive] = useState(0);

  const form = useForm({
    initialValues: {
      name: '',
      surname: '',
      middlename: '',
      role: '',
      password: '',
      confirmPassword: '',
      email: '',
      code: '',
    },

    validate: (values) => {
      if (active === 0) {
        return {
          name:
            values.name.trim().length < 2
              ? 'Имя должно содежать не менее 2х символов'
              : null,
          surname:
            values.surname.length < 2 ? 'Фамилия должна содержать не менее 2х символов' : null,
          middlename:
            values.middlename.length < 2 ? 'Отчество должно содержать не менее 2х символов' : null,
          role:
            values.role.length < 2 ? 'Должность должна содержать не менее 2х символов' : null,
        };
      }

      if (active === 1) {
        return {
          email: /^\S+@\S+$/.test(values.email) ? null : 'Некорректный email',
          password:
            values.password.length < 6 ? true : null,
          confirmPassword:
            values.password !== values.confirmPassword ? 'Пароли не совпадают' : null,
        };
      }

      if (active === 2) {
        return {
          code:
            values.code.trim().length < 6 ? "Неверный код" : null,
        };
      }

      return {};
    },
  });

  const nextStep = () =>
    setActive((current) => {
      if (form.validate().hasErrors) {
        return current;
      }
      return current < 3 ? current + 1 : current;
    });

  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <div className={s.registration}>
      <div className={s.nav}>
        <p>Уже есть аккаунт?</p>
        <Button variant="subtle">Войти</Button>
      </div>
      <div className={s.stepper}>
        <h1>Создание нового аккаунта</h1>
        <Stepper active={active} classNames={{ root: s.root, content: s.content }}>
          <Stepper.Step label="Первый шаг" description="Основные данные">
            <TextInput
              label="Фамилия"
              placeholder="Иванов"
              withAsterisk
              {...form.getInputProps('surname')}
            />
            <TextInput
              label="Имя"
              placeholder="Иван"
              withAsterisk
              {...form.getInputProps('name')}
            />
            <TextInput
              label="Отчетсво"
              placeholder="Иванович"
              {...form.getInputProps('middlename')}
            />
            <TextInput
              label="Должность"
              placeholder="Ведущий инженер"
              {...form.getInputProps('role')}
            />
          </Stepper.Step>

          <Stepper.Step label="Второй шаг" description="Настройка данных аккаунта">
            <TextInput mt="md" label="Email" placeholder="Email" {...form.getInputProps('email')} />
            <PasswordInput
              label="Пароль"
              placeholder="Пароль"
              description="Не менее 6ти символов"
              {...form.getInputProps('password')}
            />
            <PasswordInput
              label="Повторите пароль"
              placeholder="Повторите пароль"
              {...form.getInputProps('confirmPassword')}
            />
          </Stepper.Step>

          <Stepper.Step label="Третий шаг" description="Подтверждение">
            <h2>Код подтверждения отправлен на Вашу почту: {form.values.email}</h2>
            <TextInput
              label="Введите код подтверждения"
              placeholder="000000"
              {...form.getInputProps('code')}
              className={s.code}
            />
          </Stepper.Step>
          <Stepper.Completed>
            <h2>Вы успешно зарегестрировались!</h2>
            <Button variant='light' className={s.logbtn}>Войти</Button>
            <Code block mt="xl">
              {JSON.stringify(form.values, null, 2)}
            </Code>
          </Stepper.Completed>
        </Stepper>

        <Group justify="flex-end" mt="xl">
          {active !== 0 && (
            <Button variant="default" onClick={prevStep}>
              Назад
            </Button>
          )}
          {active !== 3 && <Button onClick={nextStep}>Дальше</Button>}
        </Group>
      </div>
      <div></div>
    </div>
  );
}

export default Registration;