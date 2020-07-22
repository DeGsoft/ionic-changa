import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';

import { AuthService } from '../../services/auth.service';
import { User } from '../../model/user.model';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['./login.scss'],
})
export class LoginPage {

  //@ViewChild('f') form: NgForm;  
  error: string;

  login: UserOptions = { id: '', username: '', password: '' };
  submitted = false;

  constructor(
    //public userData: UserData,
    private authService: AuthService,
    private router: Router
   ) { 
    this.error = null;
  }

  onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.authService.signInUser(        
        this.login.username,        
        this.login.password)
      .then((user) => {
        //console.log(user.user);
        this.authService.setLoginStatus(true);        
        this.router.navigateByUrl('/app/tabs/schedule');
      })
      .catch( err => this.error = err.message );
    form.reset();
    }
  }

  onSignup() {
    this.router.navigateByUrl('/signup');
  }
}
