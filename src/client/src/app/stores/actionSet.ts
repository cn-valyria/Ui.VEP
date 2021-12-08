export interface ActionSet {
    [actionName: string]: (payload: any) => Promise<any>
}