//Module to enable block content to be show
//For now, only register a double click event on blocks to open its page

NvgttChart.Blocks.on("dblclick", function(block) {
	console.log(block);
	//Go to the article page
	var tempLink = d3.select("body")
		.append("a")
		.attr("target", "_blank")
		.attr("href", block.link);

	tempLink.node().click();
	//tempLink.remove();

});