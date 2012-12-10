var url = "process_tweets.py";
var uname = "";
var tweet_list = new Array();

$(document).ready(function(){
	$('#uname').focus();
	$("#about_app").hide();	
	$('#hide_about_app').hide();
	$("#head1").hide();
	$("#head2").hide();
	$("#head3").hide();
	$("#head4").hide();
	$("#head5").hide();
	$("#head6").hide();
	$("#head7").hide();
	$("#close_matching_tweets").hide();
	$("#matching_tweets").hide();
	$('#hashtag_matching_tweets').hide();
	$('#close_hashtag_matching_tweets').hide();
	$('#word_matching_tweets').hide();
	$('#close_word_matching_tweets').hide();
	

});

function toggle_info()
{
	$('#info').show("normal");
	$('#about_app').hide();
	$('#hide_about_app').show();
}

function toggle_hide_info()
{
	$('#info').hide("normal");
	$('#about_app').show();
	$('#hide_about_app').hide();
}


var parse_tweets = function(input_string)
{
	var matched_tweet_string = "";
	var index_count = '1';
	for(var i=0;i<tweet_list.length;i++)
	{
		if(tweet_list[i].search(input_string) >= 0)
		{
			matched_tweet_string += "<strong>("+index_count+")</strong> "+ tweet_list[i]+"<br /><br />";
			index_count++;
		}
	}
	$('#matching_tweets').html(matched_tweet_string);
	$('#matching_tweets').show();
	$('#close_matching_tweets').show();
};

function close_matching_tweets()
{
	$('#matching_tweets').html("");
	$('#matching_tweets').hide();
	$('#close_matching_tweets').hide();
}

var show_hashtag_matching_tweets = function(input_string)
{
	var matched_tweet_string = "";
	var index_count = '1';
	for(var i=0;i<tweet_list.length;i++)
	{
		if(tweet_list[i].search(input_string) >= 0)
		{
			matched_tweet_string += "<strong>("+index_count+")</strong> "+ tweet_list[i]+"<br /><br />";
			index_count++;
		}
	}
	$('#hashtag_matching_tweets').html(matched_tweet_string);
	$('#hashtag_matching_tweets').show();
	$('#close_hashtag_matching_tweets').show();
};

function close_hashtag_matching_tweets()
{
	$('#hashtag_matching_tweets').html("");
	$('#hashtag_matching_tweets').hide();
	$('#close_hashtag_matching_tweets').hide();
}


function init_app()
{
	
	uname = $("#uname").val();
	if (uname == "")
	{
		alert("Please enter a twitter username");
	}
	else
	{
		
		$("#visual1").html("");
		$("#visual2").html("");
		$("#visual3").html("");
		$("#visual4").html("");
		$("#visual5").html("");	
		$("#visual6").html("");	
		$("#visual8").html("");	
		$("#visual8").html("");
		
		$("#visual1").width(0).height(0);
		$("#visual2").width(0).height(0);
		$("#visual3").width(0).height(0);
		$("#visual4").width(0).height(0);
		$("#visual5").width(0).height(0);
		$("#visual6").width(0).height(0);
		$("#visual7").width(0).height(0);
		$("#visual8").width(0).height(0);
		
		$("#info").hide("normal");
		$("#about_app").show();
		$('#hide_about_app').hide();
		$("#visual1").hide();
		$("#visual2").hide();
		$("#visual3").hide();
		$("#visual4").hide();
		$("#visual5").hide();
		$("#visual6").hide();
		$("#visual7").hide();
		$("#visual8").hide();
		$("#head1").hide();
		$("#head2").hide();
		$("#head3").hide();
		$("#head4").hide();
		$("#head5").hide();
		$("#head6").hide();
		$("#head7").hide();
		$('#matching_tweets').hide();
		$('#close_matching_tweets').hide();
		$('#hashtag_matching_tweets').hide();
		$('#close_hashtag_matching_tweets').hide();

		
		$("#testme").show();
		$("#testme").html("Retrieving the tweets from Twitter..");
		params = {};
		params['call_id'] = '1';
		params['uname'] = uname; 
		$.get(
		       url,
			   params,
		       function(data)
			   		 {  
					 	
					 	if (data == "success")
						{
							 get_tweet_list();
						}
						else
						{
							$("#testme").html("Something went wrong. Please try again.");	 
						}
					 },
			   "text"
		);
	}
}


function get_tweet_list()
{
	
	params = {};
	params['call_id'] = 9;
	params['uname'] = uname;
		$.get(
		   url,
		   params,
		   function(data)
				 {  
				 	if (data)
					{
						tweet_list = JSON.parse(data);
						visualize_mentioned_users();
						
					}
					else
					{
							$("#testme").html("Something went wrong. Please try again.");	 
											
					}
				 },
		   "text"
	);
}


function visualize_mentioned_users()
{
	$("#visual1").html("");
	$("#testme").html("Visualizing most frequently mentioned users....");
	params = {};
	params['call_id'] = 2;
	params['uname'] = uname;
		$.get(
		   url,
		   params,
		   function(data)
				 {  
				 	if (data)
					{
						$("#head1").show();
						$("#visual1").show();
						
						$("#visual1").width(900).height(300);
						$("#visual1").css('border','solid 2px #CCC');
						word_list = new Array();
						var obj1 = JSON.parse(data);
						
						$.each(obj1[0], function(key,val){
							var temp_hash = {};
							temp_hash['text'] = key;
							temp_hash['weight'] = val;
							var handler_hash = {};
//							handler_hash['click'] = "parse_tweets('"+key+"');";
							handler_hash['click'] = function() { parse_tweets(key); };
							//alert(handler_hash);
							temp_hash['handlers'] = handler_hash;
							//alert(temp_hash['handlers']['click']);
							word_list.push(temp_hash);
						});
				
						$("#visual1").jQCloud(word_list);

						//call next ajax section
						visualize_tweets_by_date()
					}
					else
					{
							$("#testme").html("Something went wrong. Please try again.");	 
											
					}
				 },
		   "text"
	);
}



function visualize_tweets_by_date()
{
	$("#visual2").html("");
	$("#testme").html("Visualizing tweets by date ....");
	params = {};
	params['call_id'] = 3;
	params['uname'] = uname;
		$.get(
		   url,
		   params,
		   function(data)
				 {  
				 	if (data)
					{
							$("#head2").show();
							$("#visual2").show();
							$("#visual2").width(900).height(200);
							$("#visual2").css('border','solid 2px #CCC');
							var obj1 = JSON.parse(data);
				
							var s1 = new Array();
							var ticks = new Array();
						
							for(var i=1;i<=31;i++)
							{
								if(obj1[0][i] == undefined)
								{
									s1.push('0');
								}
								else
								{
									s1.push(obj1[0][i]);
								}
								ticks.push(i);
						   }
							
							//var s1 = [200, 600, 100, 1000,200, 600, 100, 1000,200, 600, 100, 1000];
							$.jqplot.config.enablePlugins = true;
														  
							//var ticks = [1,2,3,4,5,6,7,8,9,10,11,12];
							var plot1 = $.jqplot('visual2', [s1], {
								animate: !$.jqplot.use_excanvas,
								seriesDefaults:{
									renderer:$.jqplot.BarRenderer,
									rendererOptions: {fillToZero: true,varyBarColor: true},
									pointLabels: { show: true }
								},
								series:[
									{label:'Number of Tweets'}
								],
								/*legend: {
									show: 0,
									placement: 'outsideGrid'
								},*/
								axes: {
									xaxis: {
										renderer: $.jqplot.CategoryAxisRenderer,
										ticks: ticks
									},
									yaxis: {
										pad: 1,
										tickOptions: {formatString: '%d'}
									}
								}
							});	
							visualize_tweets_by_month();
					}
					else
					{
							$("#testme").html("Something went wrong. Please try again.");	 
											
					}
				 },
		   "text"
	);
}




function visualize_tweets_by_month()
{
	$("#visual3").html("");
	$("#testme").html("Visualizing tweets by month ....");
	params = {};
	params['call_id'] = 4;
	params['uname'] = uname;
		$.get(
		   url,
		   params,
		   function(data)
				 {  
				 	if (data)
					{
							$("#head3").show();
							$("#visual3").show();
							$("#visual3").width(900).height(200);
							$("#visual3").css('border','solid 2px #CCC');
							var obj1 = JSON.parse(data);
				
							var s1 = new Array();
							var ticks = new Array();
						
							for(var i=1;i<=12;i++)
							{
								if(obj1[0][i] == undefined)
								{
									s1.push('0');
								}
								else
								{
									s1.push(obj1[0][i]);
								}
								ticks.push(i);
						   }
							

							$.jqplot.config.enablePlugins = true;
														  
							var ticks = ['Jan','Feb','Mar','Apr','May','June','July','Aug','Sep','Oct','Nov','Dec'];
							var plot1 = $.jqplot('visual3', [s1], {
								animate: !$.jqplot.use_excanvas,
								seriesDefaults:{
									renderer:$.jqplot.BarRenderer,
									rendererOptions: {fillToZero: true,varyBarColor: true},
									pointLabels: { show: true }
								},
								series:[
									{label:'Number of Tweets'}
								],
								/*legend: {
									show: 0,
									placement: 'outsideGrid'
								},*/
								axes: {
									xaxis: {
										renderer: $.jqplot.CategoryAxisRenderer,
										ticks: ticks
									},
									yaxis: {
										pad: 1,
										tickOptions: {formatString: '%d'}
									}
								}
							});	
							visualize_tweets_by_weekdays();
					}
					else
					{
							$("#testme").html("Something went wrong. Please try again.");	 
											
					}
				 },
		   "text"
	);
}





function visualize_tweets_by_weekdays()
{
	$("#visual4").html("");
	$("#testme").html("Visualizing tweets by weekdays ....");
	params = {};
	params['call_id'] = 5;
	params['uname'] = uname;
		$.get(
		   url,
		   params,
		   function(data)
				 {  
				 	if (data)
					{
							$("#head4").show();
							$("#visual4").show();
							$("#visual4").width(900).height(200);
							$("#visual4").css('border','solid 2px #CCC');
							var obj1 = JSON.parse(data);
				
							var s1 = new Array();
							var ticks = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
						

							for (var tick_day = 0; tick_day < ticks.length; tick_day++) 
							{
								
								if(obj1[0][ticks[tick_day]] == undefined)
								{
									s1.push(0);
								}
								else
								{
									s1.push(obj1[0][ticks[tick_day]])
								}
								
							}
														
							$.jqplot.config.enablePlugins = true;
														  
							
							var plot1 = $.jqplot('visual4', [s1], {
								animate: !$.jqplot.use_excanvas,
								seriesDefaults:{
									renderer:$.jqplot.BarRenderer,
									rendererOptions: {fillToZero: true,varyBarColor: true},
									pointLabels: { show: true }
								},
								series:[
									{label:'Number of Tweets'}
								],
								/*legend: {
									show: 0,
									placement: 'outsideGrid'
								},*/
								axes: {
									xaxis: {
										renderer: $.jqplot.CategoryAxisRenderer,
										ticks: ticks
									},
									yaxis: {
										pad: 1.05,
										tickOptions: {formatString: '%d'}
									}
								}
							});	
							visualize_tweets_by_hours();
					}
					else
					{
							$("#testme").html("Something went wrong. Please try again.");	 
											
					}
				 },
		   "text"
	);
}




function visualize_tweets_by_hours()
{
	
	$("#visual5").html("");
	$("#visual6").html("");
	$("#testme").html("Visualizing tweets by hours ....");
	params = {};
	params['call_id'] = 6;
	params['uname'] = uname;
		$.get(
		   url,
		   params,
		   function(data)
				 {  
				 	if (data)
					{
							$("#head5").show();
							$("#visual5").show();
							$("#visual6").show();
							$("#visual5").width(440).height(440);
							$("#visual6").width(440).height(440);
							$("#visual5").css('border','solid 2px #CCC');
							$("#visual6").css('border','solid 2px #CCC');
							gabe = {
										  seriesStyles: {
											  //seriesColors: ['black','white','black','white','black','white','black','white','black','white','black','white',],
											  seriesColors: ['#000','#666','#000','#666','#000','#666','#000','#666','#000','#666','#000','#666',],
											  highlightColors: ['lightblue','lightblue','lightblue','lightblue','lightblue','lightblue','lightblue','lightblue','lightblue','lightblue','lightblue','lightblue'],
											  fontSize: '26pt',
										  },
										  legend: {
											  fontSize: '8pt'
										  },
										  title: {
											  fontFamily: 'Arial, Helvetica, sans-serif',
											  fontSize: '14pt',
											  textColor: '#C00'
										  },
										  grid: {
											  backgroundColor: '#FFF'
										  },
										  datelabels: {
											  fontSize:'26pt'
										  }
										  
									  };
							
							var obj1 = JSON.parse(data);
							
							var s1 = new Array();
							var s2 = new Array();
							for(var i=0;i<=23;i++)
							{
								var temp_array = new Array();
								if(obj1[0][i] == undefined)
								{
									temp_array = ['0',1];
								}
								else
								{
									temp_array = [obj1[0][i],1];
								}
								if(i<12)
								{
									s1.push(temp_array);
								}
								else
								{
									s2.push(temp_array);
								}
							}
							
							         
							var hour_chart1 = $.jqplot('visual5', [s1], {
							  title:"MidNight(12:00 AM) to Noon(12:00 PM)",
							  animate: !$.jqplot.use_excanvas,
							  seriesDefaults: {
								  fontSize:'22pt',
								  renderer:$.jqplot.DonutRenderer,
								  rendererOptions:{
								  diameter: 340,
								  innerDiameter:220,
								  sliceMargin: 3,
								  startAngle: -90,
								  showDataLabels: true,
								  dataLabels: 'label'
								  
								}
							  }
							});
							    
						    hour_chart1.themeEngine.newTheme('gabe', gabe);
							hour_chart1.activateTheme('gabe');
							
							
							var hour_chart2 = $.jqplot('visual6', [s2], {
							  title:"Noon(12:00 PM) to MidNight(12:00 AM)",
							  animate: !$.jqplot.use_excanvas,
							  seriesDefaults: {
								  fontSize:'22pt',
								  renderer:$.jqplot.DonutRenderer,
								  rendererOptions:{
								  diameter: 340,
								  innerDiameter:220,
								  sliceMargin: 3,
								  startAngle: -90,
								  showDataLabels: true,
								  dataLabels: 'label'
								  
								}
							  }
							});
							    
						    hour_chart2.themeEngine.newTheme('gabe', gabe);
							hour_chart2.activateTheme('gabe');
							visualize_hashtags();
					}
					else
					{
							$("#testme").html("Something went wrong. Please try again.");	 
											
					}
				 },
		   "text"
	);
}



function visualize_hashtags()
{
	$("#visual7").html("");
	$("#testme").html("Visualizing most frequently used hashtags....");
	params = {};
	params['call_id'] = 7;
	params['uname'] = uname;
		$.get(
		   url,
		   params,
		   function(data)
				 {  
				 	if (data)
					{
						$("#head6").show();
						$("#visual7").show();
						$("#visual7").width(900).height(200);
						$("#visual7").css('border','solid 2px #CCC');
						word_list = new Array();
						var obj1 = JSON.parse(data);
						
						$.each(obj1[0], function(key,val){
							var temp_hash = {};
							temp_hash['text'] = key;
							temp_hash['weight'] = val;
							var handler_hash = {};
							handler_hash['click'] = function() { show_hashtag_matching_tweets(key); };
							temp_hash['handlers'] = handler_hash;
							word_list.push(temp_hash);
						});
				
						$("#visual7").jQCloud(word_list);

						visualize_most_frequent_words2();
					}
					else
					{
							$("#testme").html("Something went wrong. Please try again.");	 
											
					}
				 },
		   "text"
	);
}


function visualize_most_frequent_words2()
{
	$("#visual8").html("");
	$("#testme").html("Visualizing most frequently used words....");
	params = {};
	params['call_id'] = 8;
	params['uname'] = uname;
		$.get(
		   url,
		   params,
		   function(data)
				 {  
				 	if (data)
					{
						$("#head7").show();
						$("#visual8").show();
						$("#visual8").width(900).height(250);
						$("#visual8").css('border','solid 2px #CCC');
						var word_list = new Array();
						var obj1 = JSON.parse(data);
						var word_array_length = obj1[0].length;
						
						if(word_array_length > 100)
						{
							word_array_length = 100;
						}
						
						for(var i=0;i<word_array_length;i++)
						{
							temp_hash = {};
							temp_hash['weight'] = obj1[0][i][0];	
						
							temp_hash['text'] = obj1[0][i][1];
							word_list.push(temp_hash);
						}
						
				
						$("#visual8").jQCloud(word_list);
						//$("#testme").html("Visualization Complete.");
						$("#testme").hide();
					}
					else
					{
							$("#testme").html("Something went wrong. Please try again.");	 
											
					}
				 },
		   "text"
	);
}
