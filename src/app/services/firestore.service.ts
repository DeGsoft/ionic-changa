import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(
    private firestore: AngularFirestore
  ) {}

  public createUser(data: any) {
    return this.firestore.collection('users').add(data);
  }

  public getUser(documentId: string) {
    return this.firestore.collection('users').doc(documentId).snapshotChanges();
  }

  public getUsers() {
    return this.firestore.collection('users').snapshotChanges();
  }

  public updateUser(documentId: string, data: any) {
    return this.firestore.collection('users').doc(documentId).set(data);
  }

  public deleteUser(documentId: string) {
    return this.firestore.collection('users').doc(documentId).delete();
  }
}
