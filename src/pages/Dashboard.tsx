import { useEffect, useState } from "react"
import { Category } from "../types/main";
import "../styles/Dashboard.css"
import { useUserDataContext } from "../App";
import axios from "axios";
import Cookies from 'js-cookie';


export default function Dashboard(){
    const {userData} = useUserDataContext();

    const [balance, _setBalance] = useState<number | undefined>(userData?.balance);

    const [categories, setCategories] = useState<Array<Category>>([]);
    const [isPopupVisible, setIsPopupVisible] = useState(false); // State to manage the visibility of the popup
    const [formData, setFormData] = useState({
        name: "",
        weight: "",
        balance: "",
    });

    useEffect(()=>{
        axios.get(import.meta.env.VITE_BACKEND_URL + "categories/" + String(userData?.userid),{'headers':{'x-api-key':Cookies.get("user-api-token")}})
        .then(result => {
            console.log(result.data);
            setCategories(result.data);
        })
    }, [])

    
    // Function to handle form submission
    function handleAddCategory(e: React.FormEvent) {
        e.preventDefault();
        // Process the form data and add it to your state/categories
        // You can customize this part based on your requirements

        // For example, add the new category to your state
        const newCategory: Category = {
            name: formData.name,
            weight: parseFloat(formData.weight),
            balance: parseFloat(formData.balance),
            userid: userData?.userid || 0,
        };

        // Update the categories state with the new category
        setCategories((prevCategories) => [...prevCategories, newCategory]);

        // Close the popup
        setIsPopupVisible(false);

        // Reset the form data
        setFormData({ name: "", weight: "", balance: "" });
    }

    function addExpense(_e: React.MouseEvent){

    }
    return (
        <div id="Dashboard">
            <div className="balance">Balance: ${balance && balance > 0 ? balance.toFixed(2) : (0).toFixed(2)}</div>
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
                <div className="cat-detail add" onClick={() => setIsPopupVisible(true)}>
                        <div style={{}}>+</div>
                        <div style={{}}>Add Another</div>
                </div>
            </div>

            
        </div>
    )
}