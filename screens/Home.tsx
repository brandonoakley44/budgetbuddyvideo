import { useEffect, useState } from "react";
import { View  , Text, ScrollView} from "react-native";
import { Category, Transaction } from "../types";
import { useSQLiteContext } from "expo-sqlite";
import TransactionsList from "../components/TransactionsList";

export default function Home() {

    const [ categories, setCategories ] = useState<Category[]>([]);
    const [ transactions, setTransactions ] = useState<Transaction[]>([]);
    
    const db = useSQLiteContext();

    useEffect(() => {
        db.withTransactionAsync(async () => {
            await getData();
        })
    }, [db])


    async function getData() {
        const result = await db.getAllAsync<Transaction>(`SELECT * FROM Transactions ORDER BY date DESC;`);
        setTransactions(result);
        console.log(result);
    }

    async function deleteTransaction(id: number) {
        db.withTransactionSync(async () => {
            await db.runAsync( `DELETE FROM Transactions WHERE id = ?;`, [id])
            await getData();    // so it re-renders
        })
    }

    return (
        <ScrollView contentContainerStyle={{ padding: 15, paddingVertical: 170 }}>
            <TransactionsList
            categories={categories}
            transactions={transactions}
            deleteTransaction={deleteTransaction}

            />
        </ScrollView>
    )
}