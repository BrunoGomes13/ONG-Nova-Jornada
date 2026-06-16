import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/adminApi';

const Login = () => {
  const navegar = useNavigate(); // ← ESTA LINHA está faltando!
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    try {
      const data = await login(email, senha);

      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('usuario', JSON.stringify(data.usuario));

        if (data.usuario.role === 'admin') {
          navegar('/adm/dashboard');
        } else {
          navegar('/');
        }
      } else {
        alert(data.mensagem);
      }
    } catch (erro) {
      alert('Erro ao fazer login. Tente novamente.');
    }
  };
};

export default Login;