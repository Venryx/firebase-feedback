import {observable} from "mobx";
import {MainState} from "./main";
import {ignore} from "mobx-sync";
import {Firelink} from "mobx-firelink";
import {FirebaseDBShape} from "./firebase";

// configure({ enforceActions: 'always' });
//configure({ enforceActions: 'observed' });

export class RootState {
	@observable main = new MainState();
	@observable @ignore firelink: Firelink<RootState, FirebaseDBShape>;
}

export const store = new RootState();