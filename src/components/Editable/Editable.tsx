import { convert } from 'html-to-text';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import cn from 'classnames';
import styles from './Editable.module.css';

interface Common extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

interface EditableProps extends Common {
  initialValue: string;
  tagName: string;
  disabled?: boolean;
}

export interface EditableRef {
  value: string;
}

const Editable = forwardRef(
  ({ initialValue, tagName, disabled, className, ...props }: EditableProps, ref: React.Ref<EditableRef>) => {
    const [html, setHtml] = useState<string>(initialValue || '');
    const contentEditable = useRef<HTMLElement>(null);

    useEffect(() => {
      if (disabled) {
        setHtml(initialValue);
      }
    }, [disabled, initialValue]);

    const onChange = (evt: ContentEditableEvent) => {
      setHtml(convert(evt.target.value));
    };

    useImperativeHandle(ref, (): EditableRef => ({ value: html }));

    if (!html) return null;

    return (
      <ContentEditable
        {...props}
        innerRef={contentEditable}
        html={html}
        disabled={!!disabled}
        onChange={onChange}
        tagName={tagName}
        className={cn(!disabled && styles.editable, className)}
      />
    );
  },
);

Editable.displayName = 'Editable';

export default Editable;
