import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth/auth.component";
import { LayoutComponent } from "./layout/layout/layout.component";
import { NotFoundComponent } from "./layout/not-found/not-found.component";
import { AuthGuard, MainGuard } from "./auth/auth/auth-guard.service";

const appRoutes: Routes = [
  {
    path: "",
    component: AuthComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "main",
    component: LayoutComponent,
    canActivate: [MainGuard]
  },
  {
    path: "**",
    component: NotFoundComponent
  }
];

export const AppRoutes = RouterModule.forRoot(appRoutes);
