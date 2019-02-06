import { library } from "@fortawesome/fontawesome-svg-core";
import {
	faCircleNotch,
	faCog,
	faUser,
	faChevronDown,
	faChevronUp,
	faSignOutAlt,
	faHeart,
	faBookmark,
	faLongArrowAltRight,
	faEnvelope,
	faPhone,
	faMap
} from "@fortawesome/free-solid-svg-icons";

const initializeFontAwesome = () =>
	library.add(
		faCircleNotch,
		faCog,
		faUser,
		faChevronDown,
		faChevronUp,
		faSignOutAlt,
		faHeart,
		faBookmark,
		faLongArrowAltRight,
		faEnvelope,
		faPhone,
		faMap
	);

export default initializeFontAwesome;
