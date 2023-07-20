export class Banque{
  abrege: string ;intitule: string ;interlocuteur: string ;codeBIC: string ;adresse: string ;
  code_postale: string ;
  ville: string ;
  pays: string ;
  telephone: string ;
  telecopie: string ;
  email: string ;
  site_internet :string ;
  agenceId: string ;
  constructor(abrege: string,intitule: string, interlocuteur: string,codeBIC: string, adresse: string, code_postale: string,
              ville: string, pays: string,telephone: string,telecopie: string,email: string,site_internet :string,
              agenceId:string) {
    this.abrege=abrege;
    this.intitule=intitule;
    this.interlocuteur=interlocuteur
    this.codeBIC=codeBIC;
    this.adresse=adresse;
    this.code_postale=code_postale;
    this.ville=ville;
    this.pays=pays;
    this.telephone=telephone;
    this.telecopie=telecopie;
    this.email=email;
    this.site_internet=site_internet;
    this.agenceId=agenceId;
  }
}
