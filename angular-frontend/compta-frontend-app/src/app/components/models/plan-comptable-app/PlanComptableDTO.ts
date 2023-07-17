export class PlanComptableDTO{
  numeroCompte: string ;
  intitule: string ;
  compteGeneralId: string ;
  constructor(numeroCompte: string,intitule: string, compteGeneralId: string) {
    this.numeroCompte=numeroCompte;
    this.intitule=intitule;
    this.compteGeneralId=compteGeneralId;
  }
}
