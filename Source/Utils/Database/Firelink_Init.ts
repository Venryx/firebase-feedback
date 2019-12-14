import {OnPopulated, manager} from "../../Manager";
import {store} from "../../Store";
import {fire} from "./Firelink";
import {PathOrPathGetterToPathSegments} from "mobx-firelink";

OnPopulated(()=> {
	store.firelink = fire;
	// now that manager.dbPath is populated, we need to fix the values sent to Firelink, and init the subs/firestore (keep Firelink compatible with this late-init)
	//fire.UpdateRootPath(manager.dbPath);
	fire.rootPath = manager.dbPath;
	fire.rootPathSegments = PathOrPathGetterToPathSegments(fire.rootPath);
	fire.rootStore = store;
	fire.InitSubs();
});