module.exports = function(input, output) {

	const raw = input.replace(/(^\s*)|(\s*$)/g, "").replace(/(^{?)|(}?$)/g, "");

	const rows = raw.split("\n");

	const nonblanks = {};
	const blanks = {};

	for(let i=1; i<rows.length-1; i++) {
		const row = rows[i];
		
		const rowKey1 = row.match(/[\s]*[\"]*(.)*[\"]*[\s]*[:][\s]*[\"]/)[0];
		let rowKey2 = rowKey1.substring(0, rowKey1.length-1).replace(/(^\s*)|(\s*$)/g, "");
		rowKey2 = rowKey2.replace(/(^\"*)|([\"]*[\s]*[:][\s]*[\"]*$)/g, "");
		let rowValue2 = row.substring(rowKey1.length);
		rowValue2 = rowValue2.replace(/(^\s*)|(\s*$)/g, "");
		rowValue2 = rowValue2.substring(0, rowValue2.length-1).replace(/(\"*$)/g, "");
		
		if(rowValue2!=""){
			nonblanks[rowKey2] = rowValue2;
		} else {
			blanks[rowKey2] = "";
		}
	}

	for(let k of Object.keys(blanks)) {
		if(nonblanks[k]) {
			delete blanks[k]
		}
	}

	const nonblankKeys = Object.keys(nonblanks).sort();
	const blankKeys = Object.keys(blanks).sort();

	const allKeys = nonblankKeys.concat(blankKeys);
	const all = Object.assign({}, nonblanks, blanks);

	output.write(`{\n`);
	for(let i=0; i < allKeys.length; i++) {
		const k = allKeys[i];
		if(i!=allKeys.length-1) {
			output.write(`\t"${k}":"${all[k]}",\n`)
		} else {
			output.write(`\t"${k}":"${all[k]}"\n`)
		}
	}

	output.write(`}`);

}