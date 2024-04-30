import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import {
  TUI_VALIDATION_ERRORS,
  TuiDataListWrapperModule,
  TuiFieldErrorPipeModule,
  TuiInputModule,
  TuiInputPasswordModule,
  TuiInputPhoneInternationalModule,
  TuiSelectModule,
  TuiSortCountriesPipeModule,
  TuiStepperModule
} from '@taiga-ui/kit';
import { UserFormStep } from './user-form-step.enum';
import { TuiCountryIsoCode } from '@taiga-ui/i18n';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiErrorModule
} from '@taiga-ui/core';
import { CustomValidators } from './customValidators';
import { PasswordStrengthMeterComponent } from 'angular-password-strength-meter';
import { BehaviorSubject } from 'rxjs';
import { CreateUser } from '../../models/create-user.type';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiInputPasswordModule,
    TuiInputPhoneInternationalModule,
    TuiSortCountriesPipeModule,
    TuiStepperModule,
    TuiFieldErrorPipeModule,
    TuiErrorModule,
    TuiButtonModule,
    TuiSelectModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
    PasswordStrengthMeterComponent
  ],
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required: 'Ce champ est obligatoire',
        email: 'Adresse email invalide',
        password: 'Mot de passe invalide',
        phone: 'Numéro de téléphone invalide',
        passwordConfirm: 'Les mots de passe ne correspondent pas',
        maxlength: ({ requiredLength }: { requiredLength: string }) =>
          `Longueur maximale — ${requiredLength} caractères`,
        minlength: ({ requiredLength }: { requiredLength: string }) =>
          `Longueur minimale — ${requiredLength} caractères`,
        zipCode: 'Code postal invalide',
        pattern: 'Format invalide',
        passwordMatch: 'Les mots de passe ne correspondent pas',
        passwordEntropy: 'Le mot de passe est trop faible'
      }
    }
  ],
  templateUrl: './user-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserFormComponent {
  @Output() userCreated = new EventEmitter<CreateUser>();

  formStep = UserFormStep.info;
  genders = ['Homme', 'Femme', 'Autre'];
  countryIsoCode = TuiCountryIsoCode.FR;

  readonly UserFormStep = UserFormStep;
  readonly countries = Object.values(TuiCountryIsoCode);

  passwordStrength$ = new BehaviorSubject<number>(0);

  private infoForm = new FormGroup({
    firstName: new FormControl('', [
      CustomValidators.required,
      CustomValidators.minLength(2),
      CustomValidators.maxLength(50)
    ]),
    lastName: new FormControl('', [
      CustomValidators.required,
      CustomValidators.minLength(2),
      CustomValidators.maxLength(50)
    ]),
    gender: new FormControl('', [CustomValidators.required]),
    email: new FormControl('', [
      CustomValidators.required,
      CustomValidators.email
    ]),
    phone: new FormControl('', [
      CustomValidators.required,
      CustomValidators.phoneNumber
    ])
  });

  private addressForm = new FormGroup({
    address: new FormControl('', [
      CustomValidators.required,
      CustomValidators.minLength(2),
      CustomValidators.maxLength(100)
    ]),
    zipCode: new FormControl('', [
      CustomValidators.required,
      CustomValidators.minLength(2),
      CustomValidators.maxLength(10),
      CustomValidators.zipCode
    ]),
    city: new FormControl('', [
      CustomValidators.required,
      CustomValidators.minLength(2),
      CustomValidators.maxLength(50)
    ]),
    country: new FormControl('', [
      CustomValidators.required,
      CustomValidators.minLength(2),
      CustomValidators.maxLength(50)
    ])
  });

  private registerForm = new FormGroup(
    {
      login: new FormControl('', [
        CustomValidators.required,
        CustomValidators.minLength(2),
        CustomValidators.maxLength(50)
      ]),
      password: new FormControl(
        '',
        [CustomValidators.required],
        [CustomValidators.passwordEntropy$(this.passwordStrength$)]
      ),
      passwordConfirm: new FormControl('', [CustomValidators.required])
    },
    {
      validators: CustomValidators.passwordMatch('password', 'passwordConfirm')
    }
  );

  userForm = {
    [UserFormStep.info]: this.infoForm,
    [UserFormStep.address]: this.addressForm,
    [UserFormStep.register]: this.registerForm
  };

  nextStep(): void {
    if (this.userForm[this.formStep].invalid) {
      console.log('erreur dans le formulaire');
      return;
    }

    if (this.formStep === UserFormStep.info) {
      this.formStep = UserFormStep.address;
    } else if (this.formStep === UserFormStep.address) {
      this.formStep = UserFormStep.register;
    } else if (this.formStep === UserFormStep.register) {
      this.confirmCreation();
      console.log(this.userForm[UserFormStep.info].value);
      console.log(this.userForm[UserFormStep.address].value);
      console.log(this.userForm[UserFormStep.register].value);
    }
  }

  private confirmCreation(): void {
    const user = {
      ...this.userForm[UserFormStep.info].value,
      ...this.userForm[UserFormStep.address].value,
      ...this.userForm[UserFormStep.register].value
    };
    this.userCreated.emit(user as CreateUser);
  }
}
