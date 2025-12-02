import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_TRANSACTIONS } from '../graphql/queries';

const TransactionList = () => {
    const { loading, error, data } = useQuery(GET_ALL_TRANSACTIONS);

    if (loading) return <p>Chargement des transactions...</p>;
    if (error) return <p>Erreur : {error.message}</p>;

    return (
        <div>
            <h2>Historique des Transactions</h2>
            {data.allTransactions.map((transaction) => (
                <div key={transaction.id}>
                    <p>ID: {transaction.id}</p>
                    <p>Type: {transaction.type}</p>
                    <p>Montant: {transaction.montant}€</p>
                    <p>Date: {new Date(transaction.date).toLocaleString()}</p>
                    <p>Compte: {transaction.compte.id}</p>
                </div>
            ))}
        </div>
    );
};

export default TransactionList;
