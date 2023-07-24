export class Exercice{

  date_debut:string ;
  date_fin :string ;
  societeId :string ;

  constructor(date_debut:string, date_fin :string,societeId :string) {
    this.date_debut=date_debut;
    this.date_fin=date_fin;
    this.societeId=societeId
  }
}
