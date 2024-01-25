import { useState } from "react"
import { Category } from "../types/main";
import "../styles/Dashboard.css"

export default function Dashboard(){
    const [balance, setBalance] = useState<number>(100.67);
    const [categories, setCategories] = useState<Array<Category>>([
        {
            "userid": 1,
            "name": "Savings",
            "weight": 0.1,
            "balance": 100.5
        },
        {
            "userid": 1,
            "name": "Savings",
            "weight": 0.1,
            "balance": 100.5
        },
        {
            "userid": 1,
            "name": "Savings",
            "weight": 0.1,
            "balance": 100.5
        },
        {
            "userid": 1,
            "name": "Savings",
            "weight": 0.1,
            "balance": 100.5
        }
    ]);

    function addExpense(_e: React.MouseEvent){

    }
    return (
        <div id="Dashboard">
            <div className="balance">Balance: ${balance > 0 ? balance.toFixed(2) : (0).toFixed(2)}</div>
            <div className="account-actions">
                <div className="button expense" onClick={addExpense}>+ Add Expense</div>
                <div className="button income">+ Add Income</div>
            </div>
            <div className="categories-container">
                {categories.map(details => (
                    <div className="cat-detail">
                        <div className="cat-name">{details.name}</div>
                        <div className="cat-amount">${details.balance.toFixed(2)}</div>
                        <div className="cat-filter">Filters Set: {100*details.weight}% income</div>
                    </div>
                ))}
                <div className="cat-detail add">
                        <div style={{}}>+</div>
                        <div style={{}}>Add Another</div>
                </div>
            </div>
        </div>
    )
}