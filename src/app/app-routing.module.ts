import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckTutorial } from './providers/check-tutorial.service';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/tutorial',
    pathMatch: 'full'
  },
  {
    path: 'account',
    loadChildren: () => import('./pages/account/account.module').then(m => m.AccountModule)
    , canLoad: [AuthGuard]
  },
  {
    path: 'support',
    loadChildren: () => import('./pages/support/support.module').then(m => m.SupportModule)
    , canLoad: [AuthGuard]
  },
  // {
  //   path: 'login',
  //   loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  // },
  {
    path: 'signin',
    loadChildren: () => import('./pages/signin/signin.module').then(m => m.SigninModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignUpModule)
    //, canLoad: [AuthGuard]
  },
  {
    path: 'app',
    loadChildren: () => import('./pages/tabs-page/tabs-page.module').then(m => m.TabsModule)
    , canLoad: [AuthGuard]
  },
  {
    path: 'tutorial',
    loadChildren: () => import('./pages/tutorial/tutorial.module').then(m => m.TutorialModule),
    canLoad: [CheckTutorial]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
