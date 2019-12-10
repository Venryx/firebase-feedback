import { Firelink } from 'mobx-firelink';
import { manager, OnPopulated } from '../../Manager';
import { store } from '../../Store';
export let fire;
OnPopulated(() => {
    fire = new Firelink(manager.dbPath, store);
    store.firelink = fire;
});
//# sourceMappingURL=Firelink.js.map