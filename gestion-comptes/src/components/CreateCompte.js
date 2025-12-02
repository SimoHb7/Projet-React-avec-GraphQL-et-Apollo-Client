import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SAVE_COMPTE } from '../graphql/mutations';
import { GET_ALL_COMPTES } from '../graphql/queries';

const CreateCompte = () => {
    const [solde, setSolde] = useState('');
    const [type, setType] = useState('COURANT');

    const [saveCompte] = useMutation(SAVE_COMPTE, {
        refetchQueries: [{ query: GET_ALL_COMPTES }],
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await saveCompte({
                variables: {
                    compte: {
                        solde: parseFloat(solde),
                        type,
                    },
                },
            });
            setSolde('');
            setType('COURANT');
        } catch (error) {
            console.error('Erreur lors de la création du compte :', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Solde :
                <input
                    type="number"
                    value={solde}
                    onChange={(e) => setSolde(e.target.value)}
                    required
                    placeholder="Entrez le solde initial"
                />
            </label>
            <br />
            <label>
                Type :
                <select value={type} onChange={(e) => setType(e.target.value)} required>
                    <option value="COURANT">Courant</option>
                    <option value="EPARGNE">Épargne</option>
                </select>
            </label>
            <br />
            <button type="submit">Créer un compte</button>
        </form>
    );
};

export default CreateCompte;
