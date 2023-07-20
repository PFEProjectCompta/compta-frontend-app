export class Salariee{
  nom: string ;
  prenom: string ;
  email: string ;
  adresse: string ;
  ville: string ;
  pays: string ;
  telephone: string ;
  societeId: string ;
  planComptableElementId: string ;
  constructor(nom: string, prenom: string, email: string, adresse: string,ville: string, pays: string ,
              telephone: string,societeId: string,planComptableElementId: string ) {
    this.nom=nom;
    this.prenom=prenom;
    this.email=email
    this.adresse=adresse;
    this.ville=ville;
    this.pays=pays;
    this.telephone=telephone;
    this.societeId=societeId;
    this.planComptableElementId=planComptableElementId;
  }
}
