export class SaisieJournal{
  position:string ;
  periode :string ;
  code :string ;
  intitule_journale :string ;
  code_Journal_id :string ;
  constructor(position:string, periode :string,code :string,intitule_journale :string,code_Journal_id :string) {
    this.position=position;
    this.periode=periode;
    this.code=code
    this.intitule_journale=intitule_journale
    this.code_Journal_id=code_Journal_id
  }
}
