import s from './Registration.module.scss';
import SugToAuth from '../../widgets/SugToAuth/SugToAuth';
import AuthForm from '../../features/auth/ui/AuthForm';

const Registration = () => {
  return (
    <div className={s.registration}>
      <SugToAuth />
      <div className={s.stepper}>
        <h1>Создание нового аккаунта</h1>
        <AuthForm />
        <div></div>
      </div>
    </div>
  );
}

export default Registration;