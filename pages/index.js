import Head from "next/head";
import dynamic from 'next/dynamic'

import { getBookmarks } from "../libs/raindrop";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "../components/svg/LoadingSpinner";
import SearchIcon from "@heroicons/react/outline/SearchIcon";
import LinkTo from "../components/svg/LinkTo";
const ThemeSwitcher = dynamic(
	() => import('../components/ThemeSwitcher'),
	{ ssr: false }
  )
  
import Skeleton from "../components/Skeleton";

export default function Home({ bookmarks: { items } }) {
	const [search, setSearch] = useState("");
	const [status, setStatus] = useState("");
	const [filteredStates, setFilteredStates] = useState([]);

	useEffect(() => {
		const timer = setTimeout(() => {
			const filter = items.filter((elm) => {
				return elm.title.toLowerCase().includes(search.toLowerCase());
			});

			setStatus("success");
			setFilteredStates(filter);
		}, 250);

		return () => {
			clearTimeout(timer);
			setStatus("loading");
		};
	}, [search]);
	return (
		<div>
			<Head>
				<title>
					Bookmarks - squale.agency - Liste d'outils et ressources de qualités en développement, design, etc...
				</title>
				<meta
					name="description"
					content="bookmarks est une base de donnée des outils favoris de squale.agency, chacun des outils sont regroupés par catégories, vous pouvez filtrer les résultats ou chercher un outil avec un mot clé."
				/>
				
			</Head>
			<ThemeSwitcher />
			<div className="w-full transition-colors duration-300 bg-black py-7 dark:bg-white md:h-52">
				<header className="flex flex-col justify-center w-full h-full px-6 mx-auto lg:max-w-screen-lg lg:px-0">
					<h1 className="font-normal leading-none tracking-1 md:mb-5 mb-3 md:text-52 text-2xl font-satoshi text-white dark:text-[#05001A]">
						<b>bookmarks</b>.squale.agency
					</h1>
					<p className="font-light text-gray-400 dark:text-[#4D515F] leading-4 md:leading-5 text-base md:text-lg">
						<span className="font-bold text-lg font-satoshi leading-5 text-gray-50 dark:text-[#1A1E31]">bookmarks</span>{" "}
						est une base de donnée des outils favoris de squale.agency, chacun des outils sont regroupés par catégories,
						vous pouvez filtrer les résultats ou chercher un outil avec un mot clé.
					</p>
				</header>
			</div>
			<main className="px-6 mx-auto my-8 lg:max-w-screen-lg lg:px-0">
				<div className="flex mb-4 text-gray-900 dark:text-white">
					<div className="flex-col items-end w-full space-y-1 md:w-auto">
						<label>Rechercher</label>
						<div className="relative w-full border-white border-opacity-25 rounded hover:outline-none">
							<div className="absolute inset-y-0 left-0 flex items-center px-2 text-gray-300 pointer-events-none">
								{status == "loading" ? <LoadingSpinner /> : <SearchIcon className="w-5 h-5" />}
							</div>
							<input
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								type="text"
								className="w-full p-2 pl-8 text-gray-700 bg-transparent border border-black border-opacity-25 rounded-md outline-none dark:text-white dark:border-gray-500"
								name="search"
								placeholder="Colors, dev"
								id="search"
							/>
						</div>
					</div>
				</div>
				<div className="grid gap-4 md:grid-cols-2">
					{filteredStates.length !== 0 ? (
						filteredStates.map((e, idx) => (
							<a
								href={e.link + "?ref=squale.agency"}
								key={idx}
								className="flex items-start justify-start w-full px-2 py-2 text-gray-900 transition-all duration-100 bg-blue-800 rounded-md cursor-pointer dark:text-white transform-gpu ring-1 dark:hover:ring-opacity-100 hover:ring-opacity-100 dark:ring-opacity-10 ring-opacity-10 dark:ring-blue-100 ring-blue-700 bg-opacity-5"
							>
								<img
									loading="lazy"
									className="object-cover w-16 h-16 bg-gray-300 rounded bg-opacity-30 text-indeb"
									src={`${e.cover}`}
									alt=""
									style={{
										textIndent: -1000,
									}}
								/>
								<div className="flex flex-col flex-1 ml-3">
									<span className="text-base font-medium leading-6 line-clamp-1">{e.title}</span>
									<p className="text-sm leading-tight text-gray-600 dark:text-gray-400 line-clamp-2">{e.excerpt}</p>
								</div>
								<div className="flex items-center justify-center w-10 h-10 ml-2 bg-blue-200 rounded-md md:w-12 md:h-12 text-opacity-80 text-blue-50 bg-opacity-5">
									<LinkTo className="w-4 h-4 md:w-6 md:h-6" />
								</div>
							</a>
						))
					) : (
						<>
							<Skeleton id="skelt-1" />
							<Skeleton id="skelt-2" />
							<Skeleton id="skelt-3" />
							<Skeleton id="skelt-4" />
						</>
					)}
				</div>
			</main>
		</div>
	);
}
export async function getStaticProps() {
	const bookmarks = await getBookmarks();
	console.log("Bookmarks data fetched")
	// const bookmarks = await res.json();
	return {
		props: { bookmarks },
	};
}
