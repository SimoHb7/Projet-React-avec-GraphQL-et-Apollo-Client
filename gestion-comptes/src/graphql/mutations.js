import { gql } from '@apollo/client';

// Mutation pour créer un compte
export const SAVE_COMPTE = gql`
mutation SaveCompte($compte: CompteRequest!) {
    saveCompte(compte: $compte) {
        id
        solde
        dateCreation
        type
    }
}
`;

// Mutation pour supprimer un compte
export const DELETE_COMPTE = gql`
mutation DeleteCompte($id: ID!) {
    deleteCompte(id: $id)
}
`;

// Mutation pour ajouter une transaction
export const ADD_TRANSACTION = gql`
mutation AddTransaction($transactionRequest: TransactionRequest!) {
    addTransaction(transactionRequest: $transactionRequest) {
        id
        type
        montant
        date
        compte {
            id
            solde
            type
        }
    }
}
`;
