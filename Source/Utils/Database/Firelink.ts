import {Firelink} from "mobx-firelink";
import type {RootState} from "../../Store";
import type {FirebaseDBShape} from "../../Store/firebase";
//import {firelink_instance_internal_do_not_import} from "./Firelink_Instance.js";

/*export let fire: Firelink<RootState, FirebaseDBShape>;
OnPopulated(()=> {
	fire = new Firelink(manager.dbPath, store);
	store.firelink = fire;
});*/

//export let fire = new Firelink<RootState, FirebaseDBShape>(manager.dbPath, store);
// at import time, since manager.dbPath not yet populated, init firelink with dbPath of null (we need this instance created at import-time, so it can be sent as an argument in StoreAccessor calls)
export let fire = new Firelink<RootState, FirebaseDBShape>();
/*console.log("TestA.1");
export let fire = firelink_instance_internal_do_not_import;
console.log("TestA.2");*/

// do this last, so that fire instance is created before Firebase_Init imports the store-accessors (which require the fire instance)
//require("./Firelink_Init");
//import "./Firelink_Init.js"; // this import must come last!
// for now, the user project must manually call `require("firebase-feedback/Dist/Utils/Database/Firelink_Init.js");` at the start of its InitFeedback() function!