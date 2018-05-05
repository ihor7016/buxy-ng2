import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from "@angular/router";
import { Observable } from "rxjs/Observable";
import { AngularFireAuth } from "angularfire2/auth";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private _firebaseAuth: AngularFireAuth) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this._firebaseAuth.authState.map(item => {
      if (item) {
        this.router.navigate(["main"]);
        return false;
      } else {
        return true;
      }
    });
  }
}
