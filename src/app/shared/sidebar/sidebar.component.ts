import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  menu = [
    {
    titulo: "Principal",
    icono: "mdi mdi-gauge",
    url: "/dashboard"
  },
  {
    titulo: "Pedidos",
    icono: "mdi mdi-archive",
    url: "/pedidos"
  },
  {
    titulo: "Productos",
    icono: "mdi mdi-cup-water",
    url: "/productos"
  },
  {
    titulo: "Usuarios",
    icono: "mdi mdi-account",
    url: "/usuarios"
  },
  {
    titulo: "Cupones",
    icono: "mdi mdi-ticket",
    url: "/cupones"
  },
  {
    titulo: "Entregas",
    icono: "mdi mdi-truck-delivery",
    url: "/entregas"
  }];

  constructor() { }

  ngOnInit() {
  }

}
