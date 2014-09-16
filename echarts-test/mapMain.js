//数据整理
$(function(){
    echarts.util.mapData.params.params.anhui_huainan_svg = {
	    getGeoJson:function(callback) {
	        $.ajax({
	            url:"anhui_huinan_svg.svg",
	            dataType:'xml',
	            success:function(xml) {
	                callback(xml)
	            }
	        });
	    }
    }
    
    var myChart = echarts.init(document.getElementById('myChart'));
        
    //------------------map
    var geoCoord4anhui = {
        anhui:{
		    '合肥市': [117.27695,31.877],
		    '黄山市': [118.320996,29.717203],
		    '滁州市': [118.316397,32.319429],
	        '淮南市' : [116.8,32.8]
        },
        huainan:{
            '八公山区':[50,60],
            '外围县': [90,65]
        }
    }
    var data4anhuiCity = [
        {name : '合肥市', value : 9000},
        {name : '黄山市', value : 4000},
        {name : '滁州市', value : 3000},
        {name : '淮南市', value : 7000}//---内挖掘的才定义此内容
    ];
    var mapSeries = [
            {
                name: 'xxxx数据',
                type: 'map',
                mapType:'',
                mapLocation: {
                    x : 'center',
                    y : 'top'
                },
                roam:true,
                selectedMode: 'single',
                itemStyle: {
                    normal: {
                        borderWidth:1,
                        borderColor:'white',
                        color: '#ccc',
                        label: {
                            show: true
                        }
                    },
                    emphasis: {                 // 也是选中样式
                        borderWidth:2,
                        borderColor:'#fff',
                        color: '#348909',
                        label: {
                            show: true,
                            textStyle: {
                                color: '#fff'
                            }
                        }
                    }
                },
                data:null,
                markPoint : {
                    itemStyle : {
                        normal:{
                            color:'skyblue'
                        }
                    },
                    data : null
                },
                geoCoord : null
            }
        ]
    var option = {
        backgroundColor:"#eee",
        color:[ 
     '#7b68ee', '#00fa9a', '#ffd700', 
    '#6b8e23', '#ff00ff', '#3cb371', '#b8860b', '#30e0e0' 
]
        ,title:{
            text:"",
            x:"center"
        }
        ,dataRange : {
            min:0,
            max:10000
            }
        ,tooltip : {
            trigger: 'item',
            formatter:"{b} {c}"
        }
    };
    var pOption = $.extend(option,{title:{text:"安徽省"}});
    pOption.series = mapSeries;
    pOption.series[0].mapType = "安徽";
    pOption.series[0].data = data4anhuiCity;
    pOption.series[0].markPoint.data = data4anhuiCity;
    pOption.series[0].geoCoord = geoCoord4anhui.anhui;
    myChart.setOption(pOption,true);
    
    var cityOption = $.extend(option,{title:{text:"xxx市"}});
    myChart.on(echarts.config.EVENT.CLICK,function(mapItem){
        if(mapItem.data=="-"){return;}
        
        if(mapItem.name=="淮南市"){
            mapSeries[0].mapType = "anhui_huainan_svg";
            var data = [
                            {name : '八公山区', value : 3000},
                            {name : '外围县', value : 4000}
                        ];
            mapSeries[0].data = data;
            mapSeries[0].markPoint.data = data;
            mapSeries[0].geoCoord = geoCoord4anhui.huainan;
            cityOption = $.extend(cityOption,{
                title:{
                    text:mapItem.name
                }
                ,dataRange : {max:4500,min:0}
                ,series : mapSeries
            });
            var childChart = echarts.init(document.getElementById('childChart'));
            childChart.setOption(cityOption,true);
            $("#div_city").text(mapItem.name);
        }
    });
    $("#div_p").click(function(){
        pOption = $.extend(option,{title:{text:"安徽省"}});
        pOption.series = mapSeries;
        pOption.series[0].mapType = "安徽";
	    pOption.series[0].data = data4anhuiCity;
	    pOption.series[0].markPoint.data = data4anhuiCity;
	    pOption.series[0].geoCoord = geoCoord4anhui.anhui;
        myChart.setOption(pOption,true);
        $("#div_city").text("");
    })
})