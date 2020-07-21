import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { User } from '../../model/user.model';

@Component({
  selector: 'p-signin',
  templateUrl: './signin.html',
  styleUrls: ['./signin.scss']
})
export class SigninPage implements OnInit {

  @ViewChild('f') form: NgForm;
  error: string;

  user: User;

  constructor( 
    private authService: AuthService,
    private router: Router
   ) { 
    this.error = null;
  }

  ngOnInit() {
  }

  onSignIn() {
    this.authService.signInUser(this.form.value.email, this.form.value.password)
      .then((user) => {
        console.log(user.user)
        this.authService.setLoginStatus(true);
        this.router.navigateByUrl('home');
      })
      .catch( err => this.error = err.message );
    this.form.reset();
  }

  removeError() {
    this.error = null;
  }

}