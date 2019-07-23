import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { AuthService } from '../Servicios/authUsuarios.service';

@Injectable({
  providedIn: 'root'
})

export class AuteticacionGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(): Promise<boolean> {
    return new Promise(resolve => {
      this.authService.recibeAuth().onAuthStateChanged(user => {
        if (user) {
          this.router.navigate(['pavellon']);
        } else {
          this.router.navigate(['home']);
        }
        resolve(user ? true : false);
      });
    });
  }
}
