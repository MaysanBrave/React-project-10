import React, { useState, useContext, useEffect } from 'react';
import { Link } from "react-router-dom";
import { DataContext } from "./DataProvider";
import Swal from 'sweetalert2'
import Dataservices from './Dataservices';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';


export default function OrderDetails() {

    const value = useContext(DataContext);
    const { id } = useParams();
    const [orders] = value.orders;
    const details = orders.filter((order) => order.id == id)    
    const [cart,setCart] = useState([]);
    useEffect(() => {
        setCart(details[0].order)
    }, [cart])

    console.log(cart);

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
                                </div>
                            </div>
                        ))
                    }
                </div>


            </div>

        </section>
    )
}
