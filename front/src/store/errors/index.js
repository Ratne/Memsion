import state from "./state";
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

const errors = {
    state: state, // tutto ciò che ci serve ad esempio dell'utente
    getters: getters, // i get della classe ti fanno uscire il dato che serve, ad esempio getToken ci ritorna il valore del Token
    actions: actions, // servono per gestire qualcosa di asincrono oppure richiamare un insieme di altre mutation e azioni
    // ad esempio il logout, facciamo finta di avere token e user. Quando facciamo il logout dispiacciamo due azioni
    // il resetUser per cancellare le informazioni e l'altro è resetToken per cancellare il token. Queste due operazioni
    // dobbiamo farla dopo la chiamata al backend e queste azioni che possono essere asincrone che vanno a chiamare
    // le mutation dopo che finiscono il loro compito
    mutations: mutations // lo stato di per sè non dovrebbe essere modificato, per poterlo fare si usano le mutation, perchè prendono
    // delle variabioi in ingresso ed effettuano operazioni. Ad esempio setToken
}
// lo stato definiamo all'interno dello store le proprietà da gestire
// getters le funzioni che ci ritornano i valori delle proprietà
// le mutation sono le funzioni che ci consentono con dei dati in ingresso di cambiare i valori delle proprietà dentro lo store quindi dello state
// le action chiameremo altre mutation o altre azioni che ci permettono di gestire le chiamate asincrone
export default errors;