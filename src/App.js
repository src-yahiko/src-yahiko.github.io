import {
	SunIcon,
	MoonIcon,
	HomeIcon,
	MailIcon,
	UserIcon,
} from "@heroicons/react/solid";

import { useState } from "react";

function DarkModeToggler({ className }) {
	const [darkmode, setDarkmode] = useState(
		document.getElementsByTagName("body")[0].classList.contains("dark")
	);

	const toggleDarkmode = () => {
		document.getElementsByTagName("body")[0].classList.toggle("dark");

		setTimeout(
			() =>
				setDarkmode(
					document.getElementsByTagName("body")[0].classList.contains("dark")
				),
			100
		);
	};

	return (
		<>
			{darkmode ? (
				<SunIcon
					onClick={toggleDarkmode}
					className='w-12 p-2 scale-0 dark:scale-100'
				/>
			) : (
				<MoonIcon
					onClick={toggleDarkmode}
					className='w-12 p-2 scale-100 dark:scale-0'
				/>
			)}
		</>
	);
}

function Navbar() {
	return (
		<nav className='z-20 fixed top-0 w-screen border-b h-12 shadow-xl'>
			<div className='max-w-7xl w-full h-full items-center flex mx-auto px-2 justify-between'>
				<div className='flex items-center'>
					<h1 className='border-r px-2 mr-2 md:mr-5 md:px-5 md:border-l'>
						src-yahiko
					</h1>
					<HomeIcon className='w-12 p-3' />
					{/* <UserIcon className='w-12 p-3' /> */}
					{/* <MailIcon className='w-12 p-3' /> */}
				</div>
				<div className='flex items-center'>
					<DarkModeToggler></DarkModeToggler>
				</div>
			</div>
		</nav>
	);
}

function Sidebar() {
	return (
		<aside className='z-10 fixed bottom-0 w-screen h-12 md:left-0 md:h-screen border-t md:border-r md:w-12 shadow-xl'>
			<div className='w-full h-full items-center flex md:flex-col p-2 justify-center'>
				{/* <SunIcon className='w-12 p-2' /> */}
				{/* <SunIcon className='w-12 p-2' /> */}
			</div>
		</aside>
	);
}
function Container({ children }) {
	return (
		<div className='max-w-4xl p-0 mt-12 mx-auto md:pl-12 pb-24'>
			<div className='flex flex-col space-y-40'>{children}</div>
		</div>
	);
}

function App() {
	return (
		<div className='text-xl md:text-2xl pt-12'>
			<Navbar></Navbar>
			<Sidebar></Sidebar>
			<Container>
				<div className='p-4 animate-pulse'>
					<h1 className='border-b text-center pb-2 mb-2 uppercase tracking-wider text-4xl'>
						Work in progress
					</h1>
				</div>
			</Container>
		</div>
	);
}

export default App;
