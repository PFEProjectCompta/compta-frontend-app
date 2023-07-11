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
export {GET_ADMINE,GET_EXERCICES,GET_USERNAME,MESSAGES_CHAT,COUNT_NEW_MESSAGES,GET_BUREAUX,GET_BUREAU_BY_ID,GET_COMPTE_UTILISATEUR}
