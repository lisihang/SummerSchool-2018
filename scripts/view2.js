var view2 = 
{
	scale:null,
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

		var hei = $("#view2-svg").height()*0.99 / 7;

		var slider = d3.slider()
		.min(0)
		.max(1)
		.value([0, 1])
		.on("slide", function(evt, value)
		{
			ll = value[0];
			rr = value[1];
			view2.update();
		});

		d3.select("#view2-slider")
		.call(slider);

		var mx = new Array(7);

		for(var k=0;k<7;k++)
		{
			mx[k] = 0;
			for(var i=0;i<365;i++)
				for(var j=0;j<24;j++)
					mx[k]=Math.max(mx[k], d3.max(data[i][j][k]));
		}

		var scale = new Array(7);
		for(var i=0;i<7;i++)
			scale[i] = d3.scale.linear().domain([0, mx[i]]).range([0, hei*0.9]);

		for(var i=0;i<7;i++)
		{
			var sca = d3.scale.linear().domain([0, mx[i]]).range([hei*0.9, 0]);
			var axis = d3.svg.axis()
						.scale(sca)
						.ticks(4)
						.orient("left");
			svg.append("g")
			.attr("id", "view2-svg-axis-"+i)
			.attr("class", "axis")
			.attr("transform", function()
			{
				var x = $("#view2-svg").width() * 0.1, y = (i+0.1)*hei;
				return "translate("+x+","+y+")";
			})
			.call(axis);
		}

		this.scale = scale;
		var t=new Array(7);
		for(var i=0;i<7;i++)
			t[i]=i;
		svg.append("g")
		.selectAll("text")
		.data(t)
		.enter()
		.append("text")
		.attr("y", function(d, i)
		{
			return (i+1)*hei - hei/4;
		})
		.text(function(d, i)
		{
			return pollution[i];
		});

		for(var k=0;k<7;k++)
		{
			var wid = $("#view2-svg").width() * 0.9;
			var da = new Array(35);
			for(var i=0;i<35;i++)
			{
				da[i]=new Array();
				var hours = (endyear - startyear + 1) * 24;
				var starthour = parseInt(hours * ll);
				var endhour = parseInt(hours * rr);
				var now = 0;
				for(var j=startyear;j<=endyear;j++)
				{
					for(var l=0;l<24;l++)
					{
						if(now >= starthour && now <= endhour)
							da[i].push(data[j][l][k][i]);
						now++;
					}
					if(now > endhour)
						break;
				}
			}
			var xscale = d3.scale.linear().domain([0, da[0].length]).range([0, wid]);
			svg.append("g")
			.attr("class", "view2-svg-line")
			.attr("id", "view2-svg-line-"+k)
			.selectAll("path")
			.data(da)
			.enter()
			.append("path")
			.attr("id", function(d, i)
			{
				return "view2-svg-line-"+k+"-"+i;
			})
			.attr("class", function(d, i)
			{
				return "view2-svg-"+i;
			})
			.attr("d", function(d, i)
			{
				var x, y;
				var s="";
				x = $("#view2-svg").width() * 0.1;
				y = (k+1)*hei;
				for(var j=0;j<d.length;j++)
				{
					var xx = x + xscale(j);
					var yy = y - scale[k](d[j]);
					if(j==0)
						s += "M"+xx+" "+yy+" ";
					else
						s += "L"+xx+" "+yy+" ";
				}
				return s;
			})
			.attr("fill-opacity", 0)
			.attr("stroke", "black")
			.attr("stroke-width", 1.5)
			.attr("stroke-opacity", 0);
		}
	},
	reset:function()
	{
		d3.select("#view2-slider").selectAll("a").remove();
		d3.select("#view2-slider").selectAll("div").remove();
		var slider = d3.slider()
		.min(0)
		.max(1)
		.value([0, 1])
		.on("slide", function(evt, value)
		{
			ll = value[0];
			rr = value[1];
			view2.update();
		});
		d3.select("#view2-slider")
		.call(slider);
		ll=0,rr=1;
		this.update();
	},
	updateSelected:function()
	{
		for(var i=0;i<35;i++)
			if(selected[i])
				d3.selectAll(".view2-svg-"+i).attr("stroke-opacity", 1);
			else
				d3.selectAll(".view2-svg-"+i).attr("stroke-opacity", 0);
	},
	update:function()
	{
		var svg = d3.select("#view2-svg").select("svg");
		var hei = $("#view2-svg").height() / 7;
		var scale = this.scale;
		svg.selectAll(".view2-svg-line").remove();
		for(var k=0;k<7;k++)
		{
			var wid = $("#view2-svg").width() * 0.9;
			var da = new Array(35);
			for(var i=0;i<35;i++)
			{
				da[i]=new Array();
				var hours = (endyear - startyear + 1) * 24;
				var starthour = parseInt(hours * ll);
				var endhour = parseInt(hours * rr);
				print(starthour);
				print(endhour);
				var now = 0;
				for(var j=startyear;j<=endyear;j++)
				{
					print("***");
					print(j);
					for(var l=0;l<24;l++)
					{
						if(now >= starthour && now <= endhour)
							da[i].push(data[j][l][k][i]);
						now++;
					}
					if(now > endhour)
						break;
				}
			}
			print(da);
			var xscale = d3.scale.linear().domain([0, da[0].length]).range([0, wid]);
			svg.append("g")
			.attr("class", "view2-svg-line")
			.attr("id", "view2-svg-line-"+k)
			.selectAll("path")
			.data(da)
			.enter()
			.append("path")
			.attr("id", function(d, i)
			{
				return "view2-svg-line-"+k+"-"+i;
			})
			.attr("class", function(d, i)
			{
				return "view2-svg-"+i;
			})
			.attr("d", function(d, i)
			{
				var x, y;
				var s="";
				x = $("#view2-svg").width() * 0.1;
				y = (k+1)*hei;
				for(var j=0;j<d.length;j++)
				{
					var xx = x + xscale(j);
					var yy = y - scale[k](d[j]);
					if(j==0)
						s += "M"+xx+" "+yy+" ";
					else
						s += "L"+xx+" "+yy+" ";
				}
				return s;
			})
			.attr("fill-opacity", 0)
			.attr("stroke", "black")
			.attr("stroke-width", 1.5)
			.attr("stroke-opacity", function(d, i)
			{
				if(selected[i])
					return 1;
				return 0;
			});
		}
	}
};