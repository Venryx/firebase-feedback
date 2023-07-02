import { MainState } from "./main.js";
import { Firelink } from "mobx-firelink";
import { FirebaseDBShape } from "./firebase.js";
export declare class RootState {
    main: MainState;
    firelink: Firelink<RootState, FirebaseDBShape>;
}
export declare const store: RootState;
