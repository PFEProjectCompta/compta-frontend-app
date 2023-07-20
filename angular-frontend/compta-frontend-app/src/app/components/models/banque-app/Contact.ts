export class Contact{
  type_contact: string ;
  civilite: string ;
  nom :string ;
  prenom :string ;
  service :string ;
  fonction :string ;
  telephone: string ;
  portable: string ;
  email :string ;
  telecopie: string ;
  banqueId: string ;
  constructor(type_contact: string,civilite: string,nom :string,prenom :string,service :string,
              fonction :string,telephone: string,portable: string,email :string,telecopie: string, banqueId: string ) {
    this.type_contact=type_contact;
    this.civilite=civilite;
    this.nom=nom
    this.prenom=prenom;
    this.service=service;
    this.fonction=fonction;
    this.telephone=telephone;
    this.banqueId=banqueId;
    this.portable=portable;
    this.email=email;
    this.telecopie=telecopie;
  }
}
