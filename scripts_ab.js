function open_article(str){
			window.location.href = 'https://gaffelmagasin.github.io/artikel' + '?=' + str;
		}
		function content_of_tag(str,tag,start){
			let start_index = str.indexOf("<" + tag + ">",start);
			let end_index =   str.indexOf("</" + tag + ">",start);
			
			if(start_index == -1 || end_index == -1){return -1;}
			let content = str.substring(start_index + tag.length + 2,end_index);
			return content;
		}

		function draw_article_button(div_id, article_name,small){
			
			fetch('artiklar/' + article_name + '/info.txt')
			.then(function(resp){return resp.text()})
			.then(function(resp){

				var a_str = resp;
				
				var titel = content_of_tag(a_str,"titel",0).toUpperCase();
				var ingress = content_of_tag(a_str,"ingress",0);
				var skribent = content_of_tag(a_str,"skribent",0);
				var datum = content_of_tag(a_str,"datum",0);
				var bild = content_of_tag(a_str,"bild",0);

				var portrait = content_of_tag(a_str,"porträtt",0)
				
				var data = skribent;
				
				var text_style_title = `font-size: clamp(10px,4vw,40px)`
				var text_style_preamble = `font-size: clamp(5px,2vw,20px);`
				var text_style_writer = `clamp(5px,2vw,20px)`
				var imgw = 53;
				var roww = 33;
				if(small == true){
					imgw = 100;
					if(portrait != "-1"){roww = 70;}else{roww = 100;}
					text_style_title = `font-size: clamp(20px,8vw,80px)`
					text_style_preamble = `font-size: clamp(10px,5vw,35px);`
   					text_style_writer = `clamp(10px,4vw,40px)`
				}
				var new_html = ``

				//bild
				new_html += `<div style = "width:100%; height: auto; display: table; margin-bottom: 10px; position: relative;">
					<div style = "background: #FFFEF7FF;"><img src = ${bild} id = ${'bild' + div_id} 
     						style = "width: ${imgw}%; float: right; background: #00000000;">
	   				</img></div>`

				//porträtt
				if(portrait != "-1"){
					if(!small){	new_html += `<img src = porträtt/${portrait}.png style = "width: 15%; height 15%; position: absolute; left: 32%; bottom: 0px; z-index: 2;"> </img>`}
					else{		new_html += `<img src = porträtt/${portrait}.png style = "width: 35%; height 35%; position: absolute; right: 0%; bottom: 0px; z-index: 2;"> </img>`}
				}
				
				//text
				new_html +=`<div style = "width: ${roww}%; margin: 3%; float: left;">
     						<div id = ${'titel' + div_id} 	style = "color: #FFFEF7FF; width: 95%; padding-top: 2%; font-family: morfeta; font-size: clamp(10px,4vw,38px); line-height: 83%;${text_style_title}"> ${titel}	</div>
			        		<div id = ${'ingress' + div_id} 	style = "color: #FFFEF7FF; width: 95%;	${text_style_preamble}"> ${ingress}	</div>`
      				if(!small){new_html +=	`<div style = "font-family: helvetica_bold;font-weight: 400; font-size: ${text_style_writer};line-height: ${text_style_writer};padding: 2%;margin-top: 5%; margin-bottom: 2%; color: black;background: #FFFEF7FF; width: 80%;">${data}</div>`}
	   			
       				new_html+=	`</div>
			        </div>`

				 document.getElementById(div_id).innerHTML = new_html;
			
				var element = document.getElementById(div_id); //grab the element
				
				element.style.background = "#000000FF";
				element.onmouseover = function(){
					var element2 = document.getElementById(div_id);
					element2.style.background = "#00000000";

				}
			    	element.onmouseout = function(){
					var element2 = document.getElementById(div_id);
					element2.style.background = "#000000FF";


				}
			    	element.onclick = function(){
					open_article(article_name)
				}
			});
			
			
		}
