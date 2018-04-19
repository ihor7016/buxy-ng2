import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./services/auth-guard.service";
import { AuthComponent } from "./auth/auth/auth.component";
import { DrawerComponent } from "./layout/drawer/drawer.component";

const appRoutes: Routes = [
  {
    path: "",
    component: AuthComponent
  },
  {
    path: "main",
    canActivate: [AuthGuard],
    component: DrawerComponent
  }
];

export const AppRoutes = RouterModule.forRoot(appRoutes);
