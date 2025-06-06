import type { InputHTMLAttributes } from 'react';
import { useField } from 'formik';
import type { LucideIcon } from 'lucide-react';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  icon?: LucideIcon;
  error?: string;
  touched?: boolean;
}

export default function FormInput({ label, icon: Icon, ...props }: FormInputProps) {
  const [field, meta] = useField(props.name);

  return (
    <div className="input-container-full">
      <label className='input-label' htmlFor={props.name}>{label}</label>
      <div className="input-container">
        {Icon && <Icon className='input-icon' size={18} />}
        <input className='input-field' {...field} {...props} />
      </div>
      {meta.touched && meta.error && (
        <div className="error">{meta.error}</div>
      )}
    </div>
  );
}

