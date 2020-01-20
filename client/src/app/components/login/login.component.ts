import{Component, OnInit} from '@angular/core'
import {Router, ActivatedRoute, Params} from '@angular/router';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';


@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    providers: [UserService]
})
export class LoginComponent implements OnInit{
    public title:string;
    public user: User;
    public status: string;
    public identity;
    public token;
    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService
    ){
        this.title='Identificate';
        this.user =  new User("","","","","","","");
    }
    ngOnInit(){
        console.log('Componente de login cargado..');
    }
    onSubmit(){
        //loguear al usuario y conseguir sus datos
        this._userService.singup(this.user).subscribe(
            response=>{
                this.identity= response.user;

                if(!this.identity||!this.identity._id){
                    this.status='error'
                }else{
                    this.status="success";
                    //PERSISTIR
                    localStorage.setItem('identity',JSON.stringify(this.identity));

                    //CONSEGUIR TOKEN
                    this.getToken();
                }
            },
            error=>{
                var errorMessage = <any>error;
                if(errorMessage != null){
                    this.status="error";
                }
            }
        );
    }
    getToken(){
        this._userService.singup(this.user, 'true').subscribe(
            response=>{
                this.token= response.token;

                if(this.token.length<=0){
                    this.status='error'
                }else{
                    this.status="success";
                    //PERSISTIR TOKEN
                    localStorage.setItem('token',JSON.stringify(this.token));
                    //CONSEGUIR LOS CONTADORES O ESTADISTICAS
                }
            },
            error=>{
                var errorMessage = <any>error;
                if(errorMessage != null){
                    this.status="error";
                }
            }
        );
    }
}