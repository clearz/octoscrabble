
Array.prototype.binSearch = function(needle, case_insensitive) {  
	if (!this.length) return -1;  

	var high = this.length - 1;  
	var low = 0;  
	case_insensitive = (typeof(case_insensitive) !== 'undefined' && case_insensitive) ? true:false;  
	needle = (case_insensitive) ? needle.toLowerCase():needle;  

	while (low <= high) {  
	    mid = parseInt((low + high) / 2)  
	    element = (case_insensitive) ? this[mid].toLowerCase():this[mid];  
	    if (element > needle) {  
		high = mid - 1;  
	    } else if (element < needle) {  
		low = mid + 1;  
	    } else {  
		return mid;  
	    }  
	}  

	return -1;  
}; 

function wordExists(w)
{
	return wordList.binSearch(w, true) != -1;
}