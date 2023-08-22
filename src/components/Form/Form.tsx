import FormStyled from './Form.styled';

interface Common extends React.HTMLAttributes<HTMLFormElement> {
  children?: React.ReactNode;
}

export interface FormRef {
  reset: () => void;
}

interface FormCallbacks {
  onLayout?: () => void;
  onCancel?: () => void;
}

export type FormProps = Common &
  FormCallbacks & {
    errors?: Error[];
  };

export type FormContainerProps = Common &
  FormCallbacks & {
    onSuccess?: () => void;
  };

/* Form */

interface Props extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const Styled = FormStyled;

const Form = ({ children, onSubmit, ...props }: Props) => {
  return (
    <>
      <Styled.Form onSubmit={onSubmit} {...props}>
        {children}
      </Styled.Form>
    </>
  );
};

/* Input */

export interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  value: string;
  error?: string;
}

interface InputProps extends InputFieldProps {
  label: string;
  setValue: (value: string) => void;
}

const Input = ({ label, name, value, error, setValue, ...rest }: InputProps) => {
  return (
    <Styled.InputWrapper>
      <Styled.InputLabel>
        <Styled.LabelText>{label}</Styled.LabelText>
        <Styled.Input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          name={name}
          error={error}
          autoComplete="off"
          {...rest}
        />
      </Styled.InputLabel>
      {error && <Styled.InputError>{error}</Styled.InputError>}
    </Styled.InputWrapper>
  );
};

/* Footer */

interface FooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Footer = ({ children }: FooterProps) => {
  return <Styled.Footer>{children}</Styled.Footer>;
};

Form.Input = Input;
Form.Footer = Footer;

export default Form;
