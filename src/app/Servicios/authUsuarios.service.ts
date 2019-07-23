
import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { Persona } from '../Entidades/EntPersonas.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Articulo } from '../Entidades/EntArticulo.model';
import { Procesos } from '../Entidades/EntProcesos.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private AFA: AngularFireAuth, private FSDB: AngularFirestore) { }

  public Iniciarsesion(correo: string, clavedeacceso: string) {
    return new Promise((resolve, rejected) => {
      this.AFA.auth.signInWithEmailAndPassword(correo, clavedeacceso).then(user => {
        resolve();
      }).catch(error => rejected(error));
    });
  }

  public Cerrarsesion() {
    return new Promise((resolve, rejected) => {
      this.AFA.auth.signOut().then(user => {
        resolve();
      }).catch(error => rejected(error));
    });
  }

  recibeAuth() {
    return this.AFA.auth;
  }

  public Registrar(persona: Persona) {
    return new Promise((resolve, rejected) => {
      this.AFA.auth.createUserWithEmailAndPassword(persona.Correo, persona.Clavedeacceso).then(user => {
        this.FSDB.collection('personas').doc(persona.Correo).set(persona);
        // this.FSDB.doc('personas/'+persona.Correo).delete();
        resolve();
      }).catch(error => rejected(error));
    });
  }

  registrarArticulo(articulo: Articulo) {
    return new Promise((resolve, rejected) => {
      this.FSDB.collection('articulos').doc(articulo.referenciadedocumento).set(articulo).then(user => {
        resolve();
      }).catch(error => rejected(error));
    });
  }

  registrarProcesp(proceso: Procesos) {
    return new Promise((resolve, rejected) => {
      this.FSDB.collection('procesos').add(proceso).then(user => {
        resolve();
      }).catch(error => rejected(error));
    });
  }

  public Modificar(nuevapersona: Persona) {
    return new Promise((resolve, rejected) => {
      this.FSDB.doc('personas/' + nuevapersona.Correo).update(nuevapersona).then(user => {
        resolve();
      }).catch(error => rejected(error));
    });
  }

  public getPersona(correo: string) {
    return this.FSDB.collection('personas').doc(correo).valueChanges();
  }

  public getPersonas() {
    return this.FSDB.collection('personas').valueChanges();
  }

  public getArticulos() {
    return this.FSDB.collection('articulos').valueChanges();
  }

  public getProcesos() {
    return this.FSDB.collection('procesos').valueChanges();
  }

}
