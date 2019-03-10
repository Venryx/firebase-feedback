import { Action } from "../Utils/General/Action";
import { Proposals } from "./main/proposals";
import { RootState } from "../General";
export declare type ACTSet_Payload = {
    path: string | ((state: RootState) => any);
    value: any;
};
export declare class ACTSet extends Action<ACTSet_Payload> {
    constructor(path: string | ((state: RootState) => any), value: any);
}
export declare function SimpleReducer(path: string | ((store: RootState) => any), defaultValue?: any): (state: any, action: Action<any>) => any;
export declare class Feedback {
    proposals: Proposals;
}
export declare const FeedbackReducer: any;
