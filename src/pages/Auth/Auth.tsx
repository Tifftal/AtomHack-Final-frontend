import { TextInput, Button, Group, PasswordInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import s from "./auth.module.scss"
const Auth = () => {

  const auth = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
        email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Неверный email'),
        password: (value) => (value.length > 5 ? null : 'Пароль слишком короткий'),
    },
  });
  return (
    <div className={s.content}>
      <form className={s.form}>
        <TextInput
          label="Email"
          placeholder="Введите свой email"
          {...auth.getInputProps("email")}
        />

        <PasswordInput
          mt="sm"
          label="Введите пароль"
          placeholder="Пароль"
          {...auth.getInputProps("password")}
        />

        <Group justify="flex-end" mt="md">
          <Button type="submit">Войти</Button>
        </Group>
      </form>
    </div>
  );
};

export default Auth;
