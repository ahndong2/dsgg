import { useRef, useState, useEffect, useMemo, forwardRef, useImperativeHandle } from 'react';
import { PropsBase } from '@types';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styles from './TextEditor.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

export interface TextEditorRef {
  focus: () => void;
}
export interface TextEditorProps extends PropsBase {
  placeholder?: string;
  className?: string;
  contents?: string;
  textStyle?: string[];
  textColor?: never[];
  textSize?: string[];
  textIndent?: string[];
  editorImage?: string[];
  readOnly?: boolean;
  onChange?: (textEditor: string) => void;
  noHeader?: boolean;
}

export const TextEditor = forwardRef<TextEditorRef, TextEditorProps>(({ ...props }, ref) => {
  const {
    placeholder = '내용을 입력해 주세요.',
    contents,
    className,
    textStyle = ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    textColor = [],
    textSize = ['small', false, 'large', 'huge'],
    textIndent = [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
      { align: [] },
    ],
    // editorImage = ['image', 'video'],
    editorImage = ['image'],
    readOnly = false,
    onChange = () => {},
    noHeader = false,
  } = props;

  const [content, setContent] = useState<string>('');
  const quillRef = useRef<ReactQuill>(null); // ReactQuill Dom 지정, 이미지 업로드 때 이용
  useImperativeHandle(ref, () => {
    return {
      focus() {
        quillRef.current?.focus();
      },
    };
  });

  const modules = useMemo(() => {
    if (noHeader) {
      return { toolbar: false };
    }
    return {
      toolbar: {
        // 툴바에 넣을 기능
        container: [
          textStyle,
          [{ size: textSize }, { color: textColor }],
          textSize,
          textIndent,
          editorImage,
        ],
      },
    };
  }, [textStyle, textColor, textSize, textIndent, editorImage, noHeader]);

  const changeEditor = (content: string) => {
    setContent(content);
    onChange(content);
  };

  useEffect(() => {
    if (content === contents) return;
    setContent(contents || '');
  }, [contents]);

  useEffect(() => {
    quillRef.current?.editor?.root.setAttribute('spellcheck', 'false');
  }, []);
  return (
    <div className={cx('root', { noHeader: noHeader }, className)}>
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={content}
        onChange={(d: string) => {
          changeEditor(d);
        }}
        readOnly={readOnly}
        placeholder={placeholder}
        modules={modules}
      />
    </div>
  );
});
