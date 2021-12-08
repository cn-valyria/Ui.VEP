export interface Collection<T> {
    totalCount: number | undefined;
    data: T[] | undefined;
}