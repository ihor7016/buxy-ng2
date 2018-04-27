import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth/auth.component";
import { DrawerComponent } from "./layout/drawer/drawer.component";
import { NotFoundComponent } from "./layout/not-found/not-found.component";

const appRoutes: Routes = [
  {
    path: "",
    component: AuthComponent
  },
  {
    path: "main",
    component: DrawerComponent
  },
  {
    path: "**",
    component: NotFoundComponent
  }
];

export const AppRoutes = RouterModule.forRoot(appRoutes);
