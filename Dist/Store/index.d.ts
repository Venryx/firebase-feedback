import { Feedback_MainState } from "./main";
import { Firelink } from "mobx-firelink";
import { Feedback_FirebaseDBShape } from "./firebase";
export declare class RootState {
    main: Feedback_MainState;
    firelink: Firelink<Feedback_FirebaseDBShape>;
}
export declare const store: RootState;
