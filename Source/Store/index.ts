import {observable} from "mobx";
import {Feedback_MainState} from "./main";
import {ignore} from "mobx-sync";
import {Firelink} from "mobx-firelink";
import {Feedback_FirebaseDBShape} from "./firebase";

// configure({ enforceActions: 'always' });
//configure({ enforceActions: 'observed' });

export class RootState {
	@observable main = new Feedback_MainState();
	@observable @ignore firelink: Firelink<Feedback_FirebaseDBShape>;
}

export const store = new RootState();