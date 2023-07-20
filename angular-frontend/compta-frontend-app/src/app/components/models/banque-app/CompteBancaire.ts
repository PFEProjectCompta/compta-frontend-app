export class CompteBancaire{
  abrege: String ;
  devise: String ;
  pays: String ;
  structure: String ;
  num_compte: String ;
  num_guichet: String ;
  banqueId: String ;
  planComptableElementId: String ;
  constructor(abrege: String,devise: String, pays: String,structure: String,  num_compte: String ,
              num_guichet: String,banqueId: String,planComptableElementId: String) {
    this.abrege=abrege;
    this.devise=devise;
    this.pays=pays
    this.structure=structure;
    this.num_compte=num_compte;
    this.num_guichet=num_guichet;
    this.banqueId=banqueId;
    this.planComptableElementId=planComptableElementId;
  }
}
