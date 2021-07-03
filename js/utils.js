function GetDBSize()
{
	//index 0 is not used
	var dbsize = animals.length;
	return dbsize-1;
}

function BindMenuClickEvent()
{
	$( "#id_menu1,#id_menu2,#id_menu3" ).click(function(event) {
		var menu_id_table = ["#id_menu1","#id_menu2","#id_menu3"];
		var content_id_table = ["#id_introduce","#id_categrory","#contribution"];
		var target_id = event.target.id;
		var active_id_index = -1;

		for(var i=0; i<3; i++){
			var target_str = menu_id_table[i];
			$(target_str).removeClass("active");
			$(content_id_table[i]).hide();
			
			if(target_str.includes(target_id)){
				active_id_index = i;
			}
			
		}
		
		$(menu_id_table[active_id_index]).addClass("active");
		$(content_id_table[active_id_index]).show();
	});
}

function BindButtonClickEvent()
{
	$( "#id_clear" ).click(function() {
		var global_dbsize = GetDBSize();
		var max_entry = parseInt(global_dbsize/10)+1;
		
		for(i=1; i<=max_entry; i++){
			var suffix = (i-1)*10+1;
			var str_jid = "#id_option1_text_"+suffix;
			$(str_jid).prop('selectedIndex',-1);			
		}
	});
	
	$( "#id_generate" ).click(function() {
		var global_dbsize = GetDBSize();
		var max_entry = parseInt(global_dbsize/10)+1;
		
		var result_arr = [];
		
		for(i=1; i<=max_entry; i++){
			var suffix = (i-1)*10+1;
			var str_jid = "#id_option1_text_"+suffix;
			var data = $(str_jid).val();
			if(data){
				var data_length = $(str_jid).val().length;
				if(data_length != 0){
					data.forEach(element => result_arr.push(element));
				}
			}
		}
		var result_str = "";
		for (var j = 0; j < result_arr.length; j++) {
			result_str += result_arr[j] + " " + animals[result_arr[j]]+"<br>";
		}
		
		var w = window.open("", "需求清單", "width=600, height=400, scrollbars=yes");
		w.document.title = '圖鑑需求清單';
		var $w = $(w.document.body);
		$w.html(result_str);
	});
}

function generate_option_html(index_id, db_size)
{
	var start_index = (index_id-1)*10+1;
	var end_index = start_index+9;
	var str_option = "";
	var str_span = "<span> 圖鑑編號：" + start_index + " ~ " + end_index + "</span>";
	var str_select_start = "<select id='"+"id_option1_text_"+start_index+"' class='form-select' size='10' style='overflow:hidden' multiple>";
	var str_select_end = "</select>"
	var result = "";

	for(var j=start_index; j<=end_index; j++){
		if(j>db_size)
			break;
		else
			str_option += "<option value='" + j + "'>" + animals[j] +"</option>";
	}
	
	if(str_option == "")
		result = "";
	else
		result = str_span+str_select_start+str_option+str_select_end;
	
	return result;
}

function update_page_select()
{
	$("#id_main_option").empty();
	
	var global_dbsize = GetDBSize();
	var max_entry = parseInt(global_dbsize/10)+1;
	
	for(var i=1; i<=max_entry; i++){
		var content = "";
		content = generate_option_html(i, global_dbsize);
		
		if(content =="")
			break;
		else
			$("#id_main_option").append(content);
	}
}