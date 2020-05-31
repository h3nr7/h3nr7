import * as React from 'react';
import MetaTags from 'react-meta-tags';
import { ISocialTagsProps as IProps } from './socialtags.interface';

export const SocialTags = ({ 
    id, title, description, url, image, imageSecure, twitterHandle
}:IProps) => {
    return (
        <MetaTags id={id}>
            <title>{title}</title>
            <meta name="description" content={description}/>
            <meta property="og:description" content={description}/>
            <meta property="og:title" content={title} />
            <meta property='og:type' content='website' />
            <meta property="og:image" content={image} />
            <meta property="og:image:url" content={image} />
            <meta property="og:image:secure_url" content={imageSecure} />
            <meta property="og:url" content={url} />
            <meta name="twitter:card" content='summary' />
            <meta name="twitter:creator" content={twitterHandle} />
        </MetaTags>
    );
}
