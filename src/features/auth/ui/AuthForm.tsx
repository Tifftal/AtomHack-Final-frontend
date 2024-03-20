import { Stepper, Button, Group, TextInput, PasswordInput, Code } from '@mantine/core';
import { useState } from 'react';
import s from './AuthForm.module.scss';
import { useForm } from '@mantine/form';
import { ValidateForm } from './utils';
import SugToAuth from '../../../widgets/SugToAuth/SugToAuth';
import { useTranslation } from 'react-i18next';

const AuthForm = () => {
    const { t } = useTranslation();

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

        validate: (values) => { return ValidateForm(t, active, values); },
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
        <>
            <Stepper active={active} classNames={{ root: s.root, content: s.content }}>
                <Stepper.Step label={t("registration.firststep")} description={t("registration.firstdesc")}>
                    <TextInput
                        label={t("registration.surname")}
                        placeholder={t("registration.surnamepl")}
                        withAsterisk
                        {...form.getInputProps('surname')}
                    />
                    <TextInput
                        label={t("registration.name")}
                        placeholder={t("registration.namepl")}
                        withAsterisk
                        {...form.getInputProps('name')}
                    />
                    <TextInput
                        label={t("registration.middlename")}
                        placeholder={t("registration.middlenamepl")}
                        {...form.getInputProps('middlename')}
                    />
                    <TextInput
                        label={t("registration.role")}
                        withAsterisk
                        placeholder={t("registration.rolepl")}
                        {...form.getInputProps('role')}
                    />
                </Stepper.Step>

                <Stepper.Step label={t("registration.secondstep")} description={t("registration.seconddesc")}>
                    <TextInput
                        mt="md"
                        label={t("registration.email")}
                        placeholder={t("registration.emailpl")}
                        withAsterisk
                        {...form.getInputProps('email')}
                    />
                    <PasswordInput
                        label={t("registration.password")}
                        placeholder={t("registration.password")}
                        description={t("registration.passworddesc")}
                        withAsterisk
                        {...form.getInputProps('password')}
                    />
                    <PasswordInput
                        label={t("registration.confpassword")}
                        placeholder={t("registration.confpassword")}
                        withAsterisk
                        {...form.getInputProps('confirmPassword')}
                    />
                </Stepper.Step>

                <Stepper.Step label={t("registration.thirdstep")} description={t("registration.thirddesc")}>
                    <h2>{t("registration.codesent")} {form.values.email}</h2>
                    <TextInput
                        label={t("registration.code")}
                        placeholder="000000"
                        {...form.getInputProps('code')}
                        withAsterisk
                        className={s.code}
                    />
                </Stepper.Step>
                <Stepper.Completed>
                    <h2>Вы успешно зарегестрировались!</h2>
                    <Button variant='light' className={s.logbtn}>{t("registration.login")}</Button>
                    <Code block mt="xl">
                        {JSON.stringify(form.values, null, 2)}
                    </Code>
                </Stepper.Completed>
            </Stepper>
            <div className={s.btngroup}>
                <SugToAuth />
                <Group justify="center" mt="xl">
                    {active !== 0 && (
                        <Button variant="default" onClick={prevStep}>
                            {t("registration.prev")}
                        </Button>
                    )}
                    {active !== 3 && <Button onClick={nextStep}>{t("registration.next")}</Button>}
                </Group>
            </div>
        </ >
    )
}

export default AuthForm;