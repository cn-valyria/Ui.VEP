import { BehaviorSubject } from "rxjs";
import { Collection } from "./collection";

export interface State<T> {
    [itemName: string]: BehaviorSubject<Collection<T>>
}