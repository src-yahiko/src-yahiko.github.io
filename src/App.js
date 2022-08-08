import { SunIcon, MoonIcon, HomeIcon } from "@heroicons/react/solid";

import { useEffect, useState } from "react";

function DarkModeToggler({ className }) {
	const [darkmode, setDarkmode] = useState(
		document.getElementsByTagName("body")[0].classList.contains("dark")
	);

	const toggleDarkmode = () => {
		document.getElementsByTagName("body")[0].classList.toggle("dark");

		if (document.getElementsByTagName("body")[0].classList.contains("dark")) {
			localStorage.theme = "dark";
		} else {
			localStorage.theme = "light";
		}

		setTimeout(
			() =>
				setDarkmode(
					document.getElementsByTagName("body")[0].classList.contains("dark")
				),
			100
		);
	};

	useEffect(() => {
		if (
			(localStorage.theme === "dark" ||
				(!("theme" in localStorage) &&
					window.matchMedia("(prefers-color-scheme: dark)").matches)) &&
			darkmode === false
		) {
			document.getElementsByTagName("body")[0].classList.add("dark");
			setDarkmode(true);
			// toggleDarkmode();
		}
	}, [darkmode]);

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
		<nav className='z-20 fixed top-0 w-screen border-b shadow-xl'>
			<div className='max-w-7xl w-full h-full items-center flex mx-auto px-2 justify-between'>
				<div className='flex items-center'>
					<h1 className='border-r px-2 mr-2 md:mr-5 md:px-5 md:border-l'>
						src-yahiko
					</h1>
					<HomeIcon className='h-12 p-3' />
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
		<aside className='z-10 fixed bottom-0 w-screen md:left-0 md:h-screen border-t md:border-r md:w-auto shadow-xl'>
			<div className='w-full h-full items-center flex md:flex-col justify-center'>
				<SunIcon className='w-14 p-3 scale-0' />
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
					<div className='opacity-30'>
						<div className='w-full h-32 border bg-neutral-500 rounded-xl shadow-sm my-5'></div>
						<div className='flex space-x-5'>
							<div className='w-full h-32 border bg-neutral-500 rounded-xl shadow-sm'></div>
							<div className='w-full h-32 border bg-neutral-500 rounded-xl shadow-sm'></div>
						</div>
						<div className='w-full h-32 border bg-neutral-500 rounded-xl shadow-sm my-5'></div>

						<div className='flex space-x-5'>
							<div className='flex flex-1 flex-col space-y-5'>
								<div className='w-full h-32 border bg-neutral-500 rounded-xl shadow-sm'></div>
								<div className='w-full h-32 border bg-neutral-500 rounded-xl shadow-sm'></div>
							</div>
							<div className='flex-1 w-full h-69 border bg-neutral-500 rounded-xl shadow-sm'></div>
						</div>
					</div>
				</div>
			</Container>
		</div>
	);
}

export default App;
