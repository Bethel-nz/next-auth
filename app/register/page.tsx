'use client';
/* eslint-disable @next/next/no-img-element */
import React, { ChangeEvent, FormEvent } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import Link from 'next/link';

const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{4,}$/;

export default function Page() {
	const router = useRouter();
	const [data, setData] = useState<{
		name: string;
		email: string;
		password: string;
	}>({
		name: '',
		email: '',
		password: '',
	});

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setData({ ...data, [name]: value });
	};
	const registerUser = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			if (passwordRegex.test(data.password) || data.password.length >= 4) {
				toast.promise(
					fetch('/api/register', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(data),
					}).then((res) => {
						if (res.ok) {
							return res.json();
						}
					}),
					{
						loading: 'Submitting...',
						success: (userInfo) => {
							setTimeout(() => {
								router.push('/login');
							}, 1500);
							return 'Submitted, redirecting to login page';
						},
						error: (error) => {
							throw new Error(error.message);
						},
					}
				);
			} else {
				toast.error(
					'Password must contain at least one letter, one number, and be at least 4 characters long'
				);
			}
		} catch (error) {
			console.error(error);
			toast.error('Unknown error');
		}
	};

	return (
		<>
			<div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
				<Toaster />
				<div className='sm:mx-auto sm:w-full sm:max-w-sm'>
					<img
						className='mx-auto h-10 w-auto'
						src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
						alt='Your Company'
					/>
					<h2 className=' mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
						Sign up for an account
					</h2>
				</div>

				<div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
					<form className='space-y-6' onSubmit={registerUser}>
						<div>
							<label
								htmlFor='name'
								className='block text-sm font-medium leading-6 text-gray-900'
							>
								Name
							</label>
							<div className='mt-2'>
								<input
									id='name'
									name='name'
									type='text'
									autoComplete='name'
									value={data.name}
									onChange={handleChange}
									required
									className='px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
								/>
							</div>
						</div>
						<div>
							<label
								htmlFor='email'
								className='block text-sm font-medium leading-6 text-gray-900'
							>
								Email address
							</label>
							<div className='mt-2'>
								<input
									id='email'
									name='email'
									type='email'
									autoComplete='email'
									value={data.email}
									onChange={handleChange}
									required
									className='px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
								/>
							</div>
						</div>

						<div>
							<div className='flex items-center justify-between'>
								<label
									htmlFor='password'
									className='block text-sm font-medium leading-6 text-gray-900'
								>
									Password
								</label>
								<div className='text-sm'>
									<a
										href='#'
										className='font-semibold text-indigo-600 hover:text-indigo-500'
									>
										Forgot password?
									</a>
								</div>
							</div>
							<div className='mt-2'>
								<input
									id='password'
									name='password'
									type='password'
									autoComplete='current-password'
									value={data.password}
									onChange={handleChange}
									required
									className='px-2  block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
								/>
							</div>
						</div>

						<div>
							<button
								type='submit'
								className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
							>
								Sign up
							</button>
						</div>
					</form>

					<p className='mt-10 text-center text-sm text-gray-500'>
						Already a member?{' '}
						<Link
							href='/login'
							className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'
						>
							Login Here
						</Link>
					</p>
				</div>
			</div>
		</>
	);
}
