export interface Menu {
	name: string;
	description: string;
	sizes: [MenuSize];
}

export interface MenuSize {
	size: string;
	price: number;
}

export interface Restaurant {
	name: string;
	category: string;
	description: string;
	telephone: string;
	menus: Menu[];
	openTime: string[];
	closeTime: string[];
	location: string;
	comment?: [];
}
