import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {MyError} from './my-error';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Id} from '../model';


export class BaseService<T extends Id> {
    public baseCollection: AngularFirestoreCollection<T>;

    constructor(public db: AngularFirestore,
                public myErr: MyError,
                public path: string) {
        // this.baseCollection = this.db.collection<T>(path, model => {
        //   return model.orderBy('date', 'asc');
        // });
        this.baseCollection = this.db.collection<T>(path);
    }

    getList(): Observable<T[]> {
        return this.baseCollection.valueChanges({idField: 'id'});
    }

    getListByParam(fieldName: string, id: string): Observable<T[]> {
        this.baseCollection = this.db.collection<T>(this.path, ref => ref.where(fieldName, '==', id));
        return this.baseCollection.valueChanges({idField: 'id'})
    }

    getModel(id: any): Observable<T> {
        return this.db.doc<T>(`/${this.path}/${id}`).valueChanges().pipe(map(item => ({id, ...item})));
    }

    addModel(item: T) {
        return this.baseCollection.add(JSON.parse(JSON.stringify(item)));
    }

    create(c: new(s) => T, id: string): T {
        return new c(id);
    }

    update(item: T): Promise<void> {
        return this.db.doc(`/${this.path}/${item.id}`).update(JSON.parse(JSON.stringify(item)));
    }

    delete(id: string): Promise<void> {
        return this.db.doc(`/${this.path}/${id}`).delete();
    }
}
