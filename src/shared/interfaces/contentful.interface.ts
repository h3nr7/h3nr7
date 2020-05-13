import { Entry, Asset, EntryFields , EntryCollection, Sys } from 'contentful';

/** interface for PDFs */
export interface IContentfulPdf extends Asset {}

/** interface for images */
export interface IContentfulImage extends Asset {}

/** interface for topic */
export interface IContentfulTopic {
    title: EntryFields.Text
}

/** interface for article */
export interface IContentfulArticle {
    title: EntryFields.Text
    description:  EntryFields.Text
    content: EntryFields.RichText
    pageType:  Array<EntryFields.Text>
    showInHome?: EntryFields.Boolean
    heroImage: IContentfulImage
    topic: Array<Entry<IContentfulTopic>>
    location: EntryFields.Location
    rankOrder?: EntryFields.Number
    isArchived?: EntryFields.Boolean
}

export interface IContentfulEntry extends Entry<IContentfulArticle> {}

/** interface for entries */
export interface IContentfulEntries extends EntryCollection<IContentfulArticle> {
    includes?: {
        Entry: Array<Entry<IContentfulArticle | IContentfulTopic>>
        Asset: Array<IContentfulImage | IContentfulPdf>
    }
}
