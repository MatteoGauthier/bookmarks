const category = (value, text, gradient) => {
	return { value, text, gradient };
};

const categories = [
	category("Design", "Design"),
	category("Inspiration", "Inspiration"),
	category("Typo", "Typographie"),
	category("Colors", "Couleurs"),
	category("Icons", "Icons"),
	category("Dev", "Développement"),
	category("SEO", "SEO"),
	category("Various", "Divers"),
	category("Marketing", "Marketing"),
	category("Productivity", "Productivité"),
];

console.log(categories)
export default categories;
