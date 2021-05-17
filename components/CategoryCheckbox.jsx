import clsx from "clsx";
import React from "react";
import categories from "../config";

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

function CategoryCheckbox({ category, checked, ...props }) {
	return (
		<button
			className={clsx(
				"flex items-center justify-center flex-auto py-2 rounded-lg focus:outline-none focus:ring focus:ring-green-200 cursor-pointer ",
				checked ? "bg-green-600" : "bg-gray-500"
			)}
			// style={{
			// 	background: category?.gradient,
			// }}
			{...props}
		>
			{category.text}
		</button>
	);
}

export default CategoryCheckbox;
