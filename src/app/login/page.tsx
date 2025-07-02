import { loginUser } from './actions';
import LoginForm from '@/components/forms/LoginForm';

export default function LoginPage() {
  return (
    <div className="p-3 bg-purple-400 flex justify-center">
      <LoginForm action={loginUser} />
    </div>
  );
}
