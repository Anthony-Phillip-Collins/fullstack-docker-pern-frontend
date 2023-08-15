import { convert } from 'html-to-text';
import { Ref, forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { ContentEditableEvent } from 'react-contenteditable';
import StyledContentEditable from './Editable.styled';

interface Common extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

interface EditableProps extends Common {
  initialValue: string;
  tagName: string;
  disabled?: boolean;
  error: string | null;
  onChange: () => void;
}

export interface EditableRef {
  value: string;
}

const Styled = StyledContentEditable;

const Editable = forwardRef(
  ({ initialValue, tagName, disabled, error, onChange, ...props }: EditableProps, ref: Ref<EditableRef>) => {
    const [html, setHtml] = useState<string>(initialValue || '');
    const contentEditable = useRef<HTMLElement>(null);

    useEffect(() => {
      if (disabled) {
        setHtml(initialValue);
      }
    }, [disabled, initialValue]);

    const changeHandler = (evt: ContentEditableEvent) => {
      setHtml(convert(evt.target.value));
      onChange && onChange();
    };

    useImperativeHandle(ref, (): EditableRef => ({ value: html }));

    return (
      <Styled.Wrapper>
        <Styled.Editable
          {...props}
          innerRef={contentEditable}
          html={html}
          disabled={!!disabled}
          onChange={changeHandler}
          tagName={tagName}
          error={!!error}
        />
        {error && <Styled.ErrorField>{error}</Styled.ErrorField>}
      </Styled.Wrapper>
    );
  },
);

Editable.displayName = 'Editable';

export default Editable;
