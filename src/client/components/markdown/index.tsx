import * as React from 'react';
import { IMarkdownProps } from './markdown.interface'
import * as ReactMarkdown from 'react-markdown';
import { useMarkdown } from '../../helper/apiHooks';
import { CodeBlock } from '../codeblock';
import { H1, H2, H3, H4, H5, H6, Paragraph } from './markdown.styles';

export const Markdown:React.FC<IMarkdownProps> = ({markdownContent}) => {

    const mdStr:string = useMarkdown(markdownContent);

    return (
        <ReactMarkdown 
            renderers={{
                code: CodeBlock,
                heading: (props):React.ReactElement | any => {
                    switch (props.level) {
                        case 1:
                            return <H1>{props.children}</H1>;
                        case 2:
                            return <H2>{props.children}</H2>;
                        case 3:
                            return <H3>{props.children}</H3>;
                        case 4:
                            return <H4>{props.children}</H4>;
                        case 5:
                            return <H5>{props.children}</H5>;
                        case 6:
                            return <H6>{props.children}</H6>;
                        default:
                            return <p>{props.children}</p>;
                    }
                },
                paragraph: Paragraph
            }}
            source={mdStr}/>
    )
}