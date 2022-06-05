import React, { useState, useContext, useEffect } from 'react';
import { Link } from "react-router-dom";
import { DataContext } from "./DataProvider";
import Swal from 'sweetalert2'
import Dataservices from './Dataservices';


export default function Cart() {

    const value = useContext(DataContext);
    const [cart, setCart] = value.cart;
    const [total, setTotal] = useState(0);
    const [allItemCost, setAllItemCost] = useState(0);

    useEffect(() => {

        const getTotal = () => {

            let result = cart.reduce((prev, item) => {
                return prev + (item.price * item.count)
            }, 0)

            setAllItemCost(result);
            let flag = false;
            if (result < 1000 && flag === false) {
                flag = true;
                result = result + 100;
                setTotal(result);
            }
            else if (result > 1000 && flag === true) {
                flag = false;
                result = result - 100;
                setTotal(result);
            }
            else {
                setTotal(result);
            }
        }

        getTotal();
    }, [cart])

    const increaseProduct = id => {
        cart.forEach(item => {
            if (item.pid === id) {
                item.count += 1;
            }
        })
        setCart([...cart]);
    }

    const decreaseProduct = id => {
        cart.forEach(item => {
            if (item.pid === id) {
                item.count === 1 ? item.count = 1 : item.count -= 1;
            }
        })
        setCart([...cart]);
    }

    const placeOrder = ()=>{
        Dataservices.createOrder({id:Date.now(),customer:value.currentUser[0],order:cart}).then(res => {
            if(res){
                value.setCart([]) 
            }
        })
    }

    const removeProduct = id => {
       const removeItem = Swal.fire({
           position: 'center',
           icon: 'success',
           title: 'Product has been removed Successfully',
           showConfirmButton: false,
           timer: 1500
       })
        if (removeItem) {
        // if (window.confirm("Are you sure to remove this product ?")) {
            cart.forEach((item, index) => {
                if (item.pid === id) {
                    cart.splice(index, 1)
                    item.count = 1;
                }
            })
            setCart([...cart]);
        }
    }

    if (cart.length === 0)
        return <section id="cart-section">Cart is Empty ...!!! </section>

    return (
        <section>
            <div className="cart">
                <div className="cart-box">
                    {
                        cart.map(product => (
                            <div className="card" key={product.pid}>
                                <div className="card-img" style={{ backgroundImage: `url(${product.image})` }} />

                                <div className="card-content">
                                    <p title={product.title}>{product.title}</p>
                                    <h3>&#36; {product.price}</h3>

                                    <div className="amount">
                                        <button className="count" onClick={() => decreaseProduct(product.pid)}> - </button>
                                        <span>{product.count}</span>
                                        <button className="count" onClick={() => increaseProduct(product.pid)}> + </button>
                                    </div>

                                    <button className="delete" onClick={() => removeProduct(product.pid)}>Remove</button>
                                </div>
                            </div>
                        ))
                    }
                </div>

                <div className="checkout">
                    <p className="heading">Price Details</p>

                    <div className="price">
                        <p>Price: </p><p>&#36; {allItemCost.toLocaleString()}</p>
                    </div>

                    <div className="delivery">
                        <p>Delivery Charges: </p>{allItemCost < 1000 ? (<p>&#36; 100</p>) : (<p>Free</p>)}
                    </div>

                    <div className="total">
                        <p>Total: </p><p>&#36; {total.toLocaleString()}</p>
                    </div>
                    
                    {value.currentUser[0] ? <Link to="/" onClick={placeOrder} className="checkout-btn">Place Order</Link> : <Link to="/login" className="checkout-btn">Place Order</Link>}
                    <small>*Free Delivery for orders above &#36;1000 </small>
                </div>

            </div>

        </section>
    )
}
