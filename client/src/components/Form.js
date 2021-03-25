import React, { useEffect, useState } from 'react';

export default function Form(props) {
    const [data, setData] = useState([]);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if(data.length > 0 && errors.length > 0) {
            setData([...data, {
                name: "",
                email: "",
                mobile: "",
                password: "",
                repassword: "",
            }]);
            setErrors([...errors, {
                name: "",
                email: "",
                mobile: "",
                password: "",
                repassword: "",
            }]);
        } else {
            let dataArr = [];
            let errorsArr = [];
            for(let i=0; i <= props.count; i++) {
                dataArr.push({
                    name: "",
                    email: "",
                    mobile: "",
                    password: "",
                    repassword: "",
                })
                errorsArr.push({
                    name: "",
                    email: "",
                    mobile: "",
                    password: "",
                    repassword: "",
                })
            }      
            setData([...dataArr]);
            setErrors([...errorsArr]);
        }  
    }, [props.count])

    const validEmailRegex = RegExp(
        /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    );
      
    const validPasswordRegex = RegExp(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[a-zA-Z0-9\S]{8,}$/i 
    )

    const addMore = () => {
        props.addMore();
    }

    const handleChange = (index) => (event) => {
        const { name, value } = event.target;
        let draftData = data;
        draftData[index][name] = value;
        setData([...draftData]);
        let txt = '';
        switch (name) {
            case 'name': 
                txt = value.length >= 3 ? '' : 'Name must be at least 3 characters long!';
                break;
            case 'email': 
                txt =  validEmailRegex.test(value) ? '' : 'Email is not valid!';
                break;
            case 'mobile': 
                txt =  value.length == 10 ? '' : 'Mobile Number must be 10 characters';
                break;
            case 'password': 
                txt = validPasswordRegex.test(value) ? '' : 'Password must include at least 8 characters an uppercase, a number & special character.';
                break;
            case 'repassword': 
                txt = value == data[index].password ? "" : "Your passwords don't match.";
                break;
            default:
                break;
        }
        let draftErrors = errors;
        draftErrors[index][name] = txt;
        setErrors([...draftErrors])
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let valid = true;
        for(let i = 0; i < errors.length; i++) {
            let item = errors[i];
            Object.values(item).forEach(val => val.length > 0 && (valid = false));
        }
        let valueArr = data.map(function(item){ return item.email });
        let isDuplicate = valueArr.some(function(item, idx){ 
            return valueArr.indexOf(item) != idx 
        });
        if(isDuplicate) alert("Please add different email address!")
        if(valid && !isDuplicate) props.onSubmit(data);          
    }

    const formRender = () => {
        console.log("data", data)
        let result = [];
        for(let i=0; i <= props.count; i++) {
            result.push(
                <>
                    { i != 0 && <hr />}
                    <div className='form-control'>
                        <label htmlFor="name">Name</label>
                        <input type='text' name='name' onChange={handleChange(i)} required />
                        {errors[i] && errors[i].name.length > 0 && 
                        <span className='error'>{errors[i].name}</span>}
                    </div>
                    <div className='form-control'>
                        <label htmlFor="email">Email</label>
                        <input type='email' name='email' onChange={handleChange(i)} required />
                        {errors[i] && errors[i].email.length > 0 && 
                        <span className='error'>{errors[i].email}</span>}
                    </div>
                    <div className='form-control'>
                        <label htmlFor="mobile">Mobile</label>
                        <input type='number' name='mobile' onChange={handleChange(i)} required />
                        {errors[i] && errors[i].mobile.length > 0 && 
                        <span className='error'>{errors[i].mobile}</span>}
                    </div>
                    <div className='form-control'>
                        <label htmlFor="password">Password</label>
                        <input type='password' name='password' onChange={handleChange(i)} required />
                        {errors[i] && errors[i].password.length > 0 && 
                        <span className='error'>{errors[i].password}</span>}
                    </div>
                    <div className='form-control'>
                        <label htmlFor="repassword">Confirm Password</label>
                        <input type='password' name='repassword' onChange={handleChange(i)} required />
                        {errors[i] && errors[i].repassword.length > 0 && 
                        <span className='error'>{errors[i].repassword}</span>}
                    </div>
                </>
            )
        }
        return result;
    }

    return (
        <div className='wrapper'>
            <div className='form-wrapper'>
                <h2>Create Account</h2>
                <form onSubmit={handleSubmit}>
                    {formRender()}
                    <div className="add-more">
                        <p onClick={addMore}>Add more</p>
                    </div>
                    <div className='submit'>
                        <button>Create</button>
                    </div>
                </form>
                <a href="/login">Instead Sign In?</a>
            </div>
        </div>
    );
}
