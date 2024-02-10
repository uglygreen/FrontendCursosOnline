import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-and-register',
  templateUrl: './login-and-register.component.html',
  styleUrls: ['./login-and-register.component.css']
})
export class LoginAndRegisterComponent {

  email_login: string = '';
  password_login: string = '';

  email_register: string = '';
  password_register: string = '';
  password_confirmation: string = '';
  name_register: string = '';
  surname_register: string = '';


  constructor(
    public authService: AuthService,
    public router: Router
  ){

  }

  ngOnInit(): void{

    console.log(this.authService.user);
    if(this.authService.user){
      this.router.navigateByUrl("/")
    }
  }

  login(){
    if(!this.email_login || !this.password_login){
      alert("Debes llenar los campos")
      return;
    }
    this.authService.login(this.email_login, this.password_login).subscribe((resp:any) => {
      console.log(resp);
      if(resp){
        window.location.reload();
      }else{
        alert("Las credenciales ingresadas son incorrectas")
      }
    })
  }

  register(){
    if(!this.email_register || !this.password_register || !this.password_confirmation || !this.name_register|| !this.surname_register ){
      alert("Debes llenar los campos obligatorios")
      return;
    }
    if( this.password_register != this.password_confirmation){
      alert("Las contraseñas no coinciden");
      return;
    }

    let data = {
      email:this.email_register,
      password: this.password_register, 
      name: this.name_register,
      surname: this.surname_register,
      rol: 'cliente'
    }
    this.authService.register(data).subscribe((resp:any) => {
      console.log(resp);
      if(resp.message == 403){
        alert(resp.message_text);
      }else{
        
        this.email_register = '';
        this.password_register  = '';
        this.password_confirmation  = '';
        this.name_register = '';
        this.surname_register = '';
        alert("El usuario de creo correctamente");
      }
    })
  }

}
