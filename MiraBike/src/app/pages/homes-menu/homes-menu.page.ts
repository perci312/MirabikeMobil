import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homes-menu',
  templateUrl: './homes-menu.page.html',
  styleUrls: ['./homes-menu.page.scss'],
})
export class HomesMenuPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  cerrarSesion() {
    // Puedes agregar lógica adicional aquí, como borrar tokens de autenticación, etc.
    // Luego, redirige al usuario a la página de inicio de sesión
    this.router.navigate(['/the-login']);
  }
}

