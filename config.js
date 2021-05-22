const category = (value, text, gradient) => {
	return { value, text, gradient };
};

const categories = [
	category("Design", "Design", "linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)"),
	category("Inspiration", "Inspiration", "linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)"),
	category("Typo", "Typographie", "linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)"),
	category("Colors", "Couleurs", "linear-gradient(300deg, #00DBDE 0%, #FC00FF 100%)"),
	category("Icons", "Icons", "linear-gradient( 94.3deg,  rgba(26,33,64,1) 10.9%, rgba(81,84,115,1) 87.1% )"),
	category("Dev", "Développement", "linear-gradient(0deg, #F0D5B6, #F16238)"),
	category("SEO", "SEO", "linear-gradient( 135deg, #E2B0FF 10%, #9F44D3 100%)"),
	category("Various", "Divers", " linear-gradient( 135deg, #69FF97 10%, #00E4FF 100%)"),
	category("Marketing", "Marketing", "linear-gradient( 135deg, #FD6E6A 10%, #FFC600 100%)"),
	category("Productivity", "Productivité", "linear-gradient( 110.3deg,  rgba(73,93,109,1) 4.3%, rgba(49,55,82,1) 96.7% )"),
];

export default categories;
