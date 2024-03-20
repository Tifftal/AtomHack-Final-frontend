import { TextInput, Button, Group, PasswordInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import s from "./auth.module.scss";
import { Link } from "react-router-dom";
import { login } from "../../enteties/user/api";
import { useState } from "react";

const Auth = () => {

  const [error, setError] = useState<string | null>(null);
  const auth = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Неверный email"),
      password: (value) =>
        value.length > 5 ? null : "Пароль слишком короткий",
    },
  });

  const handleLogin = () => {
    login({
      email: auth.values.email,
      password: auth.values.password,
    })
      .then((data) => {
        console.log(data);
        setError(null);
      })
      .catch((error) => {
        if (error.response.status === 400) {
          setError("Неверные данные");
        }
      });
  };

  return (
    <div className={s.content}>
      <form onSubmit={auth.onSubmit(handleLogin)} className={s.form}>
        <p className={s.error}>{error}</p>
        <TextInput
          label="Email"
          withAsterisk
          placeholder="Введите свой email"
          {...auth.getInputProps("email")}
        />

        <PasswordInput
          mt="sm"
          withAsterisk
          label="Введите пароль"
          placeholder="Пароль"
          {...auth.getInputProps("password")}
        />

        <Group mt="md">
          <div className={s.suggest}>
            <p>Нет аккаунта?</p>
            <Button component={Link} to="/registration" variant="subtle">
              Зарегистрироваться
            </Button>
          </div>
          <Button style={{ width: "100%" }} type="submit">
            Войти
          </Button>
        </Group>
      </form>
    </div>
  );
};

export default Auth;
