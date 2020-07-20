import { Injectable } from "@angular/core";
//import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(
    //private afAuth: AngularFireAuth
  ) { }

  registerUser(value) {
    return new Promise<any>((resolve, reject) => {

      //this.afAuth.auth
      firebase.auth().createUserWithEmailAndPassword(value.username, value.password)
        .then(
          res => resolve(res),
          err => reject(err))
    })

  }

  loginUser(value) {
    return new Promise<any>((resolve, reject) => {      
      // this.afAuth.auth.signInWithEmailAndPassword
      firebase.auth().signInWithEmailAndPassword(value.username, value.password)
        .then(
          res => resolve(res),
          err => reject(err))
    })
  }

  logoutUser() {
    return new Promise((resolve, reject) => {
      if (//this.afAuth.auth
      firebase.auth().currentUser) {
        //this.afAuth.auth
        firebase.auth().signOut()
          .then(() => {
            console.log("LOG Out");
            resolve();
          }).catch((error) => {
            reject();
          });
      }
    })
  }

  userDetails() {
    return //this.afAuth.user
    firebase.auth().currentUser
  }

}
