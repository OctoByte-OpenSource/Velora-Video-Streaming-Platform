import PropTypes from "prop-types";

function Button({ children, onClick }) {
	return (
		<button
			onClick={onClick}
			className='
        px-5 py-2
        flex items-center space-x-4
        text-white
        font-semibold
        border border-gray-100 
        rounded-lg
        bg-blue-500
        hover:bg-blue-600 
        focus:outline-none 
        focus:ring-2 
        focus:ring-blue-500
        transition
      '>
			{children}
		</button>
	);
}
Button.propTypes = {
	children: PropTypes.node.isRequired,
	onClick: PropTypes.func.isRequired,
};

export default Button;
