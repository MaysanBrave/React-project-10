import React, { createContext, useState, useEffect } from 'react';
import Dataservices from './Dataservices';


export const DataContext = createContext();

export const DataProvider = (props) => {

    const [products, setProducts] = useState([]);
    const [users,setUsers] = useState([]);
    const [currentUser,setCurrentUser] = useState(localStorage.getItem("productUser674") ? JSON.parse(localStorage.getItem("productUser674")) : null)
    const [orders,setOrders] = useState([])
    const [cart, setCart] = useState([]);

    const getData = async () => {
        Dataservices.getAllUsers().then(res=>{
            setUsers(res.data);
        })
        Dataservices.getAllProducts().then(res=>{
            setProducts(res.data);
        })
        Dataservices.getAllOrders().then(res=>{
            setOrders(res.data);
        })
    }

    useEffect(() => {
        getData()
    }, [cart])


    const addCart = (id) => {
        const check = cart.every(item => {
            return item.pid !== id;
        })

        if (check) {
            const data = products.filter(product => {
                return product.pid === id;
            })
            setCart([...cart, ...data]);
        }
        else {
            alert("Product has been added to cart.");
        }
    }

    useEffect(() => {

        const storageCart = JSON.parse(localStorage.getItem("storageCart"));

        if (storageCart) {
            setCart(storageCart);
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("storageCart", JSON.stringify(cart));
    }, [cart,products])

    const value = {
        products: [products, setProducts],
        users:[users,setUsers],
        cart: [cart, setCart],
        currentUser : [currentUser,setCurrentUser],
        addCart: addCart,
        setCart:setCart,
        setCurrentUser:setCurrentUser,
        orders:[orders,setOrders],
        setOrders:setOrders,
        setProducts:setProducts
    }
    return (
        <DataContext.Provider value={value}>
            {props.children}
        </DataContext.Provider>
    )
}
