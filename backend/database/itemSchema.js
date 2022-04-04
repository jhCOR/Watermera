var utils = require('../utils/utils');

var SchemaObj = {};

SchemaObj.createSchema = function(mongoose) {

	var ItemSchema = mongoose.Schema({		
		itemName: { type: String, default: '' },
		itemValue: { type: String, default: '' },			

	    created_at: {type: Date, index: {unique: false}, 'default': Date.now},
	    updated_at: {type: Date, index: {unique: false}, 'default': Date.now}
	});
	
	ItemSchema.path('itemValue').required(true, '내용을 입력하셔야 합니다.');
	
	ItemSchema.methods = {
		savePost: function(callback) {	
			var self = this;
			
			this.validate(function(err) {
				if (err) return callback(err);
				
				self.save(callback);
			});
		}
	}
	
	
	ItemSchema.statics = {
		load: function(id, callback) {
			this.findOne({_id: id})
				.exec(callback);
		}
	}
	
	console.log('ItemSchema 정의함.');
	return ItemSchema;
};

module.exports = SchemaObj;