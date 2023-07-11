import gql from "graphql-tag";

const ADD_ROLE=gql`
  mutation($id:String){
    addRole(id:$id)
  }
`

const REMOVE_ROLE=gql`
  mutation($id:String){
    removeRole(id:$id)
  }
`
const ADD_ADMIN=gql`
  mutation($id:String,$nom:String,$prenom:String,$email:String){
    ajouterBureauAdmineWithId(admineBureauWithIdDTO:{
      id:$id,
      nom:$nom,
      prenom:$prenom,
      email:$email
    }){
      id
      nom
      prenom
      email
    }
  }
`

const REMOVE_ADMIN=gql`
  mutation($id:String){
    supprimerBureauAdmine(id:$id){
      id
      nom
      prenom
      email
    }
  }
`

const ADD_BUREAU=gql`
  mutation($nom:String,$adresse:String,$ville:String,$pays:String,
    $numero_tele:String,$email:String,$admineId:String){
    ajouterBureau(bureauDTO:{
      nom:$nom,
      adresse:$adresse,
      ville:$ville,
      paye:$pays,
      numero_tele:$numero_tele,
      email:$email,
      admineId:$admineId
    }){
      id
      nom
      adresse
      ville
      paye
      numero_tele
      email
    }
  }
`

const UPDATE_BUREAU=gql`
  mutation($idBureau:String,$nom:String,$adresse:String,
    $ville:String,$paye:String,$numero_tele:String,
    $email:String,$adminId:String){
    modifierBureau(bureauDTO:{
      nom:$nom
      adresse:$adresse
      ville:$ville
      paye:$paye
      numero_tele:$numero_tele
      email:$email
      admineId:$adminId
    },id:$idBureau){
      id
      nom
      adresse
      ville
      paye
      numero_tele
      email
      admine{
        id
        nom
        prenom
        email
      }
    }
  }
`

const REMOVE_BUREAU=gql`
  mutation($id:String){
    supprimerBureau(id:$id){
      id
      nom
      adresse
      ville
      paye
      numero_tele
      email
      admine{
        id
        nom
        prenom
        email

      }
    }
  }
`
const ADD_COMPTE_UTILISATEUR=gql`
  mutation($id:String,$nom:String,$prenom:String,$email:String,
    $adresse:String,$ville:String,$pays:String,
    $telephone:String,$date_naissance:String,
    $actif:Boolean,$bureauId:String){
    ajouterCompteUtilisateurWithIdKeycloak(compteUtilisateurDTOWithId:{
      id:$id,
      nom:$nom,
      prenom:$prenom,
      email:$email,
      adresse:$adresse,
      ville:$ville,
      pays:$pays,
      telephone:$telephone,
      date_naissance:$date_naissance,
      actif:$actif,
      bureauId:$bureauId
    }){
      id
      nom
      prenom
      email
      adresse
      ville
      pays
      telephone
      date_naissance
      bureau{
        id
        nom
        adresse
        ville
        paye
        numero_tele
        email
        admine{
          id
          nom
          prenom
        }
      }

    }
  }
`

const REMOVE_COMPTE_UTILISATEUR=gql`
  mutation($id:String){
    supprimerCompteUtilisateur(id:$id){
      id
      nom
      prenom
      email
      adresse
      ville
      pays
      telephone
      date_naissance
      actif
      bureau{
        id
        nom
        adresse
      }
    }
  }
`

const ADD_KEYCLOAK_USER=gql`
  mutation($userName:String,$email:String,
    $pass:String,$firstName:String,$lastName:String){
    addUser(userKeycloak:{
      userName:$userName,
      email:$email,
      password:$pass,
      firstname:$firstName,
      lastName:$lastName
    })
  }
`

const ADD_USER_ROLE=gql`
  mutation($id:String){
    addUserRole(id:$id)
  }
`

const REMOVE_USER_ROLE=gql`
  mutation($id:String){
    removeUserRole(id:$id)
  }
`
const UPDATE_COMPTE_UTILISATEUR_ACTIF=gql`
  mutation($id:String,$actif:Boolean,){
    modifierCompteUtilisateur(compteUtilisateurDTO:{
      actif:$actif,
    },id:$id){
      id
      nom
      prenom
      email
      adresse
      ville
      pays
    }
  }
`
const UPDATE_COMPTE_UTILISATEUR=gql`
  mutation($idCOmpteUser:String,$nom:String,$prenom:String,$email:String,
    $adresse:String,$ville:String,$pays:String,
    $telephone:String,$date_naissance:String,$actif:Boolean,
    $bureauId:String){
    modifierCompteUtilisateur(compteUtilisateurDTO:{
      nom:$nom,
      prenom:$prenom,
      email:$email,
      adresse:$adresse,
      ville:$ville,
      pays:$pays,
      telephone:$telephone,
      date_naissance:$date_naissance,
      actif:$actif,
      bureauId:$bureauId
    },id:$idCOmpteUser){
      id
      nom
      prenom
      email
      adresse
      ville
      pays
    }
  }
`
const ADD_SOCIETE=gql`
  mutation($raison_social:String,$activite:String,
    $adresse:String,$compteUtilisateurId:String,
    $ville:String,$pays:String,$devise:String,
    $forme_juridique:String,$capital:Float,$telephone:String,
    $email:String,$site_internet:String,$num_dossier:String,
    $identifiant_TVA:String){
    ajouterSociete(societeDTO:{
      raison_social:$raison_social,
      activite:$activite,
      adresse:$adresse,
      compteUtilisateurId:$compteUtilisateurId,
      ville:$ville,
      pays:$pays,
      devise:$devise,
      forme_juridique:$forme_juridique,
      capital:$capital,
      telephone:$telephone,
      email:$email,
      site_internet:$site_internet,
      num_dossier:$num_dossier,
      identifiant_TVA:$identifiant_TVA
    }){
      id
      raison_social
      activite
      adresse
    }
  }
`
export {ADD_ROLE,REMOVE_ROLE,ADD_ADMIN,REMOVE_ADMIN,ADD_BUREAU,UPDATE_BUREAU,REMOVE_BUREAU,
  ADD_COMPTE_UTILISATEUR,REMOVE_COMPTE_UTILISATEUR,ADD_KEYCLOAK_USER,ADD_USER_ROLE,REMOVE_USER_ROLE,
  UPDATE_COMPTE_UTILISATEUR_ACTIF,UPDATE_COMPTE_UTILISATEUR,ADD_SOCIETE};
