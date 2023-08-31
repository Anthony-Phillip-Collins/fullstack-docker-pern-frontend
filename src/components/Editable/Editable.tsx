import { convert } from 'html-to-text';
import { Ref, forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
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
  onUpdate?: (value: string) => void;
  onEnter?: (value: string) => void;
  onEscape?: () => void;
}

export interface EditableRef {
  value: string;
}

const Styled = StyledContentEditable;

const Editable = forwardRef(
  (
    { initialValue, tagName, disabled, error, onUpdate, onEnter, onEscape, ...props }: EditableProps,
    ref: Ref<EditableRef>,
  ) => {
    const clean = (value: string) => convert(value);

    const [html, setHtml] = useState<string>(clean(initialValue) || '');
    const contentEditable = useRef<HTMLElement>(null);

    const update = useCallback(
      (value: string) => {
        const cleanValue = clean(value);
        let changed = false;
        setHtml((state) => {
          changed = state !== cleanValue;
          return changed ? cleanValue : state;
        });

        changed && onUpdate && onUpdate(cleanValue);
      },
      [setHtml, onUpdate],
    );

    const changeHandler = (evt: ContentEditableEvent) => {
      update(evt.target.value);
    };

    const handleKeyup = useCallback(
      (evt: KeyboardEvent) => {
        if (evt.key === 'Enter') {
          onEnter && onEnter(html);
        }

        if (evt.key === 'Escape') {
          onEscape && onEscape();
        }
      },
      [html, onEnter, onEscape],
    );

    const onFocus = () => {
      addEventListener('keyup', handleKeyup);
    };

    const onBlur = () => {
      removeEventListener('keyup', handleKeyup);
    };

    useEffect(() => {
      if (disabled) {
        update(initialValue);
      }
    }, [disabled, initialValue, update]);

    useImperativeHandle(ref, (): EditableRef => ({ value: html }));

    return (
      <Styled.Wrapper>
        <Styled.Editable
          innerRef={contentEditable}
          html={html}
          disabled={!!disabled}
          onChange={changeHandler}
          tagName={tagName}
          error={!!error}
          onFocus={() => onFocus()}
          onBlur={() => onBlur()}
          data-testid="editable"
          {...props}
        />
        {error && <Styled.ErrorField>{error}</Styled.ErrorField>}
      </Styled.Wrapper>
    );
  },
);

Editable.displayName = 'Editable';

export default Editable;
