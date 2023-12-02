const { Router } = require('express');
const route = Router();


route.get('/:keyword',(req,res)=>{
	let keyword = req.params.keyword;
	let newList = [];
	fetch('URL',{
		headers: {'Content-Type': 'application/json'},
		method: 'GET'
	})
	.then(response => response.json())
	.then((data) => {
		if (keyword != ""){
			for (let i of data){
				if(i.includes(keyword)) newList.push(i)
			}
		}
	})
});


module.exports = route;