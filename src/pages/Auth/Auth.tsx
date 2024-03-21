import { TextInput, Button, Group, PasswordInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import s from "./auth.module.scss";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { login } from "../../enteties/user/api";
import { useState } from "react";
import md5 from "md5";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const { t } = useTranslation();

  const [error, setError] = useState<string | null>(null);
  const history = useNavigate();
  const auth = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : `${t("auth.wrong-email")}`),
      password: (value) =>
        value.length > 5 ? null : `${t("auth.short-password")}`,
    },
  });

  const handleLogin = () => {
    login({
      email: auth.values.email,
      password: md5(auth.values.password),
    })
      .then((data) => {
        console.log(data);
        setError(null);
        history("/");
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
          placeholder={t("auth.email")}
          {...auth.getInputProps("email")}
        />

        <PasswordInput
          mt="sm"
          withAsterisk
          label={t("auth.password")}
          placeholder={t("auth.enter-password")}
          {...auth.getInputProps("password")}
        />

        <Group mt="md">
          <div className={s.suggest}>
            <p>{t("auth.no-acc")}</p>
            <Button component={Link} to="/registration" variant="subtle">
              {t("auth.reg")}
            </Button>
          </div>
          <Button style={{ width: "100%" }} type="submit">
            {t("auth.log-in")}
          </Button>
        </Group>
      </form>
    </div>
  );
};

export default Auth;