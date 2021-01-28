export interface Menu {
	_id?: string,
	name: string;
	description: string;
	sizes: MenuSize[];
	image?: string;
}

export interface MenuSize {
	size: string;
	price: number;
}

export interface OpeningHour {
	openTime: string;
	closeTime: string;
}

export interface Location {
	fullAddress: string;
	extraAddress: string;
}

export interface Restaurant {
	name: string;
	category: string;
	description: string;
	image?: string;
	telephone: string;
	menus: Menu[];
	openingHours: OpeningHour[];
	location: Location;
	comment?: [];
}