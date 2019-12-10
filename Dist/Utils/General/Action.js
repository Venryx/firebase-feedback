export class Action {
    constructor(payload) {
        this.type = this.constructor.name;
        this.payload = payload;
        //this.Extend(payload);
        Object.setPrototypeOf(this, Object.getPrototypeOf({}));
    }
}
/*Object.prototype._AddFunction("Is", Action.prototype.Is);
Object.prototype._AddFunction("IsAny", Action.prototype.IsAny);*/
/*export function IsACT<Props>(action, actionType: new(..._)=>Action<Props>): action is Props {
    return action.type == actionType.name;
    //return action instanceof actionType; // alternative
}*/
/*export function IsACT<T, Props>(action: Action<T>, actionType: new(..._)=>Action<Props>): action is Props {
    return this.type == actionType.name;
    //return this instanceof actionType; // alternative
}*/
export function IsACTSetFor(action, path) {
    return action.type.startsWith("ACTSetFF_") && action.payload["path"] == path;
}
//# sourceMappingURL=Action.js.map