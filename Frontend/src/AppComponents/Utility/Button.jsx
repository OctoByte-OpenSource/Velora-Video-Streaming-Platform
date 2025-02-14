import PropTypes from "prop-types";

function MinimalButton({ children, onClick }) {
	return (
		<button
			onClick={onClick}
			className='
        px-5 py-2
        text-white
        border border-gray-100 
        rounded
        bg-blue-500
        hover:bg-gray-100 
        focus:outline-none 
        focus:ring-2 
        focus:ring-blue-500
        transition
      '>
			{children}
		</button>
	);
}
MinimalButton.propTypes = {
	children: PropTypes.node.isRequired,
	onClick: PropTypes.func.isRequired,
};

export default MinimalButton;
