export class UserKeycloak{
  userName: string ;
  email :string ;
  password :string ;
  firstname: string ;
  lastName: string ;
  constructor(userName: string,email: string,password :string,firstname: string,lastName: string ) {
    this.userName=userName;
    this.email=email;
    this.password=password;
    this.firstname=firstname;
    this.lastName=lastName;
  }
}
