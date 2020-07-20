import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
// import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';

import { AlertController } from '@ionic/angular';

import { UserData } from '../../providers/user-data';
import { UserOptions } from '../../interfaces/user-options';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
  styleUrls: ['./account.scss'],
})
export class AccountPage implements AfterViewInit {
  user: UserOptions = { id: '', username: '', password: '' };
  submitted = false;
  username: string;

  users = [];
  public documentId = null;  
  public currentStatus = 1;
  form: NgForm;
  // public newUserForm = new FormGroup({
  //   username: new FormControl('', Validators.required),
  //   password: new FormControl('', Validators.required),
  //   id: new FormControl('')
  // });

  constructor(
    public alertCtrl: AlertController,
    public router: Router,
    public userData: UserData,
    private firestoreService: FirestoreService
  ) { }

  ngAfterViewInit() {
     //this.getUsername();
     this.getUser();
  }
  // getUsername() {
  //   this.userData.getUsername().then((username) => {
  //     this.username = username;
  //   });
  // }
  getUser() {
    this.userData.getUser().subscribe(res => {
      console.log('res', res);
      if (res !== null) {
        //this.user.id = res.id;
        this.user.username = res.email;
        this.users = res;
        console.log('users', this.users);
      } else {
        //this.navCtrl.navigateBack('');
      }
    }, err => {
      console.log('err', err);
    })
    
  }
  // ngOnInit() {
    //this.editUser(documentId);
  //}

  // // Present an alert with the current username populated
  // // clicking OK will update the username and display it
  // // clicking Cancel will close the alert and do nothing
  // async changeUsername() {
  //   const alert = await this.alertCtrl.create({
  //     header: 'Change Username',
  //     buttons: [
  //       'Cancel',
  //       {
  //         text: 'Ok',
  //         handler: (data: any) => {
  //           this.userData.setUsername(data.username);
  //           this.getUsername();
  //         }
  //       }
  //     ],
  //     inputs: [
  //       {
  //         type: 'text',
  //         name: 'username',
  //         value: this.username,
  //         placeholder: 'username'
  //       }
  //     ]
  //   });
  //   await alert.present();
  // }
  // updatePicture() {
  //   console.log('Clicked to update picture');
  // }
  // changePassword() {
  //   console.log('Clicked to change password');
  // }

  public editUser(documentId) {
    const editSubscribe = this.firestoreService.getUser(documentId).subscribe((user) => {
      this.currentStatus = 2;
      this.documentId = documentId;
      this.form.setValue({
        id: documentId,
        username: user.payload.data()['username'],
        password: user.payload.data()['password']
      });
      editSubscribe.unsubscribe();
    });
  }

  // logout() {
  //   this.userData.logout();
  //   this.router.navigateByUrl('/login');
  // }

  support() {
    this.router.navigateByUrl('/support');
  }
}
