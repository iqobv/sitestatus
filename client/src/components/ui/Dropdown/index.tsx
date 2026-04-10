import DropdownProvider from './DropdownContext';
import DropdownItem from './DropdownItem';
import DropdownMenu from './DropdownMenu';
import DropdownTrigger from './DropdownTrigger';

const Dropdown = Object.assign(DropdownProvider, {
	Trigger: DropdownTrigger,
	Menu: DropdownMenu,
	Item: DropdownItem,
});

export default Dropdown;
