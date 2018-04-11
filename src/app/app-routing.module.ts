import {RouterModule, Routes} from "@angular/router";


import {AuthGuard} from "./services/auth-guard.service";
import {AuthComponent} from "./auth/auth.component";
import {MainComponent} from "./main/main.component";

const appRoutes: Routes = [
  {
    path: '',
    component: AuthComponent
  },
  {
    path: 'main',
    canActivate: [AuthGuard],
    component: MainComponent
  }
];

export const AppRoutes = RouterModule.forRoot(appRoutes);
