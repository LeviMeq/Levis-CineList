import React, { createContext, useState } from 'react';

// Créez le contexte
export const MyContext = createContext();

// Créez le fournisseur de contexte
export const MyProvider = ({ children }) => {

  const getLocalStorageExcludingLang = () => {
    const storageArray = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key !== 'LANGUAGE_STORAGE') {
        try {
          const value = JSON.parse(localStorage.getItem(key));
          storageArray.push(value);
        } catch (e) {
          storageArray.push(localStorage.getItem(key));
        }
      }
    }
    return storageArray;
  };
  
  // Appelle la fonction pour obtenir les données filtrées
  const filteredStorageArray = getLocalStorageExcludingLang();
  const stringifiedArray = filteredStorageArray.map(item => JSON.stringify(item));

  const getLang = () => {
    return localStorage.getItem('LANGUAGE_STORAGE') || 'fr-FR'; // Si aucune langue n'est définie, retourner 'fr-FR'
  };
  
  // Initialisation de l'état avec la langue et les données du localStorage
 const [state, setState] = useState({
  key: 'storage',
  data: stringifiedArray, // Récupère les films stockés
  lang: getLang(), // Récupère la langue
});
  
  // Fonction pour changer la langue
  const changeLang = (newLang) => {
    saveLang(newLang);
    setState((prevState) => ({
      ...prevState,
      lang: newLang,
    }));
  };

  return (
    <MyContext.Provider value={{ state, setState, changeLang, getLocalStorageExcludingLang, stringifiedArray }}>
      {children}
    </MyContext.Provider>
  );
};
