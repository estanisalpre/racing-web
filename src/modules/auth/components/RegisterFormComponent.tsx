import { Formik, Form } from 'formik';
import { registerSchema } from '@/schemas/authSchema';
import FormInput from '@/lib/components/FormInput';
import NotificationModal from '@/lib/components/NotificationModal';
import { User, Mail, Lock } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useNotification } from '@/hooks/useNotification';

export default function RegisterFormComponent() {
  const authContext = useAuth();
  const { notification, showSuccess, showError, hideNotification } = useNotification();

  if (!authContext) {
    // handle the case where authContext is null
    return <div>Auth context is not available</div>;
  }

  const { register } = authContext;

  /* const handleRegister = async (
    values: {
      username: string;
      email: string;
      password: string;
      confirmPassword: string;
    },
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    try {
      await register(values);

      showSuccess('¡Registro exitoso!', 'Tu cuenta ha sido creada correctamente');

      setTimeout(() => {
        window.location.href = '/auth';
      }, 2000);
    } catch (error) {
      showError(
        'Error en el registro', 
        error instanceof Error ? error.message : 'No se pudo crear la cuenta'
      );
    } finally {
      setSubmitting(false);
    }
  }; */

  const handleRegister = async (
    values: RegisterData,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    try {
      await register({
        username: values.username,
        email: values.email,
        password: values.password
      });

      showSuccess('¡Registro exitoso!', 'Tu cuenta ha sido creada correctamente. Por favor inicia sesión.');

      setTimeout(() => {
        window.location.href = '/auth';
      }, 2000);
    } catch (error) {
      showError(
        'Error en el registro', 
        error instanceof Error ? error.message : 'No se pudo crear la cuenta'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={registerSchema}
        onSubmit={(values, { setSubmitting }) => {
          handleRegister(values, setSubmitting);
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="form-auth">
            <FormInput
              name="username"
              label="Usuario"
              icon={User}
              error={errors.username}
              touched={touched.username}
              disabled={isSubmitting}
            />

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

            <FormInput
              name="confirmPassword"
              label="Confirmar Contraseña"
              icon={Lock}
              type="password"
              error={errors.confirmPassword}
              touched={touched.confirmPassword}
              disabled={isSubmitting}
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-auth"
            >
              {isSubmitting ? 'Registrando...' : 'Registrarme'}
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
}