import { Formik, Form } from "formik";
import { useState } from "react";
//import { useNavigate } from "react-router-dom";
import FormInput from "@/lib/components/FormInput";
import { loginSchema } from "@/schemas/authSchema";
import { useAuth } from "@/context/AuthContext";
import { Mail, Lock, AlertCircle, CheckCircle } from "lucide-react";

export default function LoginForm() {
  // Si no usas router, puedes comentar estas líneas
  // const router = useRouter();
  const { login, isLoading, error, clearError } = useAuth();
  const [success, setSuccess] = useState<string | null>(null);

  return (
    <Formik
      className="login-form"
      initialValues={{ email: "", password: "" }}
      validationSchema={loginSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          setSuccess(null);
          clearError();
          
          await login(values);
          
          setSuccess('¡Inicio de sesión exitoso!');
          
          // Si tienes router configurado, descomenta estas líneas:
          // setTimeout(() => {
          //   router.push('/dashboard');
          // }, 1500);

        } catch (error) {
          // Los errores se manejan automáticamente por el AuthContext
          console.error('Error en login:', error);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className="space-y-4">
          {/* Mensaje de error */}
          {error && (
            <div className="flex items-center gap-2 p-3 text-red-700 bg-red-100 border border-red-300 rounded-md">
              <AlertCircle size={20} />
              <span className="text-sm">{error}</span>
            </div>
          )}

          {/* Mensaje de éxito */}
          {success && (
            <div className="flex items-center gap-2 p-3 text-green-700 bg-green-100 border border-green-300 rounded-md">
              <CheckCircle size={20} />
              <span className="text-sm">{success}</span>
            </div>
          )}

          <FormInput
            name="email"
            label="Email"
            icon={Mail}
            type="email"
            error={errors.email}
            touched={touched.email}
            disabled={isLoading || isSubmitting}
          />
          
          <FormInput
            name="password"
            label="Contraseña"
            icon={Lock}
            type="password"
            error={errors.password}
            touched={touched.password}
            disabled={isLoading || isSubmitting}
          />
          
          <button 
            type="submit"
            disabled={isLoading || isSubmitting}
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed text-white font-medium rounded-md transition-colors duration-200 flex items-center justify-center gap-2"
          >
            {(isLoading || isSubmitting) && (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            )}
            {(isLoading || isSubmitting) ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </Form>
      )}
    </Formik>
  );
}