var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { makeObservable, observable } from "mobx";
import { Lib_MainState } from "./main.js";
import { ignore } from "mobx-sync";
// configure({ enforceActions: 'always' });
//configure({ enforceActions: 'observed' });
export class Lib_RootState {
    constructor() {
        Object.defineProperty(this, "main", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Lib_MainState()
        });
        Object.defineProperty(this, "firelink", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        makeObservable(this);
    }
}
__decorate([
    observable
], Lib_RootState.prototype, "main", void 0);
__decorate([
    observable,
    ignore
], Lib_RootState.prototype, "firelink", void 0);
export const store = new Lib_RootState();
//# sourceMappingURL=index.js.map