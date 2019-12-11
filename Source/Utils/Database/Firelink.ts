import { Firelink, GetDoc, SetDefaultFireOptions, PathOrPathGetterToPathSegments } from 'mobx-firelink';
import {manager, OnPopulated} from '../../Manager';
import {FirebaseDBShape} from '../../Store/firebase';
import {RootState, store} from '../../Store';
import {RootStoreShape} from 'mobx-firelink/Dist/UserTypes';

/*export let fire: Firelink<RootState, FirebaseDBShape>;
OnPopulated(()=> {
	fire = new Firelink(manager.dbPath, store);
	store.firelink = fire;
});*/

//export let fire = new Firelink<RootState, FirebaseDBShape>(manager.dbPath, store);
// at import time, since manager.dbPath not yet populated, init firelink with dbPath of null (we need this instance created at import-time, so it can be sent as an argument in StoreAccessor calls)
export let fire = new Firelink<RootState, FirebaseDBShape>(null, store, false);
store.firelink = fire;
OnPopulated(()=> {
	// now that manager.dbPath is populated, we need to fix the values sent to Firelink, and init the subs/firestore (keep Firelink compatible with this late-init)
	//fire.UpdateRootPath(manager.dbPath);
	fire.rootPath = manager.dbPath;
	fire.rootPathSegments = PathOrPathGetterToPathSegments(fire.rootPath);
	fire.InitSubs();
});