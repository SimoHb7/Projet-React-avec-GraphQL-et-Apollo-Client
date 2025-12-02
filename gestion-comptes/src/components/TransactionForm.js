import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_TRANSACTION } from '../graphql/mutations';
import { GET_ALL_COMPTES, GET_COMPTE_TRANSACTIONS, GET_ALL_TRANSACTIONS } from '../graphql/queries';
import { TypeTransaction } from '../graphql/types';

const TransactionForm = () => {
    const [montant, setMontant] = useState('');
    const [type, setType] = useState(TypeTransaction.DEPOT);
    const [compteId, setCompteId] = useState('');

    const { data: comptesData, loading: comptesLoading } = useQuery(GET_ALL_COMPTES);

    const [addTransaction] = useMutation(ADD_TRANSACTION, {
        refetchQueries: [{ query: GET_ALL_TRANSACTIONS }, { query: GET_COMPTE_TRANSACTIONS, variables: { id: compteId } }, { query: GET_ALL_COMPTES }],
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!compteId) {
            alert('Veuillez sélectionner un compte.');
            return;
        }
        try {
            await addTransaction({
                variables: {
                    transactionRequest: {
                        montant: parseFloat(montant),
                        type,
                        compteId,
                    },
                },
            });
            setMontant('');
        } catch (error) {
            console.error('Erreur lors de l\'ajout de la transaction :', error);
        }
    };

    if (comptesLoading) return <p>Chargement des comptes...</p>;

    return (
        <form onSubmit={handleSubmit}>
            <h3>Ajouter une transaction</h3>
            <label>
                Compte :
                <select value={compteId} onChange={(e) => setCompteId(e.target.value)} required>
                    <option value="">Sélectionnez un compte</option>
                    {comptesData &&
                        comptesData.allComptes.map((compte) => (
                            <option key={compte.id} value={compte.id}>
                                {compte.id} - {compte.type} ({compte.solde}€)
                            </option>
                        ))}
                </select>
            </label>
            <br />
            <label>
                Montant :
                <input
                    type="number"
                    value={montant}
                    onChange={(e) => setMontant(e.target.value)}
                    required
                    placeholder="Entrez le montant"
                />
            </label>
            <br />
            <label>
                Type :
                <select value={type} onChange={(e) => setType(e.target.value)} required>
                    <option value={TypeTransaction.DEPOT}>Dépôt</option>
                    <option value={TypeTransaction.RETRAIT}>Retrait</option>
                </select>
            </label>
            <br />
            <button type="submit">Ajouter</button>
        </form>
    );
};

export default TransactionForm;
