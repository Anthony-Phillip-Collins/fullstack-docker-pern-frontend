import { FormFooter, InputError, InputLabel, InputWrapper, LabelText, StyledForm, StyledInput } from './Form.styled';

/* Form */

interface Props extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const Form = ({ children, onSubmit }: Props) => {
  return (
    <>
      <StyledForm onSubmit={onSubmit}>{children}</StyledForm>
    </>
  );
};

/* Input */

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  value: string;
  error?: string;
  setValue: (value: string) => void;
}

const Input = ({ label, name, value, error, setValue, ...rest }: InputProps) => {
  return (
    <InputWrapper>
      <InputLabel>
        <LabelText>{label}</LabelText>
        <StyledInput
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          name={name}
          error={!!error}
          autoComplete="off"
          {...rest}
        />
      </InputLabel>
      {error && <InputError>{error}</InputError>}
    </InputWrapper>
  );
};

/* Footer */

interface FooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Footer = ({ children }: FooterProps) => {
  return <FormFooter>{children}</FormFooter>;
};

Form.Input = Input;
Form.Footer = Footer;

export default Form;
