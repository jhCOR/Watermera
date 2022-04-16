export class Size{
	constructor(normal_size, expand_size){
		this.FULL_SIZE = 1;
		this.NORMAL_SIZE = 0;
		this.normal = normal_size;
		this.expand = expand_size;
	}
	getSize(option){
		return (option == this.FULL_SIZE) ? this.expand : this.normal;
	}
}