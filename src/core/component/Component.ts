export interface Component {
	ToNet(): any;
	FromNet(): void;
	Update(): void;
}
