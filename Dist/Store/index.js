var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { observable } from "mobx";
import { MainState } from "./main";
import { ignore } from "mobx-sync";
// configure({ enforceActions: 'always' });
//configure({ enforceActions: 'observed' });
export class RootState {
    constructor() {
        this.main = new MainState();
    }
}
__decorate([
    observable
], RootState.prototype, "main", void 0);
__decorate([
    observable, ignore
], RootState.prototype, "firelink", void 0);
export const store = new RootState();
//# sourceMappingURL=index.js.map