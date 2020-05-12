import * as React from 'react';
import MetaTags from 'react-meta-tags';
import { ISocialTagsProps as IProps } from './socialtags.interface';

export const SocialTags = ({ 
    id, title, description, url, image, twitterHandle
}:IProps) => {
    return (
        <MetaTags id={id}>
            <title>{title}</title>
            <meta name="description" content={description}/>
            <meta name="og:description" content={description}/>
            <meta property="og:title" content={title} />
            <meta property="og:image" content={image} />
            <meta property="og:url" content={url} />
            <meta name="twitter:card" content='summary' />
            <meta name="twitter:creator" content={twitterHandle} />
        </MetaTags>
    );
}
