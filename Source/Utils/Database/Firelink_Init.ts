import {OnPopulated, manager} from "../../Manager";
import {store} from "../../Store";
import {fire} from "./Firelink";

OnPopulated(()=> {
	store.firelink = fire;
	// now that manager.dbPath is populated, we can initialize the Firelink
	fire.Initialize({
		rootPathInDB: manager.dbPath,
		rootStore: store,
	});
});