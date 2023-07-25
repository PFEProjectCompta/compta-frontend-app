import {Injectable} from "@angular/core";
import {KeycloakProfile} from "keycloak-js";
import {AdminService} from "../office-service/AdminService";
import {Observable} from "rxjs";
import {
  GET_AGENCE_BY_ID_SOCIETE,
  GET_AGENCE_ID,
  GET_CODE_JOURNAUX_BY_EXERCICE,
  GET_CODE_JOURNAUX_BY_ID,
  GET_EXERCICE_BY_ID,
  GET_EXERCICE_BY_ID_SOCIETE, GET_EXERCICE_ETAT,
  GET_JOURNAL_BY_ID,
  GET_JOURNAL_BY_SAISI_JOURNAL,
  GET_SAISIE_JOURNAL_BY_EXERCICE,
  GET_SAISIE_JOURNAL_BY_ID, IS_ALL_EXERCICE_OF_SOCIETE_CLOSE
} from "../../graphql/queries.graphql";
import {map} from "rxjs/operators";
import {Agence} from "../../components/models/banque-app/Agence";
import {
  AJOUTE_AGENCE, AJOUTE_ALL_SAISIE_JOURNAL,
  AJOUTE_CODE_JOURNAL,
  AJOUTE_EXERCICE, AJOUTE_EXERCICE_ETAT,
  AJOUTE_SAISIE_JOURNAL,
  AJOUTER_JOURNAL,
  MODIFIER_CODE_JOURNAL,
  MODIFIER_EXERCICE, MODIFIER_EXERCICE_ETAT,
  MODIFIER_JOURNAL,
  MODIFIER_SAISIE_JOURNAL, SUPPRIMER_AGENCE, SUPPRIMER_CODE_JOURNAL, SUPPRIMER_JOURNAL, SUPPRIMER_SAISIE_JOURNAL
} from "../../graphql/mutations.graphql";
import {Exercice} from "../../components/models/exercice-app/Exercice";
import {CodeJournal} from "../../components/models/exercice-app/CodeJournal";
import {SaisieJournal} from "../../components/models/exercice-app/SaisieJournal";
import {Journal} from "../../components/models/exercice-app/Journal";

@Injectable({
  providedIn: 'root'
})
export class ExerciceService{
  loading: boolean;
  public profile?: KeycloakProfile;
  constructor(public adminService:AdminService) {
    this.profile=adminService.profile;
  }
  loadExercice(idSociete): Observable<any[]> {
    return this.adminService.apollo.use('exercice')
      .watchQuery<any>({
        query: GET_EXERCICE_BY_ID_SOCIETE,
        variables:{
          id:idSociete
        }
      })
      .valueChanges.pipe(
        map(({ data, loading }) => {
          this.loading = loading;
          return data.fullExerciceListBySocieteId;
        })
      );
  }
  loadExerciceEtat(): Observable<any[]> {
    return this.adminService.apollo.use('exercice')
      .watchQuery<any>({
        query: GET_EXERCICE_ETAT,

      })
      .valueChanges.pipe(
        map(({ data, loading }) => {
          this.loading = loading;
          return data.exerciceEtatList;
        })
      );
  }
  loadCodeJournal(idExercice): Observable<any[]> {
    return this.adminService.apollo.use('exercice')
      .watchQuery<any>({
        query: GET_CODE_JOURNAUX_BY_EXERCICE,
        variables:{
          id:idExercice
        }
      })
      .valueChanges.pipe(
        map(({ data, loading }) => {
          this.loading = loading;
          return data.fullCodeJournalListByExerciceId;
        })
      );
  }
  loadSaisiJournal(idExercice): Observable<any[]> {
    return this.adminService.apollo.use('exercice')
      .watchQuery<any>({
        query: GET_SAISIE_JOURNAL_BY_EXERCICE,
        variables:{
          idExercice:idExercice
        }
      })
      .valueChanges.pipe(
        map(({ data, loading }) => {
          this.loading = loading;
          return data.saisieJournauxByExercice;
        })
      );
  }

  loadJournal(idSaisiJournal): Observable<any[]> {
    return this.adminService.apollo.use('exercice')
      .watchQuery<any>({
        query: GET_JOURNAL_BY_SAISI_JOURNAL,
        variables:{
          id:idSaisiJournal
        }
      })
      .valueChanges.pipe(
        map(({ data, loading }) => {
          this.loading = loading;
          return data.journaleBySaisieJournal;
        })
      );
  }

  exerciceById(idExercice): Observable<any[]> {
    return this.adminService.apollo.use('exercice')
      .watchQuery<any>({
        query: GET_EXERCICE_BY_ID,
        variables:{
          id:idExercice
        }
      })
      .valueChanges.pipe(
        map(({ data, loading }) => {
          this.loading = loading;
          return data.exerciceById;
        })
      );
  }
  codeJournalById(idCodeJournal): Observable<any[]> {
    return this.adminService.apollo.use('exercice')
      .watchQuery<any>({
        query: GET_CODE_JOURNAUX_BY_ID,
        variables:{
          id:idCodeJournal
        }
      })
      .valueChanges.pipe(
        map(({ data, loading }) => {
          this.loading = loading;
          return data.codeJournalById;
        })
      );
  }
  isAllExerciceCloseOfSocieteId(idSociete): Observable<any[]> {
    return this.adminService.apollo.use('exercice')
      .watchQuery<any>({
        query: IS_ALL_EXERCICE_OF_SOCIETE_CLOSE,
        variables:{
          id:idSociete
        }
      })
      .valueChanges.pipe(
        map(({ data, loading }) => {
          this.loading = loading;
          return data.idAllExerciceCloseOfSociete;
        })
      );
  }
  saisieJournalById(idSaisieJournal): Observable<any[]> {
    return this.adminService.apollo.use('exercice')
      .watchQuery<any>({
        query: GET_SAISIE_JOURNAL_BY_ID,
        variables:{
          id:idSaisieJournal
        }
      })
      .valueChanges.pipe(
        map(({ data, loading }) => {
          this.loading = loading;
          return data.saisieJournalById;
        })
      );
  }

  journaleById(idJournal): Observable<any[]> {
    return this.adminService.apollo.use('exercice')
      .watchQuery<any>({
        query: GET_JOURNAL_BY_ID,
        variables:{
          id:idJournal
        }
      })
      .valueChanges.pipe(
        map(({ data, loading }) => {
          this.loading = loading;
          return data.journaleById;
        })
      );
  }

  ajouterExercice(exercice:Exercice) : Promise<any> {
    return new Promise((resolve, reject) => {
      this.adminService.apollo.use('exercice')
        .mutate({
          mutation: AJOUTE_EXERCICE,
          variables: {
            date_debut:exercice.date_debut,
            date_fin:exercice.date_fin,
            societeId:exercice.societeId
          },context:{clientName:'agence'}
        })
        .subscribe(
          ({ data }) => {
            console.log('got data', data);
            resolve(data);
          },
          error => {
            console.log('there was an error sending the query', error);
            reject(error);
          },
        );
    });
  }
  ajouterExerciceEtat(exerciceId:string) {
    this.adminService.apollo.use('exercice')
      .mutate({
        mutation: AJOUTE_EXERCICE_ETAT,
        variables: {
          id:exerciceId
        },context:{clientName:'agence'}
      })
      .subscribe(
        ({ data }) => {
          console.log('got data', data);

        },
        error => {
          console.log('there was an error sending the query', error);
        },
      );
  }
  ajouterCodeJournal(codeJournal:CodeJournal)  : Promise<any> {
    return new Promise((resolve, reject) => {
      this.adminService.apollo.use('exercice')
        .mutate({
          mutation: AJOUTE_CODE_JOURNAL,
          variables: {
            code:codeJournal.code,
            intitule_journale:codeJournal.intitule_journale,
            type_journal:codeJournal.type_journal,
            exerciceId:codeJournal.exerciceId
          },context:{clientName:'agence'}
        })
        .subscribe(
          ({ data }) => {
            console.log('got data', data);
            resolve(data);
          },
          error => {
            console.log('there was an error sending the query', error);
            reject(error);

          },
        );
    });

  }
  ajouterSaisieJournal(saisieJournal:SaisieJournal) {
    this.adminService.apollo.use('exercice')
      .mutate({
        mutation: AJOUTE_SAISIE_JOURNAL,
        variables: {
          position:saisieJournal.position,
          periode:saisieJournal.periode,
          code:saisieJournal.code,
          intitule_journale:saisieJournal.intitule_journale,
          code_Journal_id:saisieJournal.code_Journal_id
        },context:{clientName:'agence'}
      })
      .subscribe(
        ({ data }) => {
          console.log('got data', data);

        },
        error => {
          console.log('there was an error sending the query', error);
        },
      );
  }
  ajouterAllSaisieJournal(idCodeJournal:string) {
    this.adminService.apollo.use('exercice')
      .mutate({
        mutation: AJOUTE_ALL_SAISIE_JOURNAL,
        variables: {
          id:idCodeJournal
        },context:{clientName:'agence'}
      })
      .subscribe(
        ({ data }) => {
          console.log('got data', data);

        },
        error => {
          console.log('there was an error sending the query', error);
        },
      );
  }
  ajouterJournal(journal:Journal) {
    this.adminService.apollo.use('exercice')
      .mutate({
        mutation: AJOUTER_JOURNAL,
        variables: {
          jour:journal.jour,
          numFacture:journal.numFacture,
          ref:journal.ref,
          numCompteId:journal.numCompteId,
          numCompteTiereId:journal.numCompteTiereId,
          libelle:journal.libelle,
          credit:journal.credit,
          debit:journal.debit,
          saisieJournauxId:journal.saisieJournauxId
        },context:{clientName:'agence'}
      })
      .subscribe(
        ({ data }) => {
          console.log('got data', data);

        },
        error => {
          console.log('there was an error sending the query', error);
        },
      );
  }

  modifierExercice(idExercice:string ,exercice:Exercice) {
    this.adminService.apollo.use('exercice')
      .mutate({
        mutation: MODIFIER_EXERCICE,
        variables: {
          id:idExercice,
          date_debut:exercice.date_debut,
          date_fin:exercice.date_fin,
          societeId:exercice.societeId
        },context:{clientName:'agence'}
      })
      .subscribe(
        ({ data }) => {
          console.log('got data', data);

        },
        error => {
          console.log('there was an error sending the query', error);
        },
      );
  }
  modifierExerciceEtat(idExercice:string ,etat:boolean) {
    this.adminService.apollo.use('exercice')
      .mutate({
        mutation: MODIFIER_EXERCICE_ETAT,
        variables: {
          id:idExercice,
          isFermer:etat
        }
      })
      .subscribe(
        ({ data }) => {
          console.log('got data', data);

        },
        error => {
          console.log('there was an error sending the query', error);
        },
      );
  }
  modifierCodeJournal(id:string,codeJournal:CodeJournal) {
    this.adminService.apollo.use('exercice')
      .mutate({
        mutation: MODIFIER_CODE_JOURNAL,
        variables: {
          id:id,
          code:codeJournal.code,
          intitule_journale:codeJournal.intitule_journale,
          type_journal:codeJournal.type_journal,
          exerciceId:codeJournal.exerciceId
        },context:{clientName:'agence'}
      })
      .subscribe(
        ({ data }) => {
          console.log('got data', data);

        },
        error => {
          console.log('there was an error sending the query', error);
        },
      );
  }
  modifierSaisieJournal(id:string,saisieJournal:SaisieJournal) {
    this.adminService.apollo.use('exercice')
      .mutate({
        mutation: MODIFIER_SAISIE_JOURNAL,
        variables: {
          id:id,
          position:saisieJournal.position,
          periode:saisieJournal.periode,
          code:saisieJournal.code,
          intitule_journale:saisieJournal.intitule_journale,
          code_Journal_id:saisieJournal.code_Journal_id
        },context:{clientName:'agence'}
      })
      .subscribe(
        ({ data }) => {
          console.log('got data', data);

        },
        error => {
          console.log('there was an error sending the query', error);
        },
      );
  }
  modifierJournal(id:string,journal:Journal) {
    this.adminService.apollo.use('exercice')
      .mutate({
        mutation: MODIFIER_JOURNAL,
        variables: {
          id:id,
          jour:journal.jour,
          numFacture:journal.numFacture,
          ref:journal.ref,
          numCompteId:journal.numCompteId,
          numCompteTiereId:journal.numCompteTiereId,
          libelle:journal.libelle,
          credit:journal.credit,
          debit:journal.debit,
          saisieJournauxId:journal.saisieJournauxId
        },context:{clientName:'agence'}
      })
      .subscribe(
        ({ data }) => {
          console.log('got data', data);

        },
        error => {
          console.log('there was an error sending the query', error);
        },
      );
  }

  supprimerCodeJournal(idCodeJournal:string) {
    this.adminService.apollo.use('exercice')
      .mutate({
        mutation: SUPPRIMER_CODE_JOURNAL,
        variables: {
          id:idCodeJournal,
        },context:{clientName:'agence'}
      })
      .subscribe(
        ({ data }) => {
          console.log('got data', data);

        },
        error => {
          console.log('there was an error sending the query', error);
        },
      );
  }
  supprimerSaisieJournal(idSaisieJournal:string) {
    this.adminService.apollo.use('exercice')
      .mutate({
        mutation: SUPPRIMER_SAISIE_JOURNAL,
        variables: {
          id:idSaisieJournal,
        },context:{clientName:'agence'}
      })
      .subscribe(
        ({ data }) => {
          console.log('got data', data);

        },
        error => {
          console.log('there was an error sending the query', error);
        },
      );
  }
  supprimerJournal(idJournal:string) {
    this.adminService.apollo.use('exercice')
      .mutate({
        mutation: SUPPRIMER_JOURNAL,
        variables: {
          id:idJournal,
        },context:{clientName:'agence'}
      })
      .subscribe(
        ({ data }) => {
          console.log('got data', data);

        },
        error => {
          console.log('there was an error sending the query', error);
        },
      );
  }
}
