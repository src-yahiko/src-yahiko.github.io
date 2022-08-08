import { SunIcon, MoonIcon, HomeIcon, ChatIcon } from "@heroicons/react/solid";

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
				window.matchMedia("(prefers-color-scheme: dark)").matches) &&
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
				<ChatIcon className='w-14 p-3 hover:cursor-not-allowed' />
				{/* <SunIcon className='w-14 p-3 scale-0' /> */}
			</div>
		</aside>
	);
}
function Container({ children }) {
	return (
		<div className='md:ml-14 md:mr-4 px-2 pt-4'>
			<div className='flex flex-col space-y-20'>{children}</div>
		</div>
	);
}

function WIP() {
	return (
		<div className='animate-pulse'>
			<h1 className='border-b text-4xl w-fit pb-2 mb-5'>WIP</h1>
			<div className='opacity-30 flex flex-col space-y-5'>
				<div className='flex space-x-5'>
					<div className='w-full h-32 border bg-neutral-500 rounded-xl shadow-sm'></div>
					<div className='w-full h-32 border bg-neutral-500 rounded-xl shadow-sm'></div>
				</div>
				<div className='w-full h-32 border bg-neutral-500 rounded-xl shadow-sm'></div>

				<div className='flex space-x-5'>
					<div className='flex flex-1 flex-col space-y-5'>
						<div className='w-full h-32 border bg-neutral-500 rounded-xl shadow-sm'></div>
						<div className='w-full h-32 border bg-neutral-500 rounded-xl shadow-sm'></div>
					</div>
					<div className='flex-1 w-full h-69 border bg-neutral-500 rounded-xl shadow-sm'></div>
				</div>
			</div>
		</div>
	);
}

function ShowcaseCard() {
	return (
		<article className='space-y-3 opacity-30'>
			<div className='block w-96'></div>
			<div className='flex items-center'>
				<div className='bg-neutral-500 h-16 w-16 rounded-md shadow'></div>
				<p className='flex-1 text-center'>Lorem ipsum dolor sit</p>
			</div>

			<div className='bg-neutral-500 h-52'></div>

			<p className='text-sm text-justify text-neutral-500 '>
				Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
				eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
				voluptua.
			</p>

			<div className='flex space-x-1'>
				<button className='flex-1'>Visit</button>
				<button className='flex-1'>GitHub</button>
			</div>
		</article>
	);
}

function App() {
	return (
		<div className='text-xl md:text-2xl pt-12'>
			<Navbar></Navbar>
			<Sidebar></Sidebar>
			<Container>
				<section>
					<WIP />
				</section>
				<section>
					<h1 className='border-b text-4xl w-fit pb-2 mb-2'>Portfolio</h1>
					<div className='pb-4 flex scrollbar-round scrollbar-thin scrollbar-thumb-neutral-500 space-x-10 animate-pulse'>
						<ShowcaseCard />
						<ShowcaseCard />
						<ShowcaseCard />
						<ShowcaseCard />
						<ShowcaseCard />
					</div>
				</section>
			</Container>
		</div>
	);
}

export default App;
