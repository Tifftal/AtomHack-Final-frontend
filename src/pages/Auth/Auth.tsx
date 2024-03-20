import { TextInput, Button, Group, PasswordInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import s from "./auth.module.scss";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
const Auth = () => {
  const { t } = useTranslation();

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

  const handleLogin = () => { };

  return (
    <div className={s.content}>
      <form onSubmit={auth.onSubmit(handleLogin)} className={s.form}>
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
