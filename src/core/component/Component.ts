export interface Component {
	ToNet(): any;
	FromNet(data: any): void;
	Update(): void;
	Type(): string;
}
