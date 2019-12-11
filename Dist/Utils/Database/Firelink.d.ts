import { Firelink } from 'mobx-firelink';
import { FirebaseDBShape } from '../../Store/firebase';
import { RootState } from '../../Store';
export declare let fire: Firelink<RootState, FirebaseDBShape>;
