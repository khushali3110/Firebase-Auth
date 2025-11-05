import { createUserWithEmailAndPassword } from 'firebase/auth'
import React from 'react'
import { useForm } from 'react-hook-form'
import { auth } from '../../firebase'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    const {register,handleSubmit,reset} = useForm()
    const navigate = useNavigate()

    function regist(data){
        createUserWithEmailAndPassword(auth,data.email,data.password)
        .then((user)=> {
                alert("Registration Successful! Please login.")
                reset()
                navigate('/signin') // Signin page pe redirect
          }) 
            .catch(err=>alert(err.message))
}
  return (
    <>
        <form onSubmit={handleSubmit(regist)}  className="col-lg-6 mx-auto my-5 p-5 shadow">
            <h2 className='text-center'>Register</h2>
            <div className="mt-4">
                <input type="text" {...register('email')} className="form-control" placeholder="enter email id"/>
            </div>
            <div className="mt-4">
                <input type="text" {...register('password')} className="form-control" placeholder="enter password"/>
            </div>
            <div className="mt-5">
                <button className='btn btn-success'>
                    register
                </button>
            </div>
        </form>
    </>
  )
}

export default Signup