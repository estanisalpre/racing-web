import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string().email("Email inválido").required("Email requerido"),
  password: Yup.string().min(6, "Mínimo 6 caracteres").required("Contraseña requerida"),
});

export const registerSchema = Yup.object({
  username: Yup.string().required("Nombre de usuario requerido"),
  email: Yup.string().email("Email inválido").required("Email requerido"),
  password: Yup.string().min(6, "Mínimo 6 caracteres").required("Contraseña requerida"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Las contraseñas no coinciden")
    .required("Confirma tu contraseña"),
});