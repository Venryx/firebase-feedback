import {makeObservable, observable} from "mobx";
import {Lib_MainState} from "./main.js";
import {ignore} from "mobx-sync";
import {Firelink} from "mobx-firelink";
import {FirebaseDBShape} from "./firebase.js";

// configure({ enforceActions: 'always' });
//configure({ enforceActions: 'observed' });

export class Lib_RootState {
	constructor() { makeObservable(this); }
	@observable main = new Lib_MainState();
	@observable @ignore firelink: Firelink<Lib_RootState, FirebaseDBShape>;
}

export const store = new Lib_RootState();