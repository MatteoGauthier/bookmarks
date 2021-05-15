import React from "react";
import dynamic from "next/dynamic";
import { Controller } from "react-hook-form";
const Select = dynamic(() => import("react-select").then((mod) => mod.default), {
	ssr: false,
	loading: () => null,
});
const colourOptions = [
	{ value: "colors", label: "Couleurs", color: "#00B8D9", isFixed: true },
	{ value: "typography", label: "Typographie", color: "#0052CC" },
	{ value: "inspiration", label: "Inspiration", color: "#5243AA" },
	{ value: "dev", label: "Développement", color: "#FF5630", isFixed: true },
	{ value: "icons", label: "Icons", color: "#FF8B00" },
	{ value: "animation", label: "Animation", color: "#FFC400" },
	{ value: "seo", label: "SEO", color: "#FFC400" },
	{ value: "marketing", label: "Marketing", color: "#FFC400" },
	{ value: "productivity", label: "Productivity", color: "#FFC400" },
];
function CategoriesSelect(props) {
	return (
		<Controller
			control={props.control}
			name="categories"
			render={({ field: { onChange, value, name, ref } }) => (
				<Select
					inputRef={ref}
					options={colourOptions}
					value={colourOptions.find((c) => c.value === value)}
					onChange={(val) => {
						onChange(val);
					}}
					className="mt-1 basic-multi-select"
					classNamePrefix="select"
					isMulti
				/>
			)}
		/>
	);
}

export default CategoriesSelect;
