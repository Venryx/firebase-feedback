import { Firelink, GetDoc, SetDefaultFireOptions, PathOrPathGetterToPathSegments } from 'mobx-firelink';
import {FirebaseDBShape} from '../../Store/firebase';
import {RootState} from '../../Store';

/*export let fire: Firelink<RootState, FirebaseDBShape>;
OnPopulated(()=> {
	fire = new Firelink(manager.dbPath, store);
	store.firelink = fire;
});*/

//export let fire = new Firelink<RootState, FirebaseDBShape>(manager.dbPath, store);
// at import time, since manager.dbPath not yet populated, init firelink with dbPath of null (we need this instance created at import-time, so it can be sent as an argument in StoreAccessor calls)
export let fire = new Firelink<RootState, FirebaseDBShape>();

// do this last, so that fire instance is created before Firebase_Init imports the store-accessors (which require the fire instance)
require('./Firelink_Init');