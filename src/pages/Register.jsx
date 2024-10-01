import React, { useState } from 'react';
import signup from '../assets/images/regpg.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { emailValidator, nameValidator, passwordValidator} from '../components/regexValidator';
import { TbLoader3 } from "react-icons/tb";
import { RegisterAPI } from '../service/Api';
import { checkAdmin, isAuthenticated } from '../service/Auth';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../service/firebase/firebaseConfig';

function Register() {
	
	const navigate = useNavigate();
	const [load, setLoad] = useState(false);
	const [inputs, setInputs] = useState({
		name : '',
		lastname : '',
		email : '',
		password : '',
		confirmPassword : ''
	})
	const [errorMessage, setErrorMessage] = useState({});
	
	const handleInput = (event) =>{

		setInputs({...inputs, [event.target.name]:event.target.value});

	}

	const formValid = () => {
		let error = {};

		if(!nameValidator(inputs.name)){
			error.name = 'Name must be at least 3 characters long and contain no special characters.'; 
		}
	
		if(!emailValidator(inputs.email)){
			error.email = 'Email is not valid.'; 
		}
	
		if(!passwordValidator(inputs.password)){
			error.password = 'Password should have at least one upper case letter, one lower case letter, one digit, one special character and Minimum eight character.'; 
		}
	
		if(inputs.password !== inputs.confirmPassword){
			error.repassword = 'Password is not Matching.'; 
		}

		setErrorMessage(error);

		return Object.keys(error).length === 0;

	}
  

	const formSubmit = (e) =>{
        e.preventDefault();

		if(formValid()){

			setLoad(true);
			
			RegisterAPI(inputs).then(async (res) => {
				toast.success('You are Successfully Sign up!', {autoClose : 1500});
				let id = (res.data.idToken);
				let doj =new Date();
				const users = {id, firstname:inputs.name, lastname:inputs.lastname, email:inputs.email, password:inputs.confirmPassword, joinedat:doj}
				await addDoc(collection(db, "users"), users);
				Navigate('/login');
				console.log(res)
			}).catch((err) => {
				if(err.response.data.error.message === "EMAIL_EXISTS"){
					toast.error('This Email is Already Exists!', {autoClose : 4000})
				}
				console.log(err);
			}).finally(() => {
				setLoad(false)
			})
			
			console.log('valid');
		}else{
			toast.warning('Check the Details!', {autoClose : 5000});
			console.log('not valid');
			
		}
		
    }
	
	if(isAuthenticated()){
			
		return checkAdmin() ? navigate('/qsadmin/admindashboard') : navigate('/qsuser/dashboard');
		
	}
	


  return (

    <section className="h-full bg-gray-400">

	<div className="mx-auto">
		<div className="flex justify-center items-center px-6 py-12">
			
			<div className="w-full xl:w-3/4 lg:w-11/12 flex">
				
				<div className="w-full h-auto bg-gray-400  hidden md:block lg:w-1/2 bg-cover rounded-l-lg">
                    <img className='rounded-l-lg h-dvh md:h-[35.3rem] lg:h-auto' src={signup} alt='register image' />
                </div>
			
				<div className="w-full lg:w-1/2 bg-[#fff]  p-5 rounded-lg md:rounded-l-none flex flex-col justify-center">
					<h3 className="py-4 text-2xl text-center text-bluetext underline ">Create an Account</h3>
					<form className="px-8 pt-6 pb-8 mb-4 bg-white rounded" onSubmit={formSubmit}>
						
						<div className="mb-4">
							<label className="block mb-2 text-sm font-bold" htmlFor="name">
                                First Name
                            </label>
							<input
                                className="w-full px-3 py-2 mb-3 text-sm leading-tight text-textlg border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                name='name'
								id="user"
                                type="text"
                                placeholder="First Name"
								onChange={handleInput}
								required
                            />
							
                        <p className=" text-[12px]" style={{color: "red"}}>{errorMessage.name}</p>

						</div>
						
						<div className="mb-4">
							<label className="block mb-2 text-sm font-bold" htmlFor="name">
                                Last Name
                            </label>
							<input
                                className="w-full px-3 py-2 mb-3 text-sm leading-tight text-textlg border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                name='lastname'
								id="lastname"
                                type="text"
                                placeholder="Last Name"
								onChange={handleInput}
								required
                            />
							
                        {/* <p className=" text-[12px]" style={{color: "red"}}>{errorMessage.name}</p> */}

						</div>

						<div className="mb-4">
							<label className="block mb-2 text-sm font-bold" htmlFor="email">
                                Email
                            </label>
							<input
                                className="w-full px-3 py-2 mb-3 text-sm leading-tight text-textlg border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                name='email'
								id="email"
                                type="email"
                                placeholder="Email"
								onChange={handleInput}
								required
                            />
							
                        <p className=" text-[12px]" style={{color: "red"}}>{errorMessage.email}</p>

                        </div>
						<div className="mb-4">
							<label className="block mb-2 text-sm font-bold" htmlFor="password">
                                Password
                            </label>
							<input
                                className="w-full px-3 py-2 mb-3 text-sm leading-tight text-textlg border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
								name='password'
								id="password"
								type="password"
								placeholder="******************"
								onChange={handleInput}
								required
                            />
							 
                        <p className=" text-[12px]" style={{color: "red"}}>{errorMessage.password}</p>

    						
                        </div>
						<div className="mb-4">
							<label className="block mb-2 text-sm font-bold" htmlFor="repass">
								Confirm Password
                            </label>
							<input
                                className="w-full px-3 py-2 mb-3 text-sm leading-tight text-textlg border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                name='confirmPassword'
								id="repass"
                                type="password"
								placeholder="******************"
								onChange={handleInput}
								required
                            />
							
                        <p className=" text-[12px]" style={{color: "red"}}>{errorMessage.repassword}</p>
		
                        </div>


					{load ? <div className="flex justify-center items-center w-full mb-4">
						<TbLoader3 className='text-primary animate-spin' size={40}/>
					</div> : null
					} 

						<div className="mb-6 text-center">
							<button className="w-full px-4 py-2 font-bold text-bluebg bg-primary rounded-full hover:bg-secondary focus:outline-none focus:shadow-outline" type="submit" disabled={load}>
                                Register Account
                            </button>
						</div>
	
						<> <ToastContainer 
            position="top-right"
            // autoClose={1500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
/></>

						<hr className="mb-6 border-t" />
		
						<div className="text-center">
							<Link className="inline-block text-base align-baseline text-secondary" to="/login">
								Already have an account? <span className='text-secondary duration-300 hover:underline hover:text-primary'>Login!</span>
							</Link>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</section>

  )
}

export default Register