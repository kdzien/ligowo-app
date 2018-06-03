import { LandingComponent } from './landing/landing.component';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { GroupsComponent } from 'src/app/groups/groups.component';
import { MainComponent } from 'src/app/main/main.component';
import { GroupComponent } from './group/group.component';
import { AuthGuard } from 'src/app/services/auth.guard';

export const appRoutes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'main', component: MainComponent,
  children: [
    {path: 'groups', component: GroupsComponent, canActivate: [AuthGuard]},
    {path: 'groups/:id', component: GroupComponent}
  ]
},
];
