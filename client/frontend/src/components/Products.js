import React, {useContext} from 'react';
import {DataContext} from "./DataProvider";
import {Link} from "react-router-dom";


export default function Products(props) {
    const value = useContext(DataContext);
    const [products] = value.products;
    const addCart = value.addCart;

    const styles = {
        btnStyle:{
            marginLeft : '10px',
            marginTop : '10px',
            backgroundColor : 'black',
            widths : '20%',
            borderRadius : '20px'
        },
        content :{
            textAlign: 'center',
        padding: '5px 20px',
        backgroundColor: 'white',
        boxShadow: '3px -5px 29px -7px rgb(0 0 0 / 30%)',
        borderRadius: '30px 30px 0px 0px',
        paddingBottom: '20px',
            marginBottom : '0'
        },
        productCards:{
            width: '300px',
            height : 'auto',
            padding: '0px',
            display: 'flex',
            flexDirection: 'column',

        }
    };



    return (
        <section>
            <div className="products">
                {
                    products.filter(product => {
                        if (product.title.toLowerCase().includes(props.search.toLowerCase())) {
                            return product;
                        } else {
                            return false;
                        }

                    }).map(product => (        
                        <div className="products-card" key={product.pid} style={styles.productCards} >
                           <div >
                               <Link to={`/products/${product.pid}`} >
                                   <img src={product.image} alt="cover-pic" />
                               </Link>
                           </div>
                            <div className="products-content" style={styles.content} >
                                <h3 title={product.title}>
                                    <Link to={`/products/${product.pid}`}>{product.title}</Link>
                                </h3>
                                <p className="products-desc">{product.description}</p>
                                <div style={{display : 'flex', flexDirection : 'row', justifyContent :  'space-around', alignItems : 'center',padding : '5px 10px'}}>
                                    <p className="products-price">&#36; {product.price}</p>
                                    {props.isAdmin && <button onClick={() => {addCart(product.pid)}} style={styles.btnStyle}>Add to Cart</button>}
                                </div>
                            </div>
                        </div>


                    ))
                }

            </div>
        </section>
    )
}
