import { useState } from "react";
import LoginFormComponent from "../components/LoginFormComponent";
import RegisterFormComponent from "../components/RegisterFormComponent";
import '@/styles/modules/auth/auth.css';

export default function AuthView() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <section className="auth-view-container">
      <article className="auth-view-content">
        <h2>{isLogin ? "Inicia Sesión" : "Regístrate"}</h2>
        <button className="link-auth" onClick={toggleForm}>
          {isLogin ? "Crear cuenta" : "Ingresar"}
        </button>
      </article>
      <div className="form-auth-container">
        {isLogin ? <LoginFormComponent /> : <RegisterFormComponent />}
      </div>
    </section>
  );
}

