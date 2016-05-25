export abstract class Component {
	constructor(private type: string) {}
	ToNet(): any {};
	FromNet(data: any): void {};
	Update(): void {};
	Start(): void {};
	Type(): string {
		return this.type;
	};
}
