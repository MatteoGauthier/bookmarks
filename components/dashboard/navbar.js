/* This example requires Tailwind CSS v2.0+ */
import { signIn, signOut, useSession } from "next-auth/client";
import Link from "next/link";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MenuIcon, PlusIcon, XIcon, ArrowLeftIcon } from "@heroicons/react/outline";

const navigation = [{ name: "Back to bookmarks", href: "#", current: true }];

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
	const [session, loading] = useSession();

	if (session) console.log(session);

	//   return <>
	//     {!session && <>
	//       Not signed in <br/>
	//       <button onClick={() => signIn()}>Sign in</button>
	//     </>}
	//     {session && <>
	//       Signed in as {session.user.email} <br/>
	//       <button onClick={() => signOut()}>Sign out</button>
	//     </>}
	//   </>
	return (
		<Disclosure as="nav" className="bg-gray-800">
			{({ open }) => (
				<>
					<div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
						<div className="relative flex items-center justify-between h-16">
							<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
								{/* Mobile menu button*/}
								<Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
									<span className="sr-only">Open main menu</span>
									{open ? (
										<XIcon className="block w-6 h-6" aria-hidden="true" />
									) : (
										<MenuIcon className="block w-6 h-6" aria-hidden="true" />
									)}
								</Disclosure.Button>
							</div>
							<div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
								<div className="items-center hidden sm:flex">
									<div className="flex items-center ">
										<Link href="/">
											<a
												className={classNames(
													"text-gray-300 hover:bg-gray-700 hover:text-white",
													"px-3 py-2 rounded-md text-sm font-medium flex items-center bg-gray-900 space-x-2"
												)}
											>
												<ArrowLeftIcon className="h-4" />

												<span>back to bookmarks</span>
											</a>
										</Link>
									</div>
								</div>
							</div>
							<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
								<button className="hidden text-gray-400 bg-gray-800 focus:outline-none md:block">
									{!session && <>Not signed in</>}
									{session && <>Signed in as {session.user.email}</>}
								</button>

								{/* Profile dropdown */}
								<Menu as="div" className="relative ml-3">
									{({ open }) => (
										<>
											<div>
												<Menu.Button className="flex text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
													<span className="sr-only">Open user menu</span>
													<img
														className="w-8 h-8 rounded-full"
														src={
															// session?.user?.image ||
															"https://images.unsplash.com/photo-1511367461989-f85a21fda167?crop=entropy&cs=tinysrgb&fit=facearea&fm=jpg&ixid=MXwxfDB8MXxhbGx8fHx8fHx8fA&ixlib=rb-1.2.1&q=80&w=256&h=256"
														}
														alt=""
													/>
												</Menu.Button>
											</div>
											<Transition
												show={open}
												as={Fragment}
												enter="transition ease-out duration-100"
												enterFrom="transform opacity-0 scale-95"
												enterTo="transform opacity-100 scale-100"
												leave="transition ease-in duration-75"
												leaveFrom="transform opacity-100 scale-100"
												leaveTo="transform opacity-0 scale-95"
											>
												<Menu.Items
													static
													className="absolute right-0 w-64 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
												>
													<Menu.Item>
														{({ active }) => (
															<div
																className={classNames(
																	active ? "bg-gray-100" : "",
																	"block px-4 py-2 text-sm text-gray-700"
																)}
																style={{
																	textOverflow: "ellipsis",
																	overflow: "hidden",
																}}
															>
																{session ? <>Connected as {session.user.email}</> : "Not connected"}
															</div>
														)}
													</Menu.Item>

													<Menu.Item>
														{({ active }) => (
															<button
																className={classNames(
																	active ? "bg-gray-100" : "",
																	"block px-4 py-2 text-sm w-full text-left text-gray-700"
																)}
																onClick={() => (session ? signOut() : signIn())}
															>
																{session ? <>Sign Out</> : "Sign in"}
															</button>
														)}
													</Menu.Item>
												</Menu.Items>
											</Transition>
										</>
									)}
								</Menu>
							</div>
						</div>
					</div>

					<Disclosure.Panel className="sm:hidden">
						<div className="px-2 pt-2 pb-3 space-y-1">
							{navigation.map((item) => (
								<a
									key={item.name}
									href={item.href}
									className={classNames(
										item.current ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white",
										"block px-3 py-2 rounded-md text-base font-medium"
									)}
									aria-current={item.current ? "page" : undefined}
								>
									{item.name}
								</a>
							))}
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);
}
