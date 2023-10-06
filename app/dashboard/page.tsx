/* eslint-disable @next/next/no-img-element */
'use client';
import React from 'react';
import { useSession, signOut } from 'next-auth/react';
import { Router } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
	const router = useRouter();
	const { data: session, status } = useSession();
	console.log(session);

	return (
		<div className='h-screen flex items-center justify-center'>
			<div className='p-4 h-[26rem] shadow-md w-80 rounded-md border hover:shadow-2xl transition-shadow ease-[cubic-bezier(.54,.2,.03,.27)]'>
				<h2 className='text-center font-bold text-2xl mb-6 underline underline-offset-4'>
					User Details
				</h2>
				<div className='flex gap-2 mb-2'>
					<p className='mb-2 font-bold text-xl'>Name:</p>
					<p className='text-lg'>{session?.user?.name}</p>
				</div>
				<div className='flex gap-2'>
					<p className='mb-2 font-bold text-xl'>Email:</p>
					<p className='text-lg'>{session?.user?.email}</p>
				</div>
				{session?.user?.image ? (
					<img
						src={session?.user?.image}
						alt='User Image'
						className='w-full mt-2 h-48 mx-auto rounded-md object-cover'
					/>
				) : (
					<div className='w-full mt-2 h-48 mx-auto bg-gray-200 rounded-md flex items-center justify-center'>
						<span className='text-gray-600 text-xl'>No Image</span>
					</div>
				)}
				<button
					onClick={() => {
						signOut();
						router.push('/login');
					}}
					className=' w-full mt-1 rounded-md bg-indigo-600 text-white py-3'
				>
					sign out
				</button>
			</div>
		</div>
	);
}
