import { Formik, Form } from "formik";
import FormInput from "@/lib/components/FormInput";
import { registerSchema } from "@/schemas/authSchema";
import { User, Mail, Lock } from "lucide-react";

export default function RegisterForm() {
  return (
    <Formik
      initialValues={{ username: "", email: "", password: "", confirmPassword: "" }}
      validationSchema={registerSchema}
      onSubmit={(values) => {
        console.log("Register data:", values);
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <FormInput
            name="username"
            label="Usuario"
            icon={User}
            error={errors.username}
            touched={touched.username}
          />
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
          <FormInput
            name="confirmPassword"
            label="Confirmar Contraseña"
            icon={Lock}
            type="password"
            error={errors.confirmPassword}
            touched={touched.confirmPassword}
          />
          <button type="submit">Registrarme</button>
        </Form>
      )}
    </Formik>
  );
}
