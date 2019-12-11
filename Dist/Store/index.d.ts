import { MainState } from "./main";
import { Firelink } from "mobx-firelink";
import { FirebaseDBShape } from "./firebase";
export declare class RootState {
    main: MainState;
    firelink: Firelink<RootState, FirebaseDBShape>;
}
export declare const store: RootState;
