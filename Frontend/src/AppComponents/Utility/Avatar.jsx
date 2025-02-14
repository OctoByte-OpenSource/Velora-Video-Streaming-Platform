import { User } from "lucide-react";
import PropTypes from "prop-types";

const Avatar = ({ size = "md", imageUrl, name, className = "" }) => {
	const getInitials = () => {
		if (!name) return "";
		const parts = name.trim().split(" ");
		if (parts.length === 1) {
			return parts[0].slice(0, 2);
		}
		return parts[0][0] + parts[parts.length - 1][0];
	};

	const initials = getInitials().toUpperCase();

	let containerClass = "";
	let textClass = "";

	switch (size) {
		case "sm":
			containerClass = "w-8 h-8";
			textClass = "text-xs";
			break;
		case "lg":
			containerClass = "w-12 h-12";
			textClass = "text-base";
			break;
		case "xl":
			containerClass = "w-16 h-16";
			textClass = "text-lg";
			break;
		default:
			containerClass = "w-10 h-10";
			textClass = "text-sm";
	}

	return (
		<div
			className={`rounded-full bg-gray-100 flex items-center justify-center overflow-hidden ${containerClass} ${className}`}>
			{imageUrl ? (
				<img
					src={imageUrl}
					alt={name || "User avatar"}
					className='w-full h-full object-cover'
				/>
			) : initials ? (
				<span className={`font-semibold text-gray-600 ${textClass}`}>
					{initials}
				</span>
			) : (
				<User className={`text-gray-400 ${textClass}`} />
			)}
		</div>
	);
};
Avatar.propTypes = {
	size: PropTypes.oneOf(["sm", "md", "lg", "xl"]),
	imageUrl: PropTypes.string,
	name: PropTypes.string,
	className: PropTypes.string,
};

export default Avatar;
