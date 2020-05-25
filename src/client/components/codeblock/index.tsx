import * as React from 'react';
import { Code } from './codeblock.styles';
import { LightAsync as SyntaxHighlighter } from 'react-syntax-highlighter';
import { monokai } from 'react-syntax-highlighter/dist/esm/styles/hljs';

interface ICodeblockProps {
    ref?: React.RefObject<HTMLDivElement>;
    value: React.ReactChildren;
}

export const CodeBlock:React.FC<ICodeblockProps> = ({value}) => {

    const codeRef = React.createRef<HTMLDivElement>();
    const customStyle = {
        background: '#141414'
    };

    return (
        <SyntaxHighlighter 
            language='javascript' 
            customStyle={customStyle}
            CodeTag={Code}
            style={monokai}>
            {value}
        </SyntaxHighlighter>
    )
}