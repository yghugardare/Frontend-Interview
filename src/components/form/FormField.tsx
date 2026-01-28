import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

type BaseProps = {
  label: string;
  name: string;
  id?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
};

type InputProps = BaseProps & {
  as?: 'input';
  type?: React.HTMLInputTypeAttribute;
};

type TextareaProps = BaseProps & {
  as: 'textarea';
  rows?: number;
};

type FormFieldProps = InputProps | TextareaProps;

export function FormField(props: FormFieldProps) {
  const { label, name, id = name, required, placeholder, className, as = 'input', ...rest } = props;

  return (
    <div className={`space-y-1 ${className ?? ''}`}>
      <Label htmlFor={id} className="mb-2">
        {label}
      </Label>

      {as === 'textarea' ? (
        <Textarea
          id={id}
          name={name}
          required={required}
          placeholder={placeholder}
          {...(rest as Omit<TextareaProps, keyof BaseProps>)}
        />
      ) : (
        <Input
          id={id}
          name={name}
          required={required}
          placeholder={placeholder}
          {...(rest as Omit<InputProps, keyof BaseProps>)}
        />
      )}
    </div>
  );
}
