var view2 = 
{
	initialize:function()
	{
		print("view2");

		var svg = d3.select("#view2-svg")
		.append("svg")
		.attr("height", function()
		{
			return $("#view2-svg").height();
		})
		.attr("width", function()
		{
			return $("#view2-svg").width();
		});
		var wid = $("#view2-svg").width();
		var hei = $("#view2-svg").height() * 0.9 / 7;
		print(wid);
		print(hei);
	}
};