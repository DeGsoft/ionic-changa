import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UserOptions } from '../interfaces/user-options';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class UserData {
  // usersSnapshot : AngularFirestoreCollection;
  public user: UserOptions = { id: '', username: '', password: '' };
  errorMessage: string = '';
  successMessage: string = '';

  favorites: string[] = [];
  HAS_LOGGED_IN = 'hasLoggedIn';
  HAS_SEEN_TUTORIAL = 'hasSeenTutorial';

  public documentId = null;
  public users = [];
  public currentStatus = 1;

  constructor(
    public storage: Storage,
    private authService: AuthService,
    private db: AngularFirestore
    
  ) { }

  hasFavorite(sessionName: string): boolean {
    return (this.favorites.indexOf(sessionName) > -1);
  }

  addFavorite(sessionName: string): void {
    this.favorites.push(sessionName);
  }

  removeFavorite(sessionName: string): void {
    const index = this.favorites.indexOf(sessionName);
    if (index > -1) {
      this.favorites.splice(index, 1);
    }
  }

  // login(username: string): Promise<any> {
  //   return this.storage.set(this.HAS_LOGGED_IN, true).then(() => {
  //     this.setUsername(username);
  //     return window.dispatchEvent(new CustomEvent('user:login'));
  //   });
  // }
  login(value): Promise<any> {        
    return this.authService.signInUser(        
        value.username,        
        value.password)      
      .then(res => {
        console.log(res);
        this.errorMessage = "";
        this.authService.setLoginStatus(true);  
        //?   
        return this.storage.set(this.HAS_LOGGED_IN, true).then(() => {
        this.setUsername(value.username);
        return window.dispatchEvent(new CustomEvent('user:login'));
        });
        //
      }, err => {
        console.log(err.message);
        this.errorMessage = err.message;
        return this.errorMessage;
      });
  }

  // signup(username: string): Promise<any> {
  //   return this.storage.set(this.HAS_LOGGED_IN, true).then(() => {
  //     this.setUsername(username);
  //     return window.dispatchEvent(new CustomEvent('user:signup'));
  //   });
  // }
  signup(value): Promise<any> {
    return this.authService.signUpUser(value.username,        
        value.password)
      .then(res => {
        console.log(res);
        this.errorMessage = "";
        this.successMessage = "Your account has been created. Please log in.";
        //?
        return this.storage.set(this.HAS_LOGGED_IN, true).then(() => {
          this.setUsername(value.username);
          return window.dispatchEvent(new CustomEvent('user:signup'));
        });
        //
      }, err => {
        console.log(err);
        this.successMessage = "";
        return this.errorMessage = err.message;        
      })
  }

  // logout(): Promise<any> {
  //   return this.storage.remove(this.HAS_LOGGED_IN).then(() => {
  //      return this.storage.remove('username');
  //   }).then(() => {
  //     window.dispatchEvent(new CustomEvent('user:logout'));
  //   });
  // }
  logout(): Promise<any> {
    return this.authService.signOutUser().then(() => {    
      //?       
      return this.storage.remove(this.HAS_LOGGED_IN).then(() => {
        return this.storage.remove('username');
      }).then(() => {
        window.dispatchEvent(new CustomEvent('user:logout'));
      });  
    });
  }  

  setUsername(username: string): Promise<any> {
    return this.storage.set('username', username);
  }

  // getUsername(): Promise<string> {
  //   return this.storage.get('username').then((value) => {
  //     return value;
  //   });
  // }
  getUser(): Observable<any> {
    return this.authService.userDetails();
  }

  isLoggedIn(): Promise<boolean> {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === true;
    });
  }

  checkHasSeenTutorial(): Promise<string> {
    return this.storage.get(this.HAS_SEEN_TUTORIAL).then((value) => {
      return value;
    });
  }

  // ngOnInit() {
  //   // this.newUserForm.setValue({
  //   //   id: '',
  //   //   nombre: '',
  //   //   url: ''
  //   // });
    
    
  //   (usersSnapshot) => {
  //     this.users = [];
  //     usersSnapshot.forEach((usersData: any) => {
  //       this.users.push({
  //         id: usersData.payload.doc.id,
  //         data: usersData.payload.doc.data()
  //       });
  //     });
  //   });
  // }

}
