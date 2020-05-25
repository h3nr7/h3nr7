// declare for react-router-transition
declare module "react-router-transition" {
    import {RouteProps} from "react-router";

	interface AnimatedSwitchProps
	{
		atEnter: React.CSSProperties;
		atLeave: React.CSSProperties;
		atActive: React.CSSProperties;
		didLeave?: (style: React.CSSProperties) => void;
		className?: HTMLDivElement;
		wrapperComponent?: keyof HTMLElementTagNameMap;
		mapStyles?: (styles: React.CSSProperties) => React.CSSProperties;
		runOnMount?: boolean;
		children: React.ReactNode;
	}

	interface AnimatedRouteProps extends RouteProps
	{}


	export const AnimatedSwitch: React.ComponentClass<AnimatedSwitchProps>;
	export const AnimatedRoute: React.ComponentClass<AnimatedRouteProps>;
	export const RouteTransition: React.ComponentClass<AnimatedSwitchProps>;
}

// react-meta-tags
declare module 'react-meta-tags';
// rich-text-to-react
declare module 'rich-text-to-react';
// declare for all image extension
declare module '*.svg' {
	const content: string;
  	export default content;
}
declare module '*.png';
declare module '*.jpg';
declare module '*.gif';
declare module '*.less';