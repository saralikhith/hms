import { Validator,NG_VALIDATORS,AbstractControl, ValidationErrors } from "@angular/forms";
import { Directive,Input } from "@angular/core";

@Directive({
    selector:'[match]',
    providers:[{provide:NG_VALIDATORS,useExisting:PasswordMatchDirective,multi:true}]
})

export class PasswordMatchDirective implements Validator{
    @Input('match') valid:string=''
    validate(control: AbstractControl<any, any>): ValidationErrors | null {
       
        return (control.value!=this.valid)?{'valid':true}:null
    }
}