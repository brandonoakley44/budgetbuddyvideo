import { TouchableOpacity , View, Text } from "react-native";
import { Category, Transaction } from "../types";


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
        <View>
            {transactions.map((transaction) => {
                return (
                    <TouchableOpacity
                    key={transaction.id}
                    activeOpacity={0.7}
                    onPress={() => deleteTransaction(transaction.id)}
                    >
                        {/** transaction item */}
                        <Text>{transaction.description} amount: { transaction.amount} </Text>
                    </TouchableOpacity>
                )
            })}
        </View>
    );
}