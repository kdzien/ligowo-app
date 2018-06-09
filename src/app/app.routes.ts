import { LandingComponent } from './landing/landing.component';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { GroupsComponent } from 'src/app/groups/groups.component';
import { MainComponent } from 'src/app/main/main.component';
import { GroupComponent } from './group/group.component';
import { AuthGuard } from 'src/app/services/auth.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginGuard } from './services/login.guard';

export const appRoutes: Routes = [
  { path: '', component: LandingComponent, canActivate: [LoginGuard]},
  { path: 'register', component: RegisterComponent, canActivate: [LoginGuard]},
  { path: 'main', component: MainComponent,
  children: [
    {path: '', pathMatch: 'full', redirectTo: 'groups'},
    {path: 'groups', component: GroupsComponent, canActivate: [AuthGuard]},
    {path: 'groups/:id', component: GroupComponent, canActivate: [AuthGuard]}
  ]
},
{ path: '**', component: PageNotFoundComponent }
];
