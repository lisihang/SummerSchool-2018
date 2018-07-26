var view3 = 
{
	initialize:function()
	{
		print("view3");

		var svg = d3.select("#view3-svg")
		.append("svg")
		.attr("height", function()
		{
			return $("#view3-svg").height();
		})
		.attr("width", function()
		{
			return $("#view3-svg").width();
		});

		var wid = $("#view3-svg").width()/365;
		var sty = $("#view3-svg").height()*0.3;

		svg.selectAll("g")
		.data(data)
		.enter()
		.append("g")
		.attr("id", function(d, i)
		{
			return "view3-svg-line-"+i;
		});

		var avg = new Array(365);
		var mx = 0;
		for(var i=0;i<365;i++)
		{
			avg[i] = new Array(24);
			for(var j=0;j<24;j++)
			{
				avg[i][j] = d3.mean(data[i][j][2]);
				mx = Math.max(mx, avg[i][j]);
			}
		}

		for(var k=0;k<365;k++)
		{
			var g = svg.select("#view3-svg-line-"+k);
			g.selectAll("rect")
			.data(avg[k])
			.enter()
			.append("rect")
			.attr("width", wid)
			.attr("height", wid)
			.attr("x", function(d, i)
			{
				return k*wid;
			})
			.attr("y", function(d, i)
			{
				return sty+i*wid;
			})
			.attr("fill", function(d, i)
			{
				if(d <= 50)
					return "#76EE00";
				if(d <= 100)
					return "#EEEE00";
				if(d <= 200)
					return "#EE7600";
				if(d <= 300)
					return "#EE0000";
				return "#8B2500";
			});
		}
		var month = new Array(12);
		for(var i=0;i<12;i++)
			month[i]=i+1;
		svg.append("g")
		.attr("id", "view3-svg-month")
		.selectAll("text")
		.data(month)
		.enter()
		.append("text")
		.attr("x", function(d, i)
		{
			var da = 0;
			for(var k=1;k<=i;k++)
				da+=days[k];
			return da*wid;
		})
		.attr("y", function(d, i)
		{
			return sty+30*wid;
		})
		.text(function(d, i)
		{
			return ""+d;
		});

		var slider = d3.slider()
		.min(0)
		.max(364)
		.value([0, 364])
		.on("slide", function(evt, value)
		{
			startyear = parseInt(value[0]);
			endyear = parseInt(value[1]);
			view3.update();
		});

		d3.select("#view3-slider")
		.call(slider);
	},
	update:function()
	{
		for(var i=0;i<startyear;i++)
			d3.select("#view3-svg-line-"+i)
			.selectAll("rect")
			.attr("fill-opacity", 0.3);
		for(var i=endyear+1;i<365;i++)
			d3.select("#view3-svg-line-"+i)
			.selectAll("rect")
			.attr("fill-opacity", 0.15);
		for(var i=startyear;i<=endyear;i++)
			d3.select("#view3-svg-line-"+i)
			.selectAll("rect")
			.attr("fill-opacity", 1.0);
	}
};