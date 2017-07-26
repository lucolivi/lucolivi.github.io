function loadRouteDiagram(data) {

    var blocks = data.nodes;

    var blocksSelection = d3.select("#svg-container")
        .selectAll(".nvgtt-block")
        .data(blocks, function(d) { return d.globalId; })
        .enter()

    var createSelection = blocksSelection;

    var blockGroup = createSelection.append("g")
        .classed("nvgtt-block", function(d) {
            d.d3Select = d3.select(this);
            return true;
        });

    var blockPathGroup = blockGroup.append("g");
    //     .on("click", function(d) {
    //         eventHandler.fire("click", d);
    //     })
    //     .on("dblclick", function(d) {
    //         eventHandler.fire("dblclick", d);
    //     });

    var blockPath = blockPathGroup.append("path")
        .classed("nvgtt-block-path", true);

    //Block name text
    var blockText = blockPathGroup.append("text")
        .classed("nvgtt-block-text", true)
        .attr("text-anchor", "middle");

    //Draw input symbol
    blockGroup.append("path")
        .classed("nvgtt-block-input", true)
        .attr("d", "M0,0 h5 v12 h-5z");
        // .on("mousedown", function(d){
        //     d3.event.cancelBubble = true;
        //     eventHandler.fire("input_mousedown", d);
        // })
        // .on("mouseup", function(d){
        //     d3.event.cancelBubble = true;
        //     eventHandler.fire("input_mouseup", d);
        // })
        // .on("click", function(d) {
        //     d3.event.cancelBubble = true;
        //     eventHandler.fire("input_click", d);
        // });

    //Draw output symbol
    blockGroup.append("path")
        .classed("nvgtt-block-output", true)
        .attr("d", "M0,0 h5 v12 h-5z");
        // .on("mousedown", function(d){
        //     d3.event.cancelBubble = true;
        //     eventHandler.fire("output_mousedown", d);
        // })
        // .on("mouseup", function(d){
        //     d3.event.cancelBubble = true;
        //     eventHandler.fire("output_mouseup", d);
        // })
        // .on("click", function(d) {
        //     d3.event.cancelBubble = true;
        //     eventHandler.fire("output_click", d);				
        // });
}






            var blockMargin = 2;
            var blockScale = 1;
            var textMargin = 10;

            var sortedNodes = JSON.parse(mapDataStr).nodes;

            var block = d3.select("#svg-container").selectAll(".square-blocks")
                .data(sortedNodes)
                .enter()
                .append("g")
                .attr("transform", function(d) {
                    d.dom = this;
                    return "translate(" + d.x*blockScale + " " + d.y*blockScale + ")";
                })
                .attr("class", "square-blocks")
                .append("a")
                .attr("href", function(d) {
                    return "#";
                    // if(typeof getHashPath == 'undefined')
                    //     return;

                    // var pathList = getHashPath()
                    // pathList.push(d.id);
                    // return "#" + pathList.join("/");
                });

            block.append("rect")
                .attr("fill", "blue")
                .attr("height", function(d){
                    d.height = 50;
                    d.blockHeight = d.height*blockScale - blockMargin;
                    return d.blockHeight;
                })
                .attr("width",  function(d){
                    d.width = 200;
                    d.blockWidth = d.width*blockScale - blockMargin;
                    return d.blockWidth;
                });

            var textBlock = block.append("text")
                .text(function(d) {
                    return d.name;
                    // var blockTextValue = decodeURIComponent(d.name);
                    // blockTextValue = blockTextValue.replaceAll("_", " ");
                    // return blockTextValue; 
                });
                // .attr("font-size", 5); 


            //Get ggbox for each text to adjust its size
            textBlock.each(function(d) {
                //Ratio between height/font-size for upper case include is =~ 1.3
                // 1/1.3 =~ 0.75
                var textBBox = this.getBBox();
                d.fontSize = 0.75 * (textBBox.height/(textBBox.width + textMargin)) * (d.blockWidth);
            });

            textBlock
                .attr("text-anchor", "middle")
                .attr("fill", "#d3efbd")
                .attr("font-size", function(d){ return d.fontSize; })
                .attr("x", function(d){
                    return parseInt(d.blockWidth / 2);
                })
                .attr("y", function(d) {
                    return d.blockHeight / 2 + this.getBBox().height*0.45 / 2;
                });
            
            