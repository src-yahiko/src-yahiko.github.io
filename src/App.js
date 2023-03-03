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
import { isLabelWithInternallyDisabledControl } from "@testing-library/user-event/dist/utils";

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
			className="h-10 md:h-12 p-2 md:p-3 scale-0 dark:scale-100"
		/>
	) : (
		<MoonIcon
			onClick={toggleDarkmode}
			className="h-10 md:h-12 p-2 md:p-3 scale-100 dark:scale-0"
		/>
	);
}

function Navbar() {
	return (
		<nav className="z-20 fixed top-0 w-full border-b shadow-lg">
			<div className="max-w-7xl w-full h-full items-center flex mx-auto px-2 justify-between">
				<div className="flex items-center">
					<h1 className="md:border-r px-1 mr-1 md:mr-5 md:px-5 whitespace-nowrap font-mono">
						src-yahiko
					</h1>
					<i className="h-10 pt-3 md:h-12 p-2 md:p-3">
						<BsInstagram />
					</i>
					<i className="h-10 pt-3 md:h-12 p-2 md:p-3">
						<BsGithub />
					</i>
					<i className="h-10 pt-3 md:h-12 p-2 md:p-3">
						<BsLinkedin />
					</i>
					<i className="h-10 pt-3 md:h-12 p-2 md:p-3">
						<BsGlobe2 />
					</i>
					{/* <UserIcon className='w-12 p-3' /> */}
					{/* <MailIcon className='w-12 p-3' /> */}
				</div>
				<div className="flex items-center">
					<DarkModeToggler></DarkModeToggler>
				</div>
			</div>
		</nav>
	);
}

function Sidebar() {
	const [animate, setAnimate] = useState(true);

	useEffect(() => {
		window.addEventListener("scroll", () => {
			if (window.scrollY > 0) {
				setAnimate(false);
			} else {
				setAnimate(true);
			}
		});
	}, []);

	return (
		<div className="z-10 fixed bottom-0 md:left-0 w-full md:w-auto md:h-screen mb-5 px-5 md:mb-0 md:px-0">
			<aside className="md:border-0 md:h-full md:border-r shadow-2xl border theme-b-secondary">
				<div className="w-full h-full items-center flex md:flex-col justify-center">
					<ScrollToButton toId="home">
						<HomeIcon className="w-14 p-3 hover:cursor-pointer" />
					</ScrollToButton>
					<ScrollToButton toId="about">
						<UserCircleIcon
							className={`w-14 p-3 hover:cursor-pointer ${animate && "animate-pulse theme-bg-secondary"
								}`}
						/>
					</ScrollToButton>
					<ScrollToButton toId="skills">
						<AcademicCapIcon className="w-14 p-3 hover:cursor-pointer" />
					</ScrollToButton>
					<ScrollToButton toId="projects">
						<BriefcaseIcon className="w-14 p-3 hover:cursor-pointer" />
					</ScrollToButton>
					<ScrollToButton toId="contact">
						<AtSymbolIcon className="w-14 p-3 hover:cursor-pointer" />
					</ScrollToButton>
					{/* <SunIcon className='w-14 p-3 scale-0' /> */}
				</div>
			</aside>
		</div>
	);
}

function Container({ children }) {
	return (
		<div className="md:ml-14 md:mr-4 px-2 pt-4 pb-24">
			<div className="flex flex-col space-y-20 md:container md:max-w-4xl mx-auto">
				{children}
			</div>
		</div>
	);
}

function WIP({ title }) {
	return (
		<>
			<h1 className="border-b text-4xl w-fit pb-2 mb-5">
				{title || "Work in Progress"}
			</h1>
			<div className="flex flex-col space-y-5">
				<div className="flex space-x-5">
					<div className="w-full h-32 theme-bg-secondary rounded-xl shadow-sm"></div>
					<div className="w-full h-32 theme-bg-secondary rounded-xl shadow-sm"></div>
				</div>
				<div className="w-full h-32 theme-bg-secondary rounded-xl shadow-sm"></div>

				<div className="flex space-x-5">
					<div className="flex flex-1 flex-col space-y-5">
						<div className="w-full h-32 theme-bg-secondary rounded-xl shadow-sm"></div>
						<div className="w-full h-32 theme-bg-secondary rounded-xl shadow-sm"></div>
					</div>
					<div className="flex-1 w-full h-69 theme-bg-secondary rounded-xl shadow-sm"></div>
				</div>
			</div>
		</>
	);
}

// eslint-disable-next-line no-unused-vars
function ShowcaseCardMock() {
	return (
		<article className="space-y-3" style={{ scrollSnapAlign: "start" }}>
			<div className="w-80"></div>
			<div className="flex items-center">
				<div className="theme-bg-secondary h-16 w-16 rounded-md shadow"></div>
				<p className="flex-1 text-center">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. dolor sit</p>
			</div>

			<div className="theme-bg-secondary h-52"></div>

			<p className="text-sm text-justify theme-fc-secondary ">
				Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
				eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
				voluptua.
			</p>

			<div className="flex space-x-1 mx-auto">
				<button className="flex-1">Visit</button>
				<button className="flex-1">GitHub</button>
			</div>
		</article>
	);
}

function ShowcaseCard({ logo, title, img, content = "", children }) {
	const [open, setOpen] = useState(false);

	return (
		<article
			className="space-y-3  flex flex-col justify-start"
			style={{ scrollSnapAlign: "start" }}
		>
			<div
				onClick={() => setOpen(false)}
				className={`h-screen w-screen bg-[rgba(0,0,0,0.5)] top-0 fixed border z-30 left-0 ${open ? "opacity-100 visible" : "opacity-0 invisible"
					}`}
			>
				<div className="mx-auto max-w-5xl w-full fixed top-1/2 -translate-x-1/2 -translate-y-1/2 left-1/2 p-10">
					<div className="theme-bg-primary theme-fc-primary p-3 rounded-lg">
						<div className="max-w-2xl mx-auto py-20">
							<h1 className="border-b text-center pb-2 mb-2">{title}</h1>
							<p className="text-base text-justify">{content}</p>
						</div>
					</div>
				</div>
			</div>
			<div className="w-80"></div>
			<div className="flex items-center">
				<div className="overflow-hidden bg-transparent-50 shadow-lg h-16 w-16 rounded-lg">
					<img
						className="rounded-lg"
						style={{
							mixBlendMode: "multiply",
							minHeight: "100%",
							minWidth: "100%",
							objectFit: "cover",
							background: "white",
							color: "white"
						}}
						src={logo}
						alt=""
					/>
				</div>
				<p className="flex-1 text-center">{title}</p>
			</div>

			<div className="bg-neutral-300 h-52 overflow-hidden rounded-lg">
				<img
					style={{
						mixBlendMode: "multiply",
						minHeight: "100%",
						minWidth: "100%",
						objectFit: "cover",
					}}
					className="mx-auto"
					src={img}
					alt="slider_image"
				/>
			</div>
			<p className="text-sm text-justify theme-fc-secondary ">
				{content && content.length > 100 ? (
					<>
						{content.substr(0, 100) + "..."}
						<span onClick={() => setOpen(!open)} className="flex link">
							Mehr anzeigen
						</span>
					</>
				) : (
					content
				)}
			</p>
			<div className="w-full flex space-x-1 mx-auto">{children}</div>
		</article >
	);
}

function SideScroll({ children }) {
	return (
		<div
			className="pb-4 flex scrollbar-thin scrollbar-thumb-stone-500 space-x-10 items-stretch"
			style={{ scrollSnapType: "x mandatory" }}
		>
			{children}
		</div>
	);
}

function App() {
	const [myTime, setMytime] = useState(
		new Date().getHours() + ":" + new Date().getSeconds()
	);

	// eslint-disable-next-line no-unused-vars
	const timer = setInterval(
		() => setMytime(new Date().getHours() + ":" + new Date().getSeconds()),
		1000
	);

	return (
		<div id="home" className="text-xl md:text-2xl pt-12">
			<Navbar></Navbar>
			<Sidebar></Sidebar>
			<Container>
				<section className="h-screen">
					<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
						<div className="">
							<p className="animate-bounce text-5xl font-mono">
								<span className="text-orange-500">#!ch</span>
								<span className="theme-fc-primary">/bin/omar</span>
							</p>
							<p className="text-sm uppercase text-sky-600">
								Information [{myTime}]: <u>Work In Progress</u>
							</p>
						</div>
					</div>
				</section>

				<section id="about">
					{/* <WIP title="Über mich" /> */}
					<h1 className="border-b text-4xl w-fit pb-2 mb-5">
						Über mich
					</h1>
					<div className="flex flex-col-reverse md:flex-row">
						<p className="text-justify text-base flex-1 max-w-lg z-10">
							Als IT-Enthusiast habe ich mich schon immer leidenschaftlich mit verschiedensten IT-Themen inhaltlich beschäftigt und mich auch gerne an ihnen praktisch ausprobiert. Die gesammelten Erfahrungen machten mich in meinem Freundes- und Bekanntenkreis schon sehr früh zu einem ersten Ansprechpartner für Beratung und Umsetzung in IT Fragen – Das führte mich dahin ein paar eigene Kundenprojekte durchführen zu können. Ich bin gut darin gesammelte Erfahrungen neu zu kombinieren, unbekannte Systeme schnell kennenzulernen und kreative Lösungen für Probleme zu finden. Erfahrungsgemäß ist mein Ehrgeiz stärker, je kniffliger ein Problem zu sein scheint.
							<br></br>
							<br></br>
							Ich interessiere mich für ein dynamisches Arbeitsumfeld und an der Arbeit kleineren Teams – gerne auch an wechselnden Projekten. Dementsprechend bin ich auch jemand, der gerne neues lernt und gerade die Zusammenarbeit mit erfahreneren Kolleginnen und Kollegen sehr schätzt.
						</p>
						<div className="mx-auto align-baseline m-10 p-10">
							<div className="absolute translate-x-1/2 translate-y-1/2">
								<img className="rounded-2xl  overflow-hidden" width="230vw" src="/img/Foto.png" />
							</div>
							<img className="rounded-2xl shadow-inner overflow-hidden" width="240vw" src="/img/Foto2.png" />
						</div>
					</div>
				</section>

				<section id="skills">
					{/* <WIP title="Über mich" /> */}
					<h1 className="border-b text-4xl w-fit pb-2 mb-5">
						Meine Ziele
					</h1>
					<div className="flex md:flex-row-reverse flex-col-reverse">
						<p className="text-justify text-base flex-1 max-w-lg z-10">
							Ich ziele ab, meine akademischen Fähigkeiten weiter ausbauen und plane daher, nach meinem Bachelor-Abschluss einen geeigneten Master-Studiengang in Berlin zu absolvieren. Meine Motivation dafür ist, dass ich erkannt habe, welche Art von Arbeit zu mir passt und wie unverzichtbar Kreativität, Innovation und Entwicklung für mich für meine berufliche Zukunft sind.
							<br></br>
							<br></br>
							Aufgrund meiner natürlichen Begeisterung und meines Engagements bin ich zuversichtlich, dass ich nicht nur qualitativ hochwertige Arbeitsergebnisse erzielen, sondern auch einen wertvollen Beitrag zu einem positiven Arbeitsumfeld leisten kann. Ich habe nicht nur die Fähigkeit und den Wunsch, sondern auch den nötigen Ehrgeiz, um in Zukunft in einem für mich passenden Fachgebiet wirklich gut zu werden. Ich möchte nicht nur Arbeit machen, und mir ein Gehalt verdienen - sondern brauche immer die Möglichkeit, tiefer zu gehen. Ich bin auf der Suche nach Herausforderungen und neuen Erfahrungen, die mehr aus mir herausholen und meine derzeitigen Fähigkeiten abrunden. </p>
						<div className="mx-auto align-baseline m-10 p-10">
							<div className="absolute -translate-x-1/2 translate-y-[260%]">
								<img className=" overflow-hidden bg-black p-5 rounded-full" width="140vw" src="/img/br.png" />
							</div>
							<img className="rounded-lg shadow-inner overflow-hidden" width="240vw" src="/img/Foto3.jpg" />
						</div>
					</div>
				</section>

				{/* <section id="skills">
			<WIP title="Erfahrungen" />
		  </section> */}

				<section id="projects">
					<h1 className="border-b text-4xl w-fit pb-2 mb-5">
						Projekte
					</h1>
					<code className="bg-black text-gray-300 p-3 rounded-lg text-sm">// WIP: Die Website befindet sich im Aufbau
						<br>
						</br></code>
					<div className="flex flex-col space-y-5">
						{/* Ich interessiere mich für ein dynamisches Arbeitsumfeld, für die Arbeit in kleineren Teams und für wirkungsvolle Projekte und neuen Technologien. Dementsprechend bin ich auch jemand, der gerne Neues lernt und die Zusammenarbeit mit erfahreneren Kollegen besonders schätzt. Darüber hinaus möchte ich meine akademischen Fähigkeiten weiter ausbauen und plane daher, nach meinem Bachelor-Abschluss einen geeigneten Master-Studiengang in Berlin zu absolvieren. Meine Motivation dafür ist, dass ich erkannt habe, welche Art von Arbeit zu mir passt und wie unverzichtbar Kreativität, Innovation und Entwicklung für mich für meine berufliche Zukunft sind. */}
						{/* <div className="flex space-x-5">
				<div className="w-full h-32 theme-bg-secondary rounded-xl shadow-sm"></div>
				<div className="w-full h-32 theme-bg-secondary rounded-xl shadow-sm"></div>
			  </div>
			  <div className="w-full h-32 theme-bg-secondary rounded-xl shadow-sm"></div>
  
			  <div className="flex space-x-5">
				<div className="flex flex-1 flex-col space-y-5">
				  <div className="w-full h-32 theme-bg-secondary rounded-xl shadow-sm"></div>
				  <div className="w-full h-32 theme-bg-secondary rounded-xl shadow-sm"></div>
				</div>
				<div className="flex-1 w-full h-69 theme-bg-secondary rounded-xl shadow-sm"></div>
			  </div> */}
					</div>

					<SideScroll>
						<ShowcaseCard
							logo="/img/react.png"
							img="/img/tic.png"
							title="React Tic Tac Toe"
							content="Minimalistisches Tic Tac Toe Spiel programmiert mit React JS"
						>
							<button
								className="flex-1"
								onClick={() =>
									window.open(
										"https://src-yahiko.github.io/react-tictactoe/",
										""
									)
								}
							>
								Öffnen
							</button>
							<button
								className="flex-1"
								onClick={() =>
									window.open(
										"https://github.com/src-yahiko/react-tictactoe/tree/main",
										""
									)
								}
							>
								GitHub
							</button>
						</ShowcaseCard>
						<ShowcaseCard
							logo="/img/bitrate_klein.png"
							img="/img/bitrate.png"
							title="Bitrate IT"
							content="Bitrate IT Solution Architects: Website für geschäftliche Anfragen"
						>              <button
							className="flex-1 mt-auto"
							onClick={() =>
								window.open(
									"https://bitrate-it.de",
									""
								)
							}
						>
								Öffnen
							</button></ShowcaseCard>
						<ShowcaseCard
							logo="/img/bitrate_klein.png"
							img="/img/bitrate.png"
							title="Title"
							content="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
						></ShowcaseCard>
						<ShowcaseCard
							logo="/img/bitrate_klein.png"
							img="/img/bitrate.png"
							title="Title"
							content="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
						></ShowcaseCard>
						{/* <ShowcaseCard
				logo="/img/bitratelogo.png"
				img="/img/bitratelogo.png"
				title="Selbstständigkeit"
				content="Bearbeitung von Anfragen aus dem persönlichen Netzwerk mit folgenden Inhalten:
				Automatisierung von Routine-Aufgaben (Bash, MySQL Server, FTP Backup), Diverse Berichterstellung z. B. für Umsätze etc. (SQL, Excel), Implementierung von Exportfunktionen (PHP, Excel), IT-Beratung, Betreuung und Problemlösung, Erweiterung und Fehlerbehebung in versch. Webanwendungen (NextJS, Strapi CMS)"
			  >
				<button
				  className="flex-1"
				  onClick={() => window.open("https://bitrate-it.de", "_blank")}
				>
				  In neuem Tab öffnen
				</button>
			  </ShowcaseCard> */}
						{/* <ShowcaseCard
				logo="/img/tictactoe.png"
				img="/img/tictactoe.png"
				title="Tic Tac Toe"
				content="React Tic Tac Toe. Viel Spaß beim ausprobieren"
			  >
				<button
				  className="flex-1"
				  onClick={() =>
					window.open(
					  "https://src-yahiko.github.io/react-tictactoe/",
					  ""
					)
				  }
				>
				  Öffnen
				</button>
				<button
				  className="flex-1"
				  onClick={() =>
					window.open(
					  "https://github.com/src-yahiko/react-tictactoe/tree/main",
					  ""
					)
				  }
				>
				  GitHub
				</button>
			  </ShowcaseCard> */}
					</SideScroll>
				</section>

				{/* <section id="projects">
			<h1 className="border-b text-4xl w-fit pb-2 mb-2">Portfolio</h1>
			<SideScroll>
			  
			  <ShowcaseCard
				logo=""
				img=""
				title="Wordpress Salon Website"
				content="Seit Juni 2019 unterstütze ich die SAP Beratungsfirma in der internen IT. Arbeitsumgebung ist hier Windows, die M365 Cloud und Azure."
			  >
				<button
				  className="flex-1"
				  onClick={() =>
					window.open("https://beratungscontor.de", "_blank")
				  }
				>
				  In neuem Tab öffnen
				</button>
			  </ShowcaseCard>
			  <ShowcaseCard
				logo=""
				img=""
				title="NextJS Landingpage"
				content=""
			  >
				<button
				  className="flex-1"
				  onClick={() =>
					window.open("https://beratungscontor.de", "_blank")
				  }
				>
				  In neuem Tab öffnen
				</button>
			  </ShowcaseCard>
			</SideScroll>
		  </section> */}

				<section id="contact">
					<WIP title="Kontakt" />
				</section>
			</Container>
		</div >
	);
}

export default App;