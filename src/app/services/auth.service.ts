import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { User } from '../model/user.model';


@Injectable()
export class AuthService {

  private loggedInStatus = JSON.parse(localStorage.getItem('loggedIn') || 'false')

  setLoginStatus(value: boolean) {
    this.loggedInStatus = value;
    localStorage.setItem('loggedIn', 'true');
  }

  get LoginStatus() {
    return JSON.parse(localStorage.getItem('loggedIn') || this.loggedInStatus.toString()); 
  }

  signUpUser(email: string, password: string) {
    return firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      console.log(errorCode);
      var errorMessage = error.message;
      return errorMessage;
    });    
  }

  signInUser(email: string, password: string) {
    //return firebase.auth().signInWithEmailAndPassword(email, password);
    return firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      console.log(errorCode);
      var errorMessage = error.message;
      return errorMessage;
    });    
  }     

  signOutUser() {
    //return firebase.auth().signInWithEmailAndPassword(email, password);
    return firebase.auth().signOut().then(function() {
      // Sign-out successful.
      }).catch(function(error) {
      //  An error happened.
      var errorCode = error.code;
      console.log(errorCode);
      var errorMessage = error.message;
      return errorMessage;
    });    
  }     

    /**
     * initApp handles setting up UI event listeners and registering Firebase auth listeners:
     *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
     *    out, and that is where we update the UI.
     */
    stateUser() {
      // Listening for auth state changes.
      // [START authstatelistener]
      firebase.auth().onAuthStateChanged(function(user) {
        // [START_EXCLUDE silent]
        //document.getElementById('quickstart-verify-email').disabled = true;
        // [END_EXCLUDE]
        if (user) {
          // User is signed in.
          // this.user.displayName = user.displayName;
          // this.user.email = user.email;
          // this.user.emailVerified = user.emailVerified;
          // this.user.photoURL = user.photoURL;
          // this.user.isAnonymous = user.isAnonymous;
          // this.user.uid = user.uid;
          // this.user.providerData = user.providerData;
          // [START_EXCLUDE]
          //
          // if (!emailVerified) {
          //   document.getElementById('quickstart-verify-email').disabled = false;
          // }
          // [END_EXCLUDE]
          return user;
        } else {
          // User is signed out.
          // [START_EXCLUDE]
          // document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
          // document.getElementById('quickstart-sign-in').textContent = 'Sign in';
          // document.getElementById('quickstart-account-details').textContent = 'null';
          // [END_EXCLUDE]
        }
        // [START_EXCLUDE silent]
        // document.getElementById('quickstart-sign-in').disabled = false;
        // [END_EXCLUDE]
      });
      // [END authstatelistener]

      // document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
      // document.getElementById('quickstart-sign-up').addEventListener('click', handleSignUp, false);
      // document.getElementById('quickstart-verify-email').addEventListener('click', sendEmailVerification, false);
      // document.getElementById('quickstart-password-reset').addEventListener('click', sendPasswordReset, false);
    }

}