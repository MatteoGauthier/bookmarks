import React, { useState } from "react";

import Navbar from "../components/dashboard/navbar";
import CategoriesSelect from "../components/dashboard/CategoriesSelect";
import { useForm } from "react-hook-form";

export default function Dashboard() {
	const [user, setUser] = useState();
	const { register, handleSubmit, control } = useForm();
	const onSubmit = (e) => {
		// You should handle login logic with username, password and remember form data
		// setUser({ name: username });
		console.log(e);
	};

	return (
		<div className="text-black bg-white pb-96">
			<Navbar />
			<div className="pt-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
				<h1 className="mb-4 text-2xl font-semibold text-gray-800">Ajouter un favoris</h1>
				<div className="max-w-screen-md mt-10 sm:mt-0">
					<div className="mt-5 md:mt-0">
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className="shadow  sm:rounded-md">
								<div className="px-4 py-5 bg-white sm:p-6">
									<div className="grid grid-cols-6 gap-6">
										<div className="col-span-6 sm:col-span-3">
											<label htmlFor="title" className="block text-sm font-medium text-gray-700">
												Titre
											</label>
											<input
												type="text"
												name="title"
												id="title"
												autoComplete="off"
												className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
											/>
										</div>

										<div className="col-span-3 row-span-2">
											<div className="flex items-center justify-center ">
												<div className="w-32 h-32 bg-gray-700 rounded"></div>
											</div>
										</div>

										<div className="col-span-6 sm:col-span-3">
											<label htmlFor="link" className="block text-sm font-medium text-gray-700">
												Website link
											</label>
											<input
												type="url"
												name="link"
												id="link"
												{...register("link")}
												autoComplete="off"
												className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
											/>
										</div>

										<div className="col-span-6 sm:col-span-3">
											<label htmlFor="categories" className="block mb-1 text-sm font-medium text-gray-700">
												Catégories
											</label>
											<CategoriesSelect control={control} />
										</div>
										<div className="col-span-3 col-start-4 row-span-1">
											<label htmlFor="cover" className="block text-sm font-medium text-gray-700">
												Website cover
											</label>
											<input
												type="url"
												name="link"
												id="link"
												{...register("link")}
												autoComplete="off"
												className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
											/>
										</div>
										<div className="col-span-6">
											<label htmlFor="description" className="block text-sm font-medium text-gray-700">
												Website description
											</label>
											<div className="mt-1">
												<textarea
													{...register("description")}
													id="description"
													name="description"
													rows={3}
													className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
													placeholder="Ce site web est incroyable"
													defaultValue={""}
												/>
											</div>
											<p className="mt-2 text-sm text-gray-500">
												Description du site web, <a className="text-green-500">récupérer la description du site web</a>
											</p>
										</div>
									</div>
								</div>
								<div className="px-4 py-3 text-right bg-gray-50 sm:px-6">
									<button
										type="submit"
										className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
									>
										Proposer ce favoris
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
