export class Bureau{
  nom:string;
  adresse:string;
  ville:string;
  paye:string;
  numero_tele:string;
  email:string;
  adminId:string;
  constructor(nom:string,adresse:string, ville:string, paye:string, numero_tele:string, email:string,adminId:string) {
    this.nom=nom;
    this.adresse=adresse;
    this.ville=ville;
    this.paye=paye;
    this.numero_tele=numero_tele;
    this.email=email;
    this.adminId=adminId;
  }
}
