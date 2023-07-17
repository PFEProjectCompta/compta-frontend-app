import gql from "graphql-tag";

const GET_ADMINE=gql`
  query{
    searchAll{
      id,
      userName,
      email,
      firstname,
      lastName,
      roles
    }
  }
`
const GET_USERNAME=gql`
  query{
    getUserName
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
const MESSAGES_CHAT=gql`
  query($senderId:String,$recipientId:String){
    findChatMessages(senderId:$senderId,recipientId:$recipientId){
      id
      chatId
      recipientId
      senderId
      content
      senderName
      recipientName
      timestamp
      status
    }
  }
`

const GET_BUREAUX=gql`
  query($id:String){
    bureauListByAdminId(id:$id){
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

const GET_BUREAU_BY_ID=gql`
  query($id:String){
    bureauById(id:$id){
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
const COUNT_NEW_MESSAGES=gql`
  query($senderId:String,$recipientId:String){
    countNewMessages(senderId:$senderId,recipientId:$recipientId)

  }
`

const GET_COMPTE_UTILISATEUR=gql`
  query($idBureau:String){
    compteUtilisateurListByBureauId(idBureau:$idBureau){
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

const GET_SOCIETE=gql`
  query($idUtilisateur:String){
    societeByIdUtilisateur(idUtilisateur:$idUtilisateur){
      id
      raison_social
      activite
      adresse
      compteUtilisateur{
        id
        nom
        prenom
      }
      ville
      pays
      devise
      forme_juridique
      capital
      telephone
      email
      site_internet
      num_dossier
      identifiant_TVA
    }
  }
`

const GET_SOCIETE_BY_ID=gql`
  query($idSociete:String){
    societeById(id:$idSociete){
      id
      raison_social
      activite
      adresse
      compteUtilisateur{
        id
        nom
        prenom
      }
      ville
      pays
      devise
      forme_juridique
      capital
      telephone
      email
      site_internet
      num_dossier
      identifiant_TVA
    }
  }
`

const GET_SOCIETE_MEMBERS=gql`
  query($id:String){
    membersList(id:$id){
      id
      societe{
        id
        raison_social
      }
      createur{
        id
        nom
        prenom
        email
      }
      member{
        id
        nom
        prenom
        email
      }
    }
  }
`

const GET_SOCIETE_SHARED=gql`
  query($id:String){
    membersListByMemberId(id:$id){
      id
      societe{
        id
        raison_social
        activite
        adresse
        ville
        identifiant_TVA
        pays
        compteUtilisateur{
          id
          prenom
          nom
        }
        devise
        forme_juridique
        capital
        telephone
        email
        site_internet
        num_dossier

      }
      createur{
        id
        nom
        prenom
      }
      member{
        id
        nom
        prenom
      }
    }
  }
`

const GET_COMPTES_GENERAUX_SOCIETE=gql`
  query($id:String){
    compteGeneralByIdSociete(id:$id){
      id
      idSociete
      natureCompte
      debutFaurchette
      finFaurchette
    }
  }
`
const GET_COMPTE_GENERAL_BY_ID=gql`
  query($id:String){
    compteGeneralById(id:$id){
      id
      natureCompte
      debutFaurchette
      finFaurchette
      idSociete
    }
  }
`
const GET_PLAN_COMPTABLE=gql`
  query($id:String){
    planComptableElementBySocieteId(id:$id){
      id
      numeroCompte
      intitule
      reporter
      societeId
      compteGeneral{
        id
        natureCompte
        debutFaurchette
        finFaurchette
      }
    }
  }
`
const GET_PLAN_COMPTABLE_BY_ID=gql`
  query($id:String){
    planComptableElementById(id:$id){
      id
      numeroCompte
      intitule
      reporter
      compteGeneral{
        id
        natureCompte
        debutFaurchette
        finFaurchette
        idSociete
      }
      societeId
    }
  }
`
export {GET_ADMINE,GET_EXERCICES,GET_USERNAME,MESSAGES_CHAT,COUNT_NEW_MESSAGES,GET_BUREAUX,
  GET_BUREAU_BY_ID,GET_COMPTE_UTILISATEUR,GET_SOCIETE,GET_SOCIETE_BY_ID,GET_SOCIETE_MEMBERS,
  GET_SOCIETE_SHARED,GET_COMPTES_GENERAUX_SOCIETE,GET_COMPTE_GENERAL_BY_ID,GET_PLAN_COMPTABLE,
  GET_PLAN_COMPTABLE_BY_ID}
