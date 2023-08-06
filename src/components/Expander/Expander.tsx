import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react';
import { ExpanderInner, ExpanderWrapper } from './Expander.styled';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  open: boolean;
}

export interface ExpanderRef {
  updateHeight: () => void;
}

const Expander = forwardRef(({ children, open, ...props }: Props, ref: React.Ref<ExpanderRef>) => {
  const refWrapper = useRef<HTMLDivElement>(null);
  const refInner = useRef<HTMLDivElement>(null);

  const updateHeight = useCallback(() => {
    if (refInner.current === null || refWrapper.current === null) return;

    const el = window.getComputedStyle(refInner.current);
    const height: number = parseInt(el.height) + parseInt(el.paddingTop) + parseInt(el.paddingBottom);
    refWrapper.current.style.maxHeight = `${open ? height : 0}px`;
  }, [open]);

  useImperativeHandle(ref, (): ExpanderRef => ({ updateHeight }));

  useEffect(() => {
    updateHeight();
  }, [updateHeight]);

  return (
    <>
      <ExpanderWrapper {...props} ref={refWrapper}>
        <ExpanderInner ref={refInner}>{children}</ExpanderInner>
      </ExpanderWrapper>
    </>
  );
});

Expander.displayName = 'Expander';

export default Expander;
