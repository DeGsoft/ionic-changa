import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserOptions } from '../../interfaces/user-options';

import { AuthService } from '../../services/auth.service';
import { User } from '../../model/user.model';

@Component({
  selector: 'page-signin',
  templateUrl: './signin.html',
  styleUrls: ['./signin.scss']
})
export class SigninPage implements OnInit {

  //@ViewChild('f') form: NgForm;  
  error: string;

  user: User;

  login: UserOptions = { id: '', username: '', password: '' };
  submitted = false;

  constructor( 
    private authService: AuthService,
    private router: Router
   ) { 
    this.error = null;
  }

  ngOnInit() {
  }

  onSignIn(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.authService.signInUser(
        //this.form.value.email
        this.login.username,
        //this.form.value.password
        this.login.password)
      .then((user) => {
        console.log(user.user);
        this.authService.setLoginStatus(true);
        //this.router.navigateByUrl('home');
        this.router.navigateByUrl('/app/tabs/schedule');
      })
      .catch( err => this.error = err.message );
    form.reset();
    }


  

  }
}