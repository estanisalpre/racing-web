import React from 'react';
import { Formik, Form } from 'formik';
import { loginSchema } from '@/schemas/authSchema';
import FormInput from '@/lib/components/FormInput';
import NotificationModal from '@/lib/components/NotificationModal';
import { Mail, Lock } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';  
import { useNotification } from '@/hooks/useNotification';

export const LoginFormComponent: React.FC = () => {
  const authContext = useAuth();
  const { notification, showSuccess, showError, hideNotification } = useNotification();
  
  if (!authContext) {
    return <div>Auth context is not available</div>;
  }

  const { login } = authContext; 

  const handleLogin = async (
    values: { email: string; password: string },
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    try {
      await login(values);
      showSuccess('¡Login exitoso!', 'Has iniciado sesión correctamente');

      setTimeout(() => {
        window.location.href = '/home';
      }, 2000);
    } catch (error) {
      showError('Error de login', error instanceof Error ? error.message : 'Credenciales incorrectas');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={loginSchema}
        onSubmit={(values, { setSubmitting }) => {
          handleLogin(values, setSubmitting);
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="form-auth">
            <h2>Iniciar Sesión</h2>

            <FormInput
              name="email"
              label="Email"
              icon={Mail}
              type="email"
              error={errors.email}
              touched={touched.email}
              disabled={isSubmitting}
            />

            <FormInput
              name="password"
              label="Contraseña"
              icon={Lock}
              type="password"
              error={errors.password}
              touched={touched.password}
              disabled={isSubmitting}
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-auth"
            >
              {isSubmitting ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </Form>
        )}
      </Formik>

      <NotificationModal
        isOpen={notification.isOpen}
        type={notification.type}
        title={notification.title}
        message={notification.message}
        onClose={hideNotification}
        autoClose={true}
        autoCloseDelay={3000}
      />
    </>
  );
};