import React, { createContext, useContext, useState, useEffect } from "react";

import { collection, getDocs } from "firebase/firestore";
import { db } from "./FirebaseConfig";
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [items, setItems] = useState(null);
  const [sales, setSales] = useState(null);
  const [users, setUsers] = useState(null);
  const [fetchItems, setFetchItems] = useState(true);
  const [fetchSales, setFetchSales] = useState(true);
  const [fetchUsers, setFetchUsers] = useState(true);
  const [alerts, setAlerts] = useState([]);

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const products = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setItems(products);
        const lowStockItems = Array.from(products).filter(
          (item) => item.stock === 0 || item.stock < 5
        );
        setAlerts(lowStockItems);
        setFetchItems(false);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching Firestore items:", error);
      }
    };

    fetchItems();
  }, [fetchItems]);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "sales"));
        const sales = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setSales(sales);
        setFetchSales(false);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching Firestore items:", error);
      }
    };
    fetchSales();
  }, [fetchSales]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const email = localStorage.getItem("email");
        const querySnapshot = await getDocs(collection(db, "users"));
        const users = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const filteredUsers = users.filter((user) => user.email !== email);
        setUsers(filteredUsers);
        const adminUser = users.find((user) => user.email === email);
        setAdmin(adminUser);

        setFetchUsers(false);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching Firestore items:", error);
      }
    };
    fetchUsers();
  }, [fetchUsers]);

  const refetchItems = () => {
    setFetchItems(true);
  };
  const refetchSales = () => {
    setFetchSales(true);
  };
  const refetchUsers = () => {
    setFetchUsers(true);
  };

  return (
    <AppContext.Provider
      value={{
        items,
        sales,
        users,
        alerts,
        admin,
        refetchItems,
        refetchSales,
        refetchUsers,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
