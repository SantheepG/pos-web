import React, { createContext, useContext, useState, useEffect } from "react";

import { collection, getDocs } from "firebase/firestore";
import { db } from "./FirebaseConfig";
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [data, setData] = useState({});
  const [items, setItems] = useState([]);
  const [sales, setSales] = useState([]);
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAllCollections = async () => {
      try {
        const collectionNames = ["products", "sales", "users"]; // Replace with your collection names
        const data = {};

        for (const name of collectionNames) {
          const querySnapshot = await getDocs(collection(db, name));
          data[name] = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
        }

        setData(data);
        setItems(data["products"]);
        setSales(data["sales"]);
        setUsers(data["users"]);
        console.log(data["products"]);
        console.log(data["sales"]);
        console.log(data["users"]);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching Firestore data:", error);
      }
    };

    fetchAllCollections();
  }, []);

  return (
    <AppContext.Provider value={{ items, sales, users }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
