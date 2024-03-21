import s from './Registration.module.scss';
import AuthForm from '../../features/auth/ui/AuthForm';
import { useTranslation } from 'react-i18next';

const Registration = () => {
  const { t } = useTranslation();

  return (
    <div className={s.registration}>
      <h1>{t("registration.create")}</h1>
      <AuthForm />
    </div>
  );
}

export default Registration;