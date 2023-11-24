import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-mi-cuenta',
  templateUrl: './mi-cuenta.page.html',
  styleUrls: ['./mi-cuenta.page.scss'],
})
export class MiCuentaPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  cerrarSesion() {
    this.router.navigate(['/the-login']);
  }
}
