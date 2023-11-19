import React, { useState, useEffect } from 'react'
import * as Yup from "yup";
import axios from "axios";


const formSchema = Yup.object().shape({
    name: Yup.string()
        .required("Name and surname is required")
        .min(5, "Name and surname lengths must be at least required"),
    email: Yup.string().email("Invalid email"),
    password: Yup.string().required("Password is required")
        .min(5, "Minimum password should be characters"),
    tc: Yup.boolean().oneOf([true], "Terms and Conditions must be accepted"),
});

const Form = ({users, setUsers}) => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        tc: false,
    });

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        tc: "",
    });
    const [buttonDisabled, setButtonDisabled] = useState(true);

    useEffect(() => {
        formSchema.isValid(formData).then((valid) => {
            setButtonDisabled(!valid);
        });
    }, [formData]);

    const handleFormDataChange = (e) => {
        
        let name = e.target.name;
        let value = e.target.name === "tc" ? e.target.checked : e.target.value;
        setFormData({...formData,[name]: value});

        Yup.reach(formSchema, name)
            .validate(value)
            .then((valid) => {
                if (valid) setErrors({ ...errors, [name]: "" });
            })
            .catch((err) => {
                setErrors({
                    ...errors,
                    [name]: err.errors[0]
                });
            });

        
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("https://reqres.in/api/users", formData)
            .then((res) => {
                setUsers([...users, res.data])
            })
            .catch((err) => console.error(err));
    }
    const handleUsers = () => {
        axios
            .get("https://reqres.in/api/users")
            .then((res) => {
                console.log(res.data.data);
            })
            .catch((err) => console.error(err));
    }

    return (
        <div>
            <form>
                    <div >
                    <label>
                        Ad Soyad&nbsp;
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleFormDataChange}
                        />
                    </label>
                    
                    {errors.name ? <p style={{ color: "red" }}>{errors.name}</p> : null }
                    </div>
                    <div className='input-error email-vlaidation-msg' >
                    <label>
                        Email&nbsp;
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleFormDataChange}
                        />
                    </label>
                    {errors.email ? <p style={{ color: "red" }}>{errors.email}</p> : null}
                    </div>
                    <div>
                    <label>
                        Password&nbsp;
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleFormDataChange}
                        />
                    </label>
                    {errors.password ? <p style={{ color: "red" }}>{errors.password}</p> : null}
                    </div>
                    <div>
                    <label>
                        <input
                            type="checkbox"
                            name="tc"
                            onChange={handleFormDataChange}
                            checked={formData.tc}
                        />
                        I accept Term and Conditon
                    </label>
                    {errors.tc ? <p style={{ color: "red" }}>{errors.tc}</p> : null}
                    </div>
                    <div>
                    <input
                        type="submit"
                        disabled={buttonDisabled}
                        onClick={handleSubmit}
                    />
                   </div>
            </form>
            <button id="user-form-btn" onClick={handleUsers}>Kullanicilar</button>
        </div>
    )
}

export default Form
