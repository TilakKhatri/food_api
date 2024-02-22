import { IsEmail, IsNotEmpty, Length } from "class-validator";

export class CreateCustomerInput {
  @IsNotEmpty()
  @IsEmail()
  email!: string; // Definite assignment assertion

  @IsNotEmpty()
  @Length(10, 10)
  phone!: string; // Definite assignment assertion

  @IsNotEmpty()
  @Length(8, 25)
  password!: string; // Definite assignment assertion
}
export class UserLoginInput {
  @IsEmail()
  email!: string;

  @Length(8, 25)
  password!: string;
}
