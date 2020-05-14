export interface ITopic {
    id: string;
    title?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface ITopics {
    total: number;
    skip: number;
    limit: number;
    items: Array<ITopic>;
}