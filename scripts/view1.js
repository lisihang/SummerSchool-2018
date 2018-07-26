var view1 = 
{
	initialize:function()
	{
		print("view1");

		var svg = d3.select("#view1-svg")
		.append("svg")
		.attr("height", function()
		{
			return $("#view1-svg").height();
		})
		.attr("width", function()
		{
			return $("#view1-svg").width();
		});
		var projection = d3.geo.mercator()
		.center([116.46, 40.26])
		.scale(14500)
		.translate([svg.style('width').replace("px", "") / 2, svg.style('height').replace("px", "") / 2]);

		var path = d3.geo.path().projection(projection);

		d3.json("data/beijing.json", function(error, root)
		{
			svg.append("g")
			.attr("id", "view1-svg-map")
			.selectAll("path")
			.data(root.features)
			.enter()
			.append("path")
			.attr("stroke", "black")
			.attr("stroke-width", 1)
			.attr("fill", "white")
			.attr("d", path);

			svg.append("g")
			.attr("id", "view1-svg-circle")
			.selectAll("circle")
			.data(pos)
			.enter()
			.append("circle")
			.attr("id", function(d, i)
			{
				return "view1-svg-circle-" + i;
			})
			.attr("cx", function(d, i)
			{
				return projection([d.x, d.y])[0];
			})
			.attr("cy", function(d, i)
			{
				return projection([d.x, d.y])[1];
			})
			.attr("fill", function(d, i)
			{
				return "black";
			})
			.attr("r", 3)
			.attr("stroke-width", 0)
			.on("click", function(d, i)
			{
				if(selected[i])
				{
					selected[i] = false;
					d3.select("#view1-svg-circle-" + i)
					.attr("stroke-width", 0)
					.attr("r", 3);
				}
				else
				{
					selected[i] = true;
					d3.select("#view1-svg-circle-" + i)
					.attr("stroke", "red")
					.attr("stroke-width", 2)
					.attr("r", 4);
				}
				view2.updateSelected();
			});
		});
	},
	update:function()
	{

	}
};