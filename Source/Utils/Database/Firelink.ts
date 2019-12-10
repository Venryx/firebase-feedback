import { Firelink, GetDoc, SetDefaultFireOptions } from 'mobx-firelink';
import {manager, OnPopulated} from '../../Manager';
import {Feedback_FirebaseDBShape} from '../../Store/firebase';
import {RootState, store} from '../../Store';

export let fire: Firelink<RootState, Feedback_FirebaseDBShape>;
OnPopulated(()=> {
	fire = new Firelink(manager.dbPath, store);
	store.firelink = fire;
});