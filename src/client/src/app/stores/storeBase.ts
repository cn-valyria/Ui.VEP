import { ActionSet } from "./actionSet";

export abstract class StoreBase {
    constructor(private actions: ActionSet) { }

    dispatch(action: string, payload: any = undefined): Promise<any> {
        const executable = this.actions[action] as (payload: any) => Promise<any>;
        return executable(payload);
    }
}