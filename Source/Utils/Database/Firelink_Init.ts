import {OnPopulated, manager} from "../../Manager.js";
import {store} from "../../Store/index.js";
import {fire} from "./Firelink.js";

OnPopulated(()=> {
	store.firelink = fire;
	// now that manager.dbPath is populated, we can initialize the Firelink
	fire.Initialize({
		rootPathInDB: manager.dbPath,
		rootStore: store,
	});
});