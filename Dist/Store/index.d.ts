import { Lib_MainState } from "./main.js";
import { Firelink } from "mobx-firelink";
import { FirebaseDBShape } from "./firebase.js";
export declare class Lib_RootState {
    constructor();
    main: Lib_MainState;
    firelink: Firelink<Lib_RootState, FirebaseDBShape>;
}
export declare const store: Lib_RootState;
