import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { GroupsComponent } from 'src/app/groups/groups.component';
import { MainComponent } from 'src/app/main/main.component';
import { GroupComponent } from './group/group.component';

export const appRoutes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'main',
  component: MainComponent,
  children: [
    {path: 'groups', component: GroupsComponent},
    {path: 'groups/:id', component: GroupComponent}
  ]
},
];
