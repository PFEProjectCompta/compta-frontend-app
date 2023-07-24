export class ExerciceEtat{
  isFermer:string ;
  classement :string ;
  resultat :string ;
  exerciceId :string ;
  constructor(isFermer:string, classement :string,resultat :string,exerciceId :string) {
    this.isFermer=isFermer;
    this.classement=classement;
    this.resultat=resultat
    this.exerciceId=exerciceId
  }
}
