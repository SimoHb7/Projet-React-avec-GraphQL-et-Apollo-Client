import React from "react";
import { useQuery } from '@apollo/client';
import { GET_ALL_COMPTES } from "../graphql/queries";

const CompteList = () => {
    const { loading, error, data } = useQuery(GET_ALL_COMPTES);

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>Erreur : {error.message}</p>;

    return (
        <div>
            <h2>Liste des Comptes</h2>
            {data.allComptes.map((compte) => (
                <div key={compte.id}>
                    <p>ID: {compte.id}</p>
                    <p>Solde: {compte.solde}€</p>
                    <p>Date de création: {new Date(compte.dateCreation).toLocaleDateString()}</p>
                    <p>Type: {compte.type}</p>
                </div>
            ))}
        </div>
    );
};

export default CompteList;
