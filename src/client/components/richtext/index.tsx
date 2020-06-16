import * as React from 'react';
import { render } from 'react-dom';
import { INLINES, BLOCKS, MARKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Typography } from '@material-ui/core';


import { EmAssets, EmImg, CodeMark, Paragraph, Li } from './richtext.styles';
import { IRichTextProps } from './richtext.interface';



const Code_Mark = (text:string) => {
    const textOut = text.split('\n').flatMap((text, i) => [i > 0 && <br key={i} />, text]);
    return <CodeMark>{textOut}</CodeMark>
};

const EmAssets_Block = (node:any, children:React.ReactChildren) => (
    <EmAssets>
        <EmImg src={node.data.target.fields.file.url} />
    </EmAssets>
);

const Header1_Block = (node:any, children:React.ReactChildren) => (
    <Typography variant='h1' style={{ marginBottom: '1rem' }}>{children}</Typography>
);

const Header2_Block = (node:any, children:React.ReactChildren) => (
    <Typography variant='h2' style={{ marginBottom: '0.5rem' }}>{children}</Typography>
);

const Header3_Block = (node:any, children:React.ReactChildren) => (
    <Typography variant='h3' style={{ marginBottom: '0.5rem' }}>{children}</Typography>
);

const Header4_Block = (node:any, children:React.ReactChildren) => (
    <Typography variant='h4' style={{ marginBottom: '0.5rem' }}>{children}</Typography>
);

const Paragraph_block = (node:any, children:React.ReactChildren) => (
    <Paragraph variant='body2'>{children}</Paragraph>
);

const ListItem_Block = (node:any, children:React.ReactChildren) => (
<Li>{children}</Li>
);

const options = {
    renderMark: {
        [MARKS.CODE]: Code_Mark
    },
    renderNode: {
        [BLOCKS.EMBEDDED_ASSET]: EmAssets_Block,
        [BLOCKS.HEADING_1]: Header1_Block,
        [BLOCKS.HEADING_2]: Header2_Block,
        [BLOCKS.HEADING_3]: Header3_Block,
        [BLOCKS.HEADING_4]: Header4_Block,
        [BLOCKS.PARAGRAPH]: Paragraph_block,
        [BLOCKS.LIST_ITEM]: ListItem_Block
    }
};

export const RichText = ({ document }:{document:any}) => (
    <div>
        {documentToReactComponents(document, options)}
    </div>
)
