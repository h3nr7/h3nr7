import { Entry, Asset, EntryFields , EntryCollection, Sys } from 'contentful';

/** interface for PDFs */
export interface IContentfulPdf extends Asset {}

/** interface for images */
export interface IContentfulImage extends Asset {}
/** interface for markdown */
export interface IContentfulMarkdown extends Asset {}

/** interface for topic */
export interface IContentfulTopic {
    title: EntryFields.Text
}

export interface IContentfulArticleType {
    title: EntryFields.Text,
    rankOrder?: EntryFields.Number
}

/** interface for article */
export interface IContentfulArticle {
    title: EntryFields.Text
    description:  EntryFields.Text
    content: EntryFields.RichText
    markdownContent: IContentfulMarkdown,
    articleType: Entry<unknown>
    showInHome?: EntryFields.Boolean
    heroImage: IContentfulImage
    topic: Array<Entry<unknown>>
    location: EntryFields.Location
    rankOrder?: EntryFields.Number
    isArchived?: EntryFields.Boolean
    linkUrl: EntryFields.Text
}

export interface IContentfulCV {
    name: EntryFields.Symbol,
    summary: EntryFields.Text,
    experiences: EntryFields.Array<Entry<unknown>>
    educations: EntryFields.Array<Entry<unknown>>
}

export type IEntryModel = IContentfulArticle & IContentfulTopic & IContentfulCV

export interface IContentfulEntry extends Entry<IEntryModel> {}

/** interface for entries */
export interface IContentfulEntries extends EntryCollection<IEntryModel> {
    includes?: {
        Entry: Array<IContentfulEntry>
        Asset: Array<IContentfulImage | IContentfulPdf>
    }
}
