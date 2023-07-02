import {observable} from "mobx";
import {Proposals} from "./main/proposals.js";

export class MainState {
	@observable proposals = new Proposals();
}