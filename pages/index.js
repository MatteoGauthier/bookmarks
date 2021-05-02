import Head from "next/head";
import { getBookmarks } from "../libs/raindrop";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "../components/svg/LoadingSpinner";
import SearchIcon from "@heroicons/react/outline/SearchIcon";
import LinkTo from "../components/svg/LinkTo";

import Image from "next/image";

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
			<div className="w-full bg-white h-52">
				<header className="flex flex-col justify-center w-full h-full mx-auto lg:max-w-screen-lg ">
					<h1 className="font-normal leading-none tracking-1 mb-5 text-52 font-satoshi text-[#05001A]">
						<b>bookmarks</b>.squale.agency
					</h1>
					<p className="font-light text-[#4D515F] leading-5 text-lg">
						<span className="font-bold text-xl font-satoshi leading-5 text-[#1A1E31]">bookmarks</span> est une base de
						donnée des outils favoris de squale.agency, chacun des outils sont regroupés par catégories, vous pouvez
						filtrer les résultats ou chercher un outil avec un mot clé.
					</p>
				</header>
			</div>
			<main className="mx-auto mt-8 lg:max-w-screen-lg">
				<div className="justify-between hidden text-white ">
					<div className="flex flex-col">
						<label>Filtrer par tag</label>
					</div>
					<div className="flex-col items-end space-y-2">
						<label>Rechercher</label>

						<div className="relative border-white border-opacity-25 rounded hover:outline-none">
							<div className="absolute inset-y-0 right-0 flex items-center pl-2 text-gray-300 pointer-events-none">
								{status == "loading" ? <LoadingSpinner /> : <SearchIcon />}
							</div>
							<input
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								type="text"
								className="text-white bg-transparent border-white border-opacity-25"
								name="search"
								id="search"
							/>
						</div>
					</div>
				</div>
				<div className="grid grid-cols-2 gap-4">
					{filteredStates.map((e, idx) => (
						<a
							href={e.link + "?ref=squale.agency"}
							key={idx}
							className="flex items-start justify-start w-full px-2 py-2 text-white transition-all transition-transform duration-200 bg-blue-800 border border-blue-100 rounded-md cursor-pointer transform-gpu ring-0 hover:ring-1 ring-blue-100 bg-opacity-5 border-opacity-10"
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
								<p className="text-sm leading-tight text-gray-400 line-clamp-2">{e.excerpt}</p>
							</div>
							<div className="flex items-center justify-center w-12 h-12 ml-2 bg-blue-200 rounded-md text-opacity-80 text-blue-50 bg-opacity-5">
								<LinkTo />
							</div>
						</a>
					))}
				</div>
			</main>
		</div>
	);
}
export async function getStaticProps() {
	const bookmarks = await getBookmarks();
	// const bookmarks = await res.json();
	return {
		props: { bookmarks },
	};
}
