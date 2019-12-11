import {observable} from "mobx";
import {Proposals} from "./main/proposals";

export class MainState {
	@observable proposals = new Proposals();
}