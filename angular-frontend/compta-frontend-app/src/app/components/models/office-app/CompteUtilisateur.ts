export class CompteUtilisateur{
  id: string ;
  nom: string ;
  prenom: string ;
  email: string ;
  adresse: string ;
  ville: string ;
  pays: string ;
  telephone: string ;
  date_naissance: string ;
  actif: boolean ;
  bureauId :string;
  constructor(id: string,nom:string,prenom:string,email:string,adresse:string, ville:string, pays:string, telephone:string,date_naissance:string,actif: boolean,bureauId :string) {
    this.id=id;
    this.nom=nom;
    this.prenom=prenom;
    this.email=email;
    this.adresse=adresse;
    this.ville=ville;
    this.pays=pays;
    this.telephone=telephone;
    this.date_naissance=date_naissance;
    this.actif=actif;
    this.bureauId=bureauId;
  }
}
