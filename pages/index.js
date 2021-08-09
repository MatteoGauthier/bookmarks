import Head from "next/head"
import dynamic from "next/dynamic"

import { getBookmarks } from "../libs/notion"
import categories from "../config"
import { useRouter } from "next/router"

import React, { useEffect, useState } from "react"
import LoadingSpinner from "../components/svg/LoadingSpinner"
import SearchIcon from "@heroicons/react/outline/SearchIcon"
import LinkTo from "../components/svg/LinkTo"
const ThemeSwitcher = dynamic(() => import("../components/ThemeSwitcher"), { ssr: false })

import Skeleton from "../components/Skeleton"
import CategoryCheckbox from "../components/CategoryCheckbox"
import { EyeIcon } from "@heroicons/react/outline"

export default function Home({ bookmarks: { items } }) {
	// console.log( items)
	const router = useRouter()
	const { q } = router.query

	const [search, setSearch] = useState("")
	const [status, setStatus] = useState("")
	const [filteredStates, setFilteredStates] = useState([])

	const [categoriesFilter, setCategoriesFilter] = useState([])

	const handleCategoriesChange = (category) => {
		if (categoriesFilter.includes(category)) {
			setCategoriesFilter(
				categoriesFilter.filter((item, i) => {
					return item !== category
				})
			)
		} else {
			setCategoriesFilter([...categoriesFilter, category])
		}
	}

	useEffect(() => {
		console.log(items.length)

		const timer = setTimeout(() => {
			const filter = items.filter((elm) => {
				const filterExpression = categoriesFilter.some((f) => elm.tags.includes(f))
				return categoriesFilter.length == 0 ? true : filterExpression
			})

			setStatus("success")
			setFilteredStates(filter)
		}, 250)

		return () => {
			clearTimeout(timer)
			setStatus("loading")
		}
	}, [categoriesFilter])
	return (
		<div>
			<Head>
				<title>
					Bookmarks | Ressources et outils du web (design, fonts, icons, et +)
				</title>
				<meta
					name="description"
					content="Liste d'outils, de ressources et de services utilisés par squale.agency. Utile pour les créatifs, les développeurs ou encore le marketing. Mis à jour régulièrement !"
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
						est une base de donnée des outils favoris de <a href="https://squale.agency">squale.agency</a>, chacun des
						outils sont regroupés par catégories, vous pouvez filtrer les résultats ou chercher un outil avec un mot
						clé.
					</p>
				</header>
			</div>
			<main className="px-6 mx-auto my-8 lg:max-w-screen-lg lg:px-0">
				<div className="flex mb-4 text-gray-900 dark:text-white">
					<div className="flex-col items-end hidden w-full space-y-1 md:w-auto">
						<label>Rechercher un outil</label>
						<div className="relative w-full border-white border-opacity-25 rounded hover:outline-none">
							<div className="absolute inset-y-0 left-0 flex items-center px-2 text-gray-300 pointer-events-none">
								{status == "loading" ? <LoadingSpinner /> : <SearchIcon className="w-5 h-5" />}
							</div>
							<input
								value={search}
								// onClick={(e) => (e.target.value = "")}
								defaultValue={q && ""}
								onChange={(e) => {
									setSearch([...search, e.target.value])
								}}
								type="text"
								className="w-full p-2 pl-8 text-gray-700 bg-transparent border border-black border-opacity-25 rounded-md outline-none dark:text-white dark:border-gray-500"
								name="search"
								placeholder="Colors, dev"
								id="search"
							/>
						</div>
					</div>
					<div className="flex-1 w-full space-y-1 md:w-auto">
						<div>Catégories</div>
						<div className="flex flex-wrap justify-between flex-1 -ml-3">
							{categories.map((category, idx) => (
								<CategoryCheckbox
									key={idx}
									category={category}
									checked={categoriesFilter.includes(category.value)}
									onClick={() => handleCategoriesChange(category.value)}
								/>
							))}
						</div>
					</div>
				</div>
				<div className="grid gap-4 md:grid-cols-2">
					{filteredStates.length !== 0 ? (
						filteredStates.map((e, idx) => (
							<a
								href={e.link + "?ref=squale.agency"}
								key={idx}
								className="flex relative items-start justify-start w-full px-2 py-2 text-gray-900 transition-all duration-100 bg-blue-800 rounded-md cursor-pointer dark:text-white transform-gpu ring-1 dark:hover:ring-opacity-100 hover:ring-opacity-100 dark:ring-opacity-10 ring-opacity-10 dark:ring-blue-100 ring-blue-700 bg-opacity-5"
							>
								{e.score && (
									<div className="absolute -bottom-2 -right-2 rounded-lg shadow px-1.5 py-1 font-normal dark:bg-gray-900 bg-white bg-opacity-90 text-blue-gray-900 dark:text-white leading-none flex items-center justify-center z-30">
										<EyeIcon className="h-4 w-4 mr-0.5" />
										<span className="text-xs">{e.score}</span>
									</div>
								)}
								<div className="relative object-cover w-16 h-16 bg-transparent rounded bg-opacity-30">
									<img
										loading="lazy"
										className="absolute inset-0 object-cover w-full h-full"
										src={`${e.cover}`}
										alt={e.name + " image cover"}
										onError={(event) => {
											console.log(e)
											event.target.remove()
										}}
									/>
								</div>
								<div className="flex flex-col flex-1 ml-3">
									<span className="text-base font-medium leading-6 line-clamp-1">{e.name}</span>
									<p className="text-sm leading-tight text-gray-600 dark:text-gray-400 line-clamp-2">{e.excerpt}</p>
								</div>
								<div>
									<div className="flex items-center justify-center w-10 h-10 ml-2 bg-blue-200 rounded-md md:w-12 md:h-12 text-opacity-80 text-blue-50 bg-opacity-5">
										<LinkTo className="w-4 h-4 md:w-6 md:h-6" />
									</div>
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
	)
}
export async function getStaticProps() {
	const bookmarks = await getBookmarks()

	console.log("Bookmarks data fetched")
	// const bookmarks = await res.json();
	return {
		props: { bookmarks },
		revalidate: 240
	}
}
