var databaseModelClass = require('../routes/class/database');
const databaseModel = databaseModelClass.databaseModel;

var addItem=async (req, res)=>{

	var database = req.app.get('database');

	try{
		var item = new database.ItemModel({
			itemName: 'paramTitle',
			itemValue: 'paramContents',
		});
			
		item.savePost(function(err, result) {
			var parameter = {req:req,res:res,ID: result.id};
			showItem(parameter);
		});
			
	}catch(error){
			console.log(error);
	}
}

var showItem = (parameter)=>{
	const {req,res,ID} = parameter;
	var paramId = ID;
	var database = req.app.get('database');
	
	database.ItemModel.load(paramId, function (err, results) {

		if (err) {
			console.log('error');
			console.error('게시판 글 조회 중 에러 발생 : ' + err.stack);
			printer.errrendering(res,err);
			return;
		}
		console.log(results);	
		if (results) {

			var context = {
				post: results,
			};
			   
			res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
			res.write(context.post.itemName);
			res.end();
		} else {
			res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
			res.write('<h2>글 조회  실패</h2>');
			res.end();
		}
	});
}

module.exports.addItem = addItem;
module.exports.showItem = showItem;