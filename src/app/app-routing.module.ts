import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth/auth.component";
import { LayoutComponent } from "./layout/layout/layout.component";
import { NotFoundComponent } from "./layout/not-found/not-found.component";

const appRoutes: Routes = [
  {
    path: "",
    component: AuthComponent
  },
  {
    path: "main",
    component: LayoutComponent
  },
  {
    path: "**",
    component: NotFoundComponent
  }
];

export const AppRoutes = RouterModule.forRoot(appRoutes);
