import React, { useContext, useEffect } from 'react';
import useForm from "./useForm";
import validate from "./Validation";
import FormSuccess from "./FormSuccess";
import { DataContext } from '../DataProvider';


export default function Login() {
    const value = useContext(DataContext)
    const { handleInput, handleSubmit, values, errors, isSubmitting } = useForm(validate);
    useEffect(()=>{
        // console.log(value.currentUser)
    },[])

    return (
        <section>
            { (isSubmitting) ? (<FormSuccess name={values.username} />) :
                (<div className="form-container">
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit} autoComplete="off" noValidate>
                        <div className="form-input">
                            <label>Name</label>
                            <input name="username" type="text" onChange={handleInput} value={values.username} />
                        </div>

                        <div className="form-input">
                            <label>Email</label>
                            <input name="email" type="text" onChange={handleInput} value={values.email} />
                        </div>

                        <div className="form-input">
                            <label>Password</label>
                            <input name="password" type="password" onChange={handleInput} value={values.password} />
                        </div>

                        <button type="submit" className="form-btn">Login</button><br />
                    </form>
                </div>)}
        </section>
    )
}
