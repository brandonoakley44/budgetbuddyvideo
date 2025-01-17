import { TouchableOpacity , View, Text } from "react-native";
import { Category, Transaction } from "../types";
import TransactionListItem from "./TransactionListItem";


export default function TransactionsList({
    transactions,
    categories,
    deleteTransaction,
}: {
    categories: Category[];
    transactions: Transaction[];
    deleteTransaction: (id: number) => Promise<void>;
}) {
    return (
        <View style={{ gap: 15 }}>
            {transactions.map((transaction) => {

                const categoryForCurrentItem = categories.find(
                    (category) => category.id === transaction.category_id
                )

                return (
                    <TouchableOpacity
                    key={transaction.id}
                    activeOpacity={0.7}
                    onPress={() => deleteTransaction(transaction.id)}
                    >
                        {/** transaction item */}
                       <TransactionListItem transaction={transaction} categoryInfo={categoryForCurrentItem}  />
                    </TouchableOpacity>
                )
            })}
        </View>
    );
}