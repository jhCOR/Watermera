module.exports = {
	server_port: 3001,
	db_url: 'mongodb://localhost:27017/admin',
	db_schemas: [
		{file:'./itemSchema', collection:'item', schemaName:'ItemSchema', modelName:'ItemModel'}
	],
	route_info: [
		{file:'../model/itemModel', path:'/add', method:'addItem', type:'get'},
		{file:'../model/itemModel', path:'/show', method:'showItem', type:'get'}
	],
};
