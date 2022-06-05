import { useState ,useContext} from "react";
import {DataContext} from "../DataProvider";

const useForm = (validate) => {
    const [values, setValues] = useState({ username: "", email: "", password: "" });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const value = useContext(DataContext);
    const [users] = value.users;

    const handleInput = event => {
        const { name, value } = event.target;
        setValues({
            ...values,
            [name]: value
        });
    };

    const handleSubmit = event => {
        event.preventDefault();
        setErrors(validate(values));
        users.forEach(user => {
            if(user.username==values.username && user.email==values.email && user.password == values.password){
                setIsSubmitting(true);
                value.setCurrentUser(user)
                localStorage.setItem("productUser674",JSON.stringify(user))
            }
        })
    };

    return {
        handleInput,
        handleSubmit,
        values,
        errors,
        isSubmitting
    };
};

export default useForm;
