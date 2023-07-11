export class Societe{
  raison_social: string ;
  activite: string ;
  adresse: string ;
  compteUtilisateurId: string ;
  ville: string ;
  pays: string ;
  devise: string ;
  forme_juridique: string ;
  capital: number ;
  telephone: string ;
  email: string ;
  site_internet: string ;
  num_dossier: string ;
  identifiant_TVA :string ;

  constructor(raison_social: string,activite: string,adresse: string,compteUtilisateurId: string,
              ville: string,pays: string,devise: string,forme_juridique: string,capital: number,
              telephone: string,email: string ,site_internet: string,num_dossier: string,identifiant_TVA :string) {
    this.raison_social=raison_social;
    this.activite=activite;
    this.adresse=adresse;
    this.compteUtilisateurId=compteUtilisateurId;
    this.ville=ville;
    this.pays=pays;
    this.devise=devise;
    this.forme_juridique=forme_juridique;
    this.capital=capital;
    this.telephone=telephone;
    this.email=email;
    this.site_internet=site_internet;
    this.num_dossier=num_dossier;
    this.identifiant_TVA=identifiant_TVA;
  }
}
