export class CodeJournal{
  code:string ;
  intitule_journale :string ;
  type_journal :string ;
  exerciceId :string ;
  constructor(code:string, intitule_journale :string,type_journal :string,exerciceId :string) {
    this.code=code;
    this.intitule_journale=intitule_journale;
    this.type_journal=type_journal
    this.exerciceId=exerciceId
  }
}
