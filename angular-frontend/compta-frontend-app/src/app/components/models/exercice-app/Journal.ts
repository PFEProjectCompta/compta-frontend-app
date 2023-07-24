export class Journal{
  jour: number ;
  numFacture:string ;
  ref :string ;
  numCompteId :string ;
  numCompteTiereId :string ;
  libelle :string ;
  credit: number ;
  debit :number ;
  saisieJournauxId :string ;
  constructor(jour: number,numFacture:string, ref :string,numCompteId :string, numCompteTiereId :string,
              libelle :string,credit: number,debit :number,saisieJournauxId :string) {
    this.jour=jour;
    this.numFacture=numFacture;
    this.ref=ref
    this.numCompteId=numCompteId;
    this.numCompteTiereId=numCompteTiereId;
    this.libelle=libelle;
    this.credit=credit;
    this.debit=debit;
    this.saisieJournauxId=saisieJournauxId;

  }
}
