import TooltipContent from './TooltipContent/TooltipContent';
import TooltipProvider from './TooltipContext';
import TooltipTrigger from './TooltipTrigger/TooltipTrigger';

const Tooltip = Object.assign(TooltipProvider, {
	Trigger: TooltipTrigger,
	Content: TooltipContent,
});

export default Tooltip;
