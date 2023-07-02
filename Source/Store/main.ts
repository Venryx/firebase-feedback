import {makeObservable, observable} from "mobx";
import {Proposals} from "./main/proposals.js";

export class Lib_MainState {
	constructor() { makeObservable(this); }
	@observable proposals = new Proposals();
}