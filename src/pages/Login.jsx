import { useState } from 'react';
import React from 'react';
import login from '../assets/images/loginig.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import { emailValidator, passwordValidator } from '../components/regexValidator';
import { TbLoader3 } from "react-icons/tb";
import { loginAPI } from '../service/Api';
import { storeData } from '../service/dataStorage';
import { checkAdmin, isAuthenticated } from '../service/Auth';
import { LazyLoadComponent, LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Helmet } from 'react-helmet-async';

function Login() {

	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);
	const [load, setLoad] = useState(false);
	const [errorMessage, setErrorMessage] = useState({});
	const [checkId, setCheckId] = useState();


	const [inputs, setInputs] = useState({
		email: '',
		password: '',

	})

	const handleInput = (event) => {

		setInputs({ ...inputs, [event.target.name]: event.target.value });

	}


	const formValid = () => {
		let error = {};

		if (!emailValidator(inputs.email)) {
			error.email = 'Email is not valid.';
		}

		if (!passwordValidator(inputs.password)) {
			error.password = 'Password should have at least one upper case letter, one lower case letter, one digit, one special character and Minimum eight character.';
		}

		setErrorMessage(error);

		return Object.keys(error).length === 0;

	}


	const formSubmit = (e) => {
		e.preventDefault();

		if (formValid()) {
			setLoad(true);

			loginAPI(inputs).then((res) => {
				storeData(res.data.idToken);
				setCheckId(res.data.email);
				const isAdmin = res.data.email === "admin@quizsnap.com";
				localStorage.setItem('role', isAdmin ? 'admin' : 'user');

				toast.success('You are Successfully Login!', { autoClose: 1500 });
				// console.log(res);
			}).catch((err) => {
				if (err.code = 'ERR_BAD_REQUEST') {
					toast.error('Invalid Credentials', { autoClose: 4000 });
				}

			}).finally(() => {
				setLoad(false);
			})

		} else {
			toast.warning('Check the Details!', { autoClose: 5000 });

		}

	}

	if (isAuthenticated()) {

		checkAdmin() ? navigate('/qsadmin/admindashboard') : navigate('/qsuser/dashboard')

	}

	return (

		<section className="h-full bg-gray-400">
			<Helmet><title>QuizSnap Login</title></Helmet>
			<div className="mx-auto">
				<div className="flex justify-center items-center">

					<div className="w-full xl:w-3/4 lg:w-11/12 flex">

						<div className="w-full h-auto bg-gray-400  hidden md:block lg:w-1/2 bg-cover rounded-l-lg">
							{/* <img className='rounded-l-lg md:h-svh lg:h-auto' src={login} alt='register image' /> */}
							<LazyLoadComponent>
								<LazyLoadImage className='rounded-l-lg md:h-svh lg:h-auto' effect='blur' placeholderSrc={login} src={login} alt='register image' />
							</LazyLoadComponent>
						</div>

						<div className="w-full lg:w-1/2 bg-[#fff] flex flex-col justify-center p-5 rounded-lg md:rounded-l-none">
							<h3 className="py-4 text-2xl text-center text-bluetext underline ">Login</h3>
							<form className="px-8 pt-6 pb-8 mb-4 bg-white rounded" onSubmit={formSubmit}>

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
									<p className=" text-[12px]" style={{ color: "red" }}>{errorMessage.email}</p>
								</div>

								<div className="mb-4">
									<label className="block mb-2 text-sm font-bold" htmlFor="password">
										Password
									</label>
									<input
										className="relative flex items-center w-full px-3 pe-8 py-2 mb-3 text-sm leading-tight text-textlg border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
										name='password'
										id="password"
										type={showPassword ? 'text' : 'password'}
										placeholder="Password"
										onChange={handleInput}
										required
									/>
									<p className=" text-[12px]" style={{ color: "red" }}>{errorMessage.password}</p>
								</div>

								{load ? <div className="flex justify-center items-center w-full mb-4">
									<TbLoader3 className='text-primary animate-spin' size={40} />
								</div> : null
								}

								<div className="mb-6 text-center">
									<button className="w-full px-4 py-2 font-bold text-bluebg bg-primary rounded-full hover:bg-secondary focus:outline-none focus:shadow-outline" type="submit" disabled={load}>
										Login
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
									<Link className="inline-block text-base align-baseline text-secondary" to="/register">
										Don't have an account? <span className='text-secondary duration-300 hover:underline hover:text-primary'>Sign Up!</span>
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

export default Login