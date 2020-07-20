import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserData } from '../../providers/user-data';
import { UserOptions } from '../../interfaces/user-options';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  styleUrls: ['./signup.scss'],
})
export class SignupPage {
  signup: UserOptions = { id: '', username: '', password: '' };
  submitted = false;

  constructor(
    public router: Router,
    public userData: UserData,
    private firestoreService: FirestoreService
  ) {}

  onSignup(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      const data = {
        username: this.signup.username,
        password: this.signup.password
      };
      this.firestoreService.createUser(data).then(() => {
        console.log('Documento creado exitósamente!');
      }, (error) => {
        console.error(error);
      });

      this.userData.signup(this.signup);//this.userData.signup(this.signup.username);      
      this.router.navigateByUrl('/login');//this.router.navigateByUrl('/app/tabs/schedule');
    }

  }

}
