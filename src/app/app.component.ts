import { Component } from '@angular/core';
import { EmployeeService } from './service/employee.service';
import { AboutComponent } from './about/about.component';
import { Routes, RouterModule } from '@angular/router';
import { Employee } from 'src/models/employee';
import { User } from 'src/models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {


  constructor(private _employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios(){
    this._employeeService.getUsers().subscribe(data => {
      console.log(data);
      this.employees = data;
    }, error => {
      console.log(error);
    })
  }

  eliminarUsuario(id:string){
    var answer = confirm('Estas seguro de querer eliminarlo?');
    if(answer){
      this._employeeService.eliminarUsuario(id).subscribe(data => {
        this.users = [];  
        this.obtenerUsuarios(); 
      }, error => {
        console.log(error);
      })
    }    
  }

  agregarUsuario(){
    this._employeeService.añadirUsuario(this.model).subscribe(data => {
      this.users = [];
      this.obtenerUsuarios();
      this.model = {_id:'',name:'',surname:'',email:'',password:0};  
    }, error => {
      console.log(error);
    })
  }

  editarUsuario(id:string){
    this._employeeService.actualizarUsuario(id,this.model2).subscribe(data =>{
      this.model2 = {_id:'',name:'',surname:'',email:'',password:0};
      this.hideUpdate = true;
      this.users = [];
      this.obtenerUsuarios();
    }, error => {
      console.log(error);
    })
  }

  eliminarTodosUsuarios(){
    var answer = confirm('Estas seguro de querer eliminarlos a todos?');
    if(answer){
      this._employeeService.eliminarTodosUsuarios().subscribe(data => {
        this.users = [];
        this.obtenerUsuarios();    
      }, error => {
        console.log(error);
      })
    }    
  }

  title:string = 'Angular CRUD';  

  users: User [] = [];

  model:User = {_id:'',name:'',surname:'',email:'',password:0};
  model2:User = {_id:'',name:'',surname:'',email:'',password:0};
  msg:string = '';
  hideUpdate:boolean = true;

  myValue = 0;
  
  closeAlert():void{
    this.msg = '';
  }

}
