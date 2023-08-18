import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import ExpanderStyled from './Expander.styled';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  open: boolean;
  propsInner?: React.HTMLAttributes<HTMLElement>;
  disabled?: boolean;
}

export interface ExpanderRef {
  updateHeight: () => void;
}

const Styled = ExpanderStyled;

const Expander = forwardRef(
  ({ children, open, disabled, propsInner, ...props }: Props, ref: React.Ref<ExpanderRef>) => {
    const [hidden, setHidden] = useState(!open);
    const refWrapper = useRef<HTMLDivElement>(null);
    const refInner = useRef<HTMLDivElement>(null);

    const updateHeight = useCallback(() => {
      if (refInner.current === null || refWrapper.current === null) return;
      const el = window.getComputedStyle(refInner.current);
      const height: number = parseInt(el.height) + parseInt(el.paddingTop) + parseInt(el.paddingBottom);
      const maxHeight = disabled ? 'none' : `${open ? height : 0}px`;
      refWrapper.current.style.maxHeight = maxHeight;
    }, [open, disabled]);

    const onTransitionEnd = useCallback(() => {
      if (!open) setHidden(true);
    }, [open]);

    useEffect(() => {
      if (open) setHidden(false);
      if (!hidden) updateHeight();
    }, [updateHeight, hidden, open]);

    useImperativeHandle(ref, (): ExpanderRef => ({ updateHeight }));

    return (
      <>
        <Styled.Expander onTransitionEnd={onTransitionEnd} {...props} ref={refWrapper}>
          <Styled.Inner {...propsInner} ref={refInner}>
            {!hidden && children}
          </Styled.Inner>
        </Styled.Expander>
      </>
    );
  },
);

Expander.displayName = 'Expander';

export default Expander;
