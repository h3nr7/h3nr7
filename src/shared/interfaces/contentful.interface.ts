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
    title: EntryFields.Text
    rankOrder?: EntryFields.Number
}

export interface IContentfulProfile {
    displayName: EntryFields.Text
    firstName: EntryFields.Text
    lastName: EntryFields.Text
    title: EntryFields.Text
    email: EntryFields.Text
    contact: EntryFields.Text
    address1: EntryFields.Text
    address2: EntryFields.Text
    city: EntryFields.Text
    postcode: EntryFields.Text
}

/** interface for article */
export interface IContentfulArticle {
    title: EntryFields.Text
    description:  EntryFields.Text
    content: EntryFields.RichText
    markdownContent: IContentfulMarkdown
    articleType: Entry<unknown>
    showInHome?: EntryFields.Boolean
    heroImage: IContentfulImage
    topic: Array<Entry<unknown>>
    location: EntryFields.Location
    rankOrder?: EntryFields.Number
    isArchived?: EntryFields.Boolean
    linkUrl: EntryFields.Text
}

export interface IContentfulExperiences {
    companyName: EntryFields.Text
    role: EntryFields.Text
    isCurrent: EntryFields.Boolean
    startDate: EntryFields.Date
    endDate: EntryFields.Date
    content: EntryFields.Text
}

export interface IContentfulEducations {
    institute: EntryFields.Text
    title: EntryFields.Text
    isCurrent: EntryFields.Boolean
    startDate: EntryFields.Date
    endDate: EntryFields.Date
}

export interface IContentfulCV {
    name: EntryFields.Symbol,
    summary: EntryFields.Text,
    profile: Entry<IContentfulProfile>
    experiences: Entry<IContentfulExperiences>[]
    educations: Entry<IContentfulEducations>[]
}

export type IEntryModel = IContentfulArticle & IContentfulTopic & 
    IContentfulCV & IContentfulProfile & IContentfulExperiences & IContentfulEducations

export interface IContentfulEntry extends Entry<IEntryModel> {}

/** interface for entries */
export interface IContentfulEntries extends EntryCollection<IEntryModel> {
    includes?: {
        Entry: Array<IContentfulEntry>
        Asset: Array<IContentfulImage | IContentfulPdf>
    }
}
