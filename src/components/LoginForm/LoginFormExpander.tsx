import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import Expander, { ExpanderRef } from '../Expander/Expander';
import LoginFormContainer from './LoginFormContainer';
import Container from '../Container/Container';
import theme from '../../styles/theme';
import { FormRef } from '../Form/Form';

interface Common extends React.HTMLAttributes<HTMLFormElement> {
  children?: React.ReactNode;
}

export interface ExpanderContainerRef {
  expand: () => void;
  collapse: () => void;
}

type Props = Common & {
  onExpand?: () => void;
  onCollapse?: () => void;
};

const LoginFormExpander = forwardRef(
  ({ onExpand, onCollapse, ...props }: Props, ref: React.Ref<ExpanderContainerRef>) => {
    const [open, setOpen] = useState(false);
    const expander = useRef<ExpanderRef>(null);
    const LoginForm = useRef<FormRef>(null);

    const onLayout = () => {
      expander.current && expander.current.updateHeight();
    };

    const onSuccess = () => {
      collapse();
    };

    const expand = () => {
      setOpen(true);
      onExpand && onExpand();
    };

    const collapse = () => {
      setOpen(false);
      onCollapse && onCollapse();
    };

    useEffect(() => {
      if (open) {
        LoginForm.current && LoginForm.current.reset();
      }
    }, [open]);

    useImperativeHandle(
      ref,
      (): ExpanderContainerRef => ({
        expand,
        collapse,
      }),
    );

    return (
      <Container style={{ backgroundColor: theme.colors.darkVariant }}>
        <Expander open={open} ref={expander} data-testid="login-form-expander">
          <LoginFormContainer onLayout={onLayout} onCancel={collapse} onSuccess={onSuccess} {...props} />
        </Expander>
      </Container>
    );
  },
);

LoginFormExpander.displayName = 'LoginFormExpander';

export default LoginFormExpander;
