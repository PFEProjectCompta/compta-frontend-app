export class Agence{
  nom :string ;
  complement: string ;
  code_postale: string ;
  ville: string ;
  pays: string ;
  societeId: string ;
  constructor(nom :string,complement: string, code_postale: string,ville:string, pays:string, societeId: string) {
    this.nom=nom;
    this.complement=complement;
    this.code_postale=code_postale
    this.ville=ville;
    this.pays=pays;
    this.societeId=societeId;
  }
}
