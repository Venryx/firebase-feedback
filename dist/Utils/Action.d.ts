export declare class Action<Payload> {
    constructor(payload: Payload);
    type: string;
    payload: Payload;
}
export declare function IsACTSetFor(action: Action<any>, path: any): boolean;
