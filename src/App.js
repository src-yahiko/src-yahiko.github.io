import {
	SunIcon,
	MoonIcon,
	UserCircleIcon,
	AcademicCapIcon,
	BriefcaseIcon,
	AtSymbolIcon,
	HomeIcon,
} from "@heroicons/react/solid";

import { BsGithub, BsLinkedin, BsInstagram, BsGlobe2 } from "react-icons/bs";

import { useEffect, useState } from "react";

function animateScroll({ targetPosition, initialPosition, duration }) {
	const pow = Math.pow;

	// The easing function that makes the scroll decelerate over time
	const easeOutQuart = (x) => {
		return 1 - pow(1 - x, 4);
	};

	let start;
	let position;
	let animationFrame;

	const requestAnimationFrame = window.requestAnimationFrame;
	const cancelAnimationFrame = window.cancelAnimationFrame;

	// maximum amount of pixels we can scroll
	const maxAvailableScroll =
		document.documentElement.scrollHeight -
		document.documentElement.clientHeight;

	const amountOfPixelsToScroll = initialPosition - targetPosition;

	function step(timestamp) {
		if (start === undefined) {
			start = timestamp;
		}

		const elapsed = timestamp - start;

		// this just gives us a number between 0 (start) and 1 (end)
		const relativeProgress = elapsed / duration;

		// ease out that number
		const easedProgress = easeOutQuart(relativeProgress);

		// calculate new position for every thick of the requesAnimationFrame
		position =
			initialPosition - amountOfPixelsToScroll * Math.min(easedProgress, 1);

		// set the scrollbar position
		window.scrollTo(0, position);

		// Stop when max scroll is reached
		if (
			initialPosition !== maxAvailableScroll &&
			window.scrollY === maxAvailableScroll
		) {
			cancelAnimationFrame(animationFrame);
			return;
		}

		// repeat until the end is reached
		if (elapsed < duration) {
			animationFrame = requestAnimationFrame(step);
		}
	}

	animationFrame = requestAnimationFrame(step);
}

function scrollTo({ id, ref = null, duration = 800 }) {
	// the position of the scroll bar before the user clicks the button
	const initialPosition = window.scrollY;

	// decide what type of reference that is
	// if neither ref or id is provided  set element to null
	const element = ref ? ref.current : id ? document.getElementById(id) : null;

	const getElementPosition = (element) => element.offsetTop;

	animateScroll({
		targetPosition: getElementPosition(element) - 60,
		initialPosition,
		duration,
	});
}

function ScrollToButton({ toId, toRef, duration, children }) {
	const handleClick = () => scrollTo({ id: toId, ref: toRef, duration });

	return <span onClick={handleClick}>{children}</span>;
}

function DarkModeToggler({ className }) {
	const [darkmode, setDarkmode] = useState(
		document.getElementsByTagName("html")[0].classList.contains("dark")
	);

	const toggleDarkmode = () => {
		document.getElementsByTagName("html")[0].classList.toggle("dark");

		if (document.getElementsByTagName("html")[0].classList.contains("dark")) {
			localStorage.theme = "dark";
		} else {
			localStorage.theme = "light";
		}

		setTimeout(
			() =>
				setDarkmode(
					document.getElementsByTagName("html")[0].classList.contains("dark")
				),
			100
		);
	};

	useEffect(() => {
		if (
			(localStorage.theme === "dark" ||
				(!localStorage.theme &&
					window.matchMedia("(prefers-color-scheme: dark)").matches)) &&
			darkmode === false
		) {
			document.getElementsByTagName("html")[0].classList.add("dark");
			setDarkmode(true);
			// toggleDarkmode();
		}
	}, [darkmode]);

	return darkmode ? (
		<SunIcon
			onClick={toggleDarkmode}
			className='h-10 md:h-12 p-2 md:p-3 scale-0 dark:scale-100'
		/>
	) : (
		<MoonIcon
			onClick={toggleDarkmode}
			className='h-10 md:h-12 p-2 md:p-3 scale-100 dark:scale-0'
		/>
	);
}

function Navbar() {
	return (
		<nav className='z-20 fixed top-0 w-full border-b shadow-lg'>
			<div className='max-w-7xl w-full h-full items-center flex mx-auto px-2 justify-between'>
				<div className='flex items-center'>
					<h1 className='border-r px-1 mr-1 md:mr-5 md:px-5 md:border-l whitespace-nowrap'>
						src-yahiko
					</h1>
					<i className='h-10 md:h-12 p-2 md:p-3'>
						<BsInstagram />
					</i>
					<i className='h-10 md:h-12 p-2 md:p-3'>
						<BsGithub />
					</i>
					<i className='h-10 md:h-12 p-2 md:p-3'>
						<BsLinkedin />
					</i>
					<i className='h-10 md:h-12 p-2 md:p-3'>
						<BsGlobe2 />
					</i>
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
		<div className='z-10 fixed bottom-0 md:left-0 w-full md:w-auto md:h-screen mb-5 px-5 md:mb-0 md:px-0'>
			<aside className='md:border-0 md:h-full md:border-r shadow-2xl border theme-b-secondary'>
				<div className='w-full h-full items-center flex md:flex-col justify-center'>
					<ScrollToButton toId='home'>
						<HomeIcon className='w-14 p-3 hover:cursor-pointer' />
					</ScrollToButton>
					<ScrollToButton toId='about'>
						<UserCircleIcon className='w-14 p-3 hover:cursor-pointer' />
					</ScrollToButton>
					<ScrollToButton toId='skills'>
						<AcademicCapIcon className='w-14 p-3 hover:cursor-pointer' />
					</ScrollToButton>
					<ScrollToButton toId='projects'>
						<BriefcaseIcon className='w-14 p-3 hover:cursor-pointer' />
					</ScrollToButton>
					<ScrollToButton toId='contact'>
						<AtSymbolIcon className='w-14 p-3 hover:cursor-pointer' />
					</ScrollToButton>
					{/* <SunIcon className='w-14 p-3 scale-0' /> */}
				</div>
			</aside>
		</div>
	);
}

function Container({ children }) {
	return (
		<div className='md:ml-14 md:mr-4 px-2 pt-4 pb-24'>
			<div className='flex flex-col space-y-20 md:container md:max-w-4xl mx-auto'>
				{children}
			</div>
		</div>
	);
}

function WIP({ title }) {
	return (
		<>
			<h1 className='border-b text-4xl w-fit pb-2 mb-5'>
				{title || "Work in Progress"}
			</h1>
			<div className='flex flex-col space-y-5'>
				<div className='flex space-x-5'>
					<div className='w-full h-32 theme-bg-secondary rounded-xl shadow-sm'></div>
					<div className='w-full h-32 theme-bg-secondary rounded-xl shadow-sm'></div>
				</div>
				<div className='w-full h-32 theme-bg-secondary rounded-xl shadow-sm'></div>

				<div className='flex space-x-5'>
					<div className='flex flex-1 flex-col space-y-5'>
						<div className='w-full h-32 theme-bg-secondary rounded-xl shadow-sm'></div>
						<div className='w-full h-32 theme-bg-secondary rounded-xl shadow-sm'></div>
					</div>
					<div className='flex-1 w-full h-69 theme-bg-secondary rounded-xl shadow-sm'></div>
				</div>
			</div>
		</>
	);
}

function ShowcaseCard() {
	return (
		<article className='space-y-3'>
			<div className='w-80'></div>
			<div className='flex items-center'>
				<div className='theme-bg-secondary h-16 w-16 rounded-md shadow'></div>
				<p className='flex-1 text-center'>Lorem ipsum dolor sit</p>
			</div>

			<div className='theme-bg-secondary h-52'></div>

			<p className='text-sm text-justify theme-fc-secondary '>
				Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
				eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
				voluptua.
			</p>

			<div className='flex space-x-1 mx-auto'>
				<button className='flex-1'>Visit</button>
				<button className='flex-1'>GitHub</button>
			</div>
		</article>
	);
}

function SideScroll({ children }) {
	return (
		<div className='pb-4 flex scrollbar-thin scrollbar-thumb-stone-500 space-x-10'>
			{children}
		</div>
	);
}

function App() {
	return (
		<div id='home' className='text-xl md:text-2xl pt-12'>
			<Navbar></Navbar>
			<Sidebar></Sidebar>
			<Container>
				<section>
					<WIP title='Hallo, Welt!' />
				</section>

				<section id='about'>
					<WIP title='Über mich' />
				</section>

				<section id='skills'>
					<WIP title={"Computer Science"} />
					<SideScroll>
						<ShowcaseCard />
						<ShowcaseCard />
						<ShowcaseCard />
						<ShowcaseCard />
						<ShowcaseCard />
					</SideScroll>
				</section>

				<section id='projects'>
					<h1 className='border-b text-4xl w-fit pb-2 mb-2'>Portfolio</h1>
					<SideScroll>
						<ShowcaseCard />
						<ShowcaseCard />
						<ShowcaseCard />
						<ShowcaseCard />
						<ShowcaseCard />
					</SideScroll>
				</section>

				<section id='contact'>
					<WIP title='Kontakt' />
				</section>
			</Container>
		</div>
	);
}

export default App;
