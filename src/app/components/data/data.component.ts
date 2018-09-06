import { Component} from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { Observable } from 'rxjs/RX';


@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styles: []
})
export class DataComponent {

  forma:FormGroup;

  usuario:Object = {
    nombrecompleto:{
      nombre:"Ivone",
      apellido:"Estrada"
    },
    correo:"ivoneestrada94@hotmail.com"
   // pasatiempos:["Dormir"," Leer"," Dibujar"]
  }

  constructor() { 
    
    console.log(this.usuario);

    this.forma = new FormGroup({
 
      'nombrecompleto': new FormGroup({

        'nombre': new FormControl('' , [
                                        Validators.required,
                                        Validators.minLength(3)] ),
        'apellido': new FormControl('' , Validators.required )
      }),

     
      'correo': new FormControl('' , [Validators.required, 
                                      Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$") ] ),

       // 'pasatiempos': new FormControl('' , Validators.required)
       'pasatiempos': new FormArray([
        new FormControl('Comer' , Validators.required)
       ]),
     
       'username':new FormControl('', Validators.required, this.existeUsuario),
       'password1': new FormControl('' , Validators.required ),
       'password2': new FormControl()


    })

    //this.forma.setValue(this.usuario);

    this.forma.controls['password2'].setValidators([
      Validators.required,
      this.noIgual.bind(this.forma)
    ]);


    this.forma.controls['username'].valueChanges
    .subscribe( data =>{
      console.log(data);
    })

    
    this.forma.controls['username'].statusChanges
    .subscribe( data =>{
      console.log(data);
    })

  }

 noIgual(control: FormControl):/*any*/{[s:string]:boolean}{

  console.log(this);
 let forma:any=this;

   if (control.value!== forma.controls['password1'].value){
     return{
       noiguales:true
     }
   }
   return null;
  // console.log(this);
 }


 existeUsuario(control: FormControl): Promise<any> | Observable<any>{
 
  let promesa = new Promise (
    (resolve, reject)=>{
      setTimeout(()=>{
        if(control.value === "strider"){
          resolve({existe:true})
        }else{
          resolve(null)        
        }
      },3000)
    }
  )
return promesa;
 }
 
  agregarPasatiempo(){

  (<FormArray>this.forma.controls['pasatiempos']).push(
    new FormControl('' , Validators.required)
  )

  }


  guardarCambios(){
    console.log(this.forma.value);
   this.forma.reset({nombrecompleto:{
     nombre:"",
   apellido:""
    },
    correo:""});

//    this.forma.controls['correo'].setValue('correonuevo@mail.com');  
  


}

}
