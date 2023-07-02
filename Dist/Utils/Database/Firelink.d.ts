import { Firelink } from "mobx-firelink";
import { FirebaseDBShape } from "../../Store/firebase.js";
import { RootState } from "../../Store/index.js";
export declare let fire: Firelink<RootState, FirebaseDBShape>;
