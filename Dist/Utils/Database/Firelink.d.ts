import { Firelink } from "mobx-firelink";
import type { RootState } from "../../Store";
import type { FirebaseDBShape } from "../../Store/firebase";
export declare let fire: Firelink<RootState, FirebaseDBShape>;
