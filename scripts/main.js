var pos;
var selected;
var data;
var startyear = 0;
var endyear = 3;
var ll=0,rr=1;
var days = new Array();
days[1] = 31;
days[2] = 28;
days[3] = 31;
days[4] = 30;
days[5] = 31;
days[6] = 30;
days[7] = 31;
days[8] = 31;
days[9] = 30;
days[10] = 31;
days[11] = 30;
days[12] = 31;
var names = new Array("东四","天坛","官园","万寿西宫","奥体中心","农展馆","万柳","北部新区","植物园","丰台花园","云岗","古城","房山","大兴","亦庄","通州","顺义","昌平","门头沟","平谷","怀柔","密云","延庆","定陵","八达岭","密云水库","东高村","永乐店","榆垡","琉璃河","前门","永定门内","西直门北","南三环","东四环");
var pollution = new Array("PM2.5","PM10","AQI","SO2","NO2","O3","CO");
function color(i) {
    const colorArray = new Array("#EEE", "#DDD", "#CCC", "#BBB", "#AAA", "#999", "#888", "#777", "#666", "#555", "#444", "#333", "#EE0", "#DD0", "#CC0", "#BB0", "#AA0", "#990", "#880", "#770", "#660", "#550", "#440", "#330", "#E00", "#D00", "#C00", "#B00", "#A00", "#900", "#800", "#700", "#600", "#500", "#400", "#300");
    return colorArray[i];
}
function print(s)
{
	console.log(s);
}
function pad(num, n)
{
	num = num.toString();
	var len = num.length;
	while(len < n)
	{
		num = "0" + num;
		len++;
	}
	return num;
}
function initialize()
{
	d3.csv("data/places.csv", function(d)
	{
		pos = new Array(35);
		selected = new Array(35);
		for(var i=0;i<35;i++)
		{
			pos[i] = new Object();
			pos[i].x = parseFloat(d[i].x);
			pos[i].y = parseFloat(d[i].y);

			selected[i] = false;
		}
	});
	data = new Array(365);
	for(var t=0;t<365;t++)
	{
		data[t]=new Array(24);
		for(var i=0;i<24;i++)
		{
			data[t][i]=new Array(7);
			for(var j=0;j<7;j++)
			{
				data[t][i][j]=new Array(35);
				for(var k=0;k<35;k++)
					data[t][i][j][k]=0;
			}
		}
	}
	var month=1, day=1;
	for(var t=0;t<365;t++)
	{
		var s="2017"+pad(month, 2)+pad(day, 2);
		d3.csv("data/beijing/beijing_all_"+s+".csv", function(d)
		{
			var month = parseInt(d[0].date.substr(4, 2));
			var day = parseInt(d[0].date.substr(6, 2));
			var t=day-1;
			for(var i=1;i<month;i++)
				t+=days[i];
			print(t);
			for(var i=0;i<d.length;i++)
				if(pollution.indexOf(d[i].type) > -1)
					for(var j=0;j<35;j++)
					{
						if(d[i][names[j]]!="")
							data[t][parseInt(d[i].hour)][pollution.indexOf(d[i].type)][j] = parseInt(d[i][names[j]]);
					}
		});
		d3.csv("data/beijing/beijing_extra_"+s+".csv", function(d)
		{
			var month = parseInt(d[0].date.substr(4, 2));
			var day = parseInt(d[0].date.substr(6, 2));
			var t=day-1;
			for(var i=1;i<month;i++)
				t+=days[i];
			print(t);
			for(var i=0;i<d.length;i++)
				if(pollution.indexOf(d[i].type) > -1)
					for(var j=0;j<35;j++)
					{
						if(d[i][names[j]]!="")
							data[t][parseInt(d[i].hour)][pollution.indexOf(d[i].type)][j] = parseInt(d[i][names[j]]);
					}
		});
		day++;
		if(day > days[month])
		{
			month++;
			day=1;
		}
	}
	setTimeout(function()
	{
		print(pos);
		print(data);
		print(names);
		print(pollution);
		view1.initialize();
		view2.initialize();
		view3.initialize();
	}, 2500);
}
initialize();