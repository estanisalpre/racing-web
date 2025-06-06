import { Formik, Form } from "formik";
import FormInput from "@/lib/components/FormInput";
import { loginSchema } from "@/schemas/authSchema";
import { Mail, Lock } from "lucide-react";

export default function LoginForm() {
  return (
    <Formik
      className="login-form"
      initialValues={{ email: "", password: "" }}
      validationSchema={loginSchema}
      onSubmit={(values) => {
        console.log("Login data:", values);
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <FormInput
            name="email"
            label="Email"
            icon={Mail}
            type="email"
            error={errors.email}
            touched={touched.email}
          />
          <FormInput
            name="password"
            label="Contraseña"
            icon={Lock}
            type="password"
            error={errors.password}
            touched={touched.password}
          />
          <button type="submit">Iniciar sesión</button>
        </Form>
      )}
    </Formik>
  );
}

