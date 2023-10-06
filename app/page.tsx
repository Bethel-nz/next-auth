import Link from 'next/link';

export default function Home() {
	return (
		<main className='h-screen w-full text-center flex items-center flex-col justify-center'>
			<h1 className='text-7xl font-bold mb-20 underline decoration-wavy underline-offset-[.3em] decoration-purple-600'>
				NextAuth.js
			</h1>
			<div className='flex justify-center items-center gap-4'>
				<Link href='/register' className='hover:text-purple-800 font-semibold'>
					Register Page
				</Link>
				<Link href='/login' className='hover:text-purple-800 font-semibold'>
					Login Page
				</Link>
			</div>
		</main>
	);
}
