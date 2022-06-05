import React, {useContext, useEffect, useState} from 'react';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import {styled} from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Dataservices from './Dataservices';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { DataContext } from './DataProvider';


export default function AddProduct() {

    const { id } = useParams();
    const value = useContext(DataContext);
    const [products] = value.products;
    const [productUrl, setProductUrl] = useState('');

    const details = products.filter((product) => product.pid == id)

    const [values, setValues] = React.useState({
        imgUrl: '',
        title: '',
        description: '',
        price: '',
    });
    const [productTitle, setProductTitle] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productContent, setProductContent] = useState('');
    const [baseImage, setBaseImage] = useState("");
    
    const handleChange = (prop) => (event) => {
        setValues({...values, [prop]: event.target.value});
    };

    useEffect(()=>{
        setProductTitle(details[0].title)
        setProductDescription(details[0].description)
        setProductPrice(details[0].price)
        setProductUrl(details[0].image)
        setProductContent(details[0].content)
    },[])

    const styles = {

        largeIcon: {
            width: 30,
            height: 30,
            marginRight: 3
        },
        backgroundImage: {
            width: '500px',
            borderRadius: 0,
            backgroundColor: 'none'
        }

    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const rr = {pid:details[0].pid,title:productTitle,image:"image",description:productDescription,content:"ssss",price:productPrice,count:"1"}
        Dataservices.updateProduct(rr)
    }
    const uploadImage = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        setBaseImage(base64);
      };
    
      const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
    
          fileReader.onload = () => {
            resolve(fileReader.result);
          };
    
          fileReader.onerror = (error) => {
            reject(error);
          };
        });
      };
    
    const Input = styled('input')({
        display: 'none',
    });


    return (
        <section>
            <div className="landing-box"
                 style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', textAlign: 'start'}}>
                <div>
                    <img style={styles.backgroundImage} src={productUrl ? productUrl : "bg.png"} alt="landing-pic"/>
                </div>
                <div>
                    <h1>Add New Product</h1>
                    <p>Add some information for the product you want to create.</p>
                    <br/>
                    <form onSubmit={handleSubmit} autoComplete="off" noValidate>
                        <label htmlFor="contained-button-file">       
                        </label>
                        <FormControl fullWidth sx={{m: 1}} variant="outlined">
                            <TextField fullWidth id="productUrl" label="Url of product" variant="outlined" value={productUrl} onChange={event => setProductUrl(event.target.value)} />
                            <TextField fullWidth id="newProductTitle" label="Title of the Product" variant="outlined" onChange={event => setProductTitle(event.target.value)} value={productTitle}/>
                 
                            <TextField
                                fullWidth
                                id="outlined-multiline-static"
                                label="Description"
                                multiline
                                rows={4}
                                value={productDescription}
                                onChange={event => setProductDescription(event.target.value)}
                            />
                            <TextField fullWidth id="productContent" label="Content" variant="outlined" value={productContent} onChange={event => setProductContent(event.target.value)} />
                 
                            <FormControl fullWidth sx={{m: 1}} style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <TextField sx={{width: '25ch'}} id="outlined-basic" value={productPrice} label="Price" variant="outlined"
                                    onChange={event => setProductPrice(event.target.value)} style={{
                                    margin: '15px 0 0 0',
                                    padding: '0'
                                }}/>
                                <button type="submit" className="form-btn" style={{fontSize: '18px'}}>
                                    Update Product
                                </button>
                                <br/>
                            </FormControl>
                        </FormControl>

                    </form>
                </div>


            </div>

        </section>
    )
}
