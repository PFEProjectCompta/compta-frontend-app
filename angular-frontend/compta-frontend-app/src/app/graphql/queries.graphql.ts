import gql from "graphql-tag";

const GET_ADMINE=gql`
  query{
    adminesBureauList{
      id
      nom
      prenom
      bureaus{
        id
        nom
        adresse
      }
    }
  }
`
const GET_EXERCICES=gql`
  query{
    exerciceList{
      id
      date_debut
      date_fin
      saisieJournauxes{
        intitule_journale
        exercice{
          id
        }
      }
      societe{
        id
        compteUtilisateur{
          id
          email
          bureau{
            adresse

          }
        }
      }
    }
  }
`
export {GET_ADMINE,GET_EXERCICES}
