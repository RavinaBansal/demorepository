$(document).ready(function(){
	$(".main").hide();
});

$ (function ()
	{
		$("#searchMovie").click(searchMovie);
		var table=$("resultsTable");
		function searchMovie()
			{
				var title=$("#movieTitle").val();
				title=$.trim(title);
				if(title.length==0)
				{
					alert("Enter movie");
				}
				else{
						$.ajax({
						url:"http://www.omdbapi.com/?s="+title,
						success: getMovies,
					});
				}	
			}

		function getMovies(movies)
		{ 
			$('#pageList').children().remove();
			if(movies.Error==="Movie not found!")
			{
				alert("not found!!");
				$(".main").hide();
			}
			else{

				$(".main").show();
				var tableN=$('#tableBody').empty();
				var count=0;
				for(var m in movies.Search)
				{
					var posterUrl=movies.Search[m].Poster;
					if(posterUrl=="N/A")
					{
						posterUrl="../img/noImage.jpg";
					}
					var title=movies.Search[m].Title;
					var year=movies.Search[m].Year;
					var type=movies.Search[m].Type;

					tableN.append('<tr class="post"><td><img src ='+posterUrl+' alt="Image not Available" class="img-responsive" ></td><td>'+title+'</td><td>'+year+'</td><td>'+type+'</td></tr>')
					count++;
				}

				  var itemsPerPage=2;       //start pageList
				  var pageListLength=Math.ceil(count/itemsPerPage);
				  $('.post').filter(":gt("+(itemsPerPage-1)+")").hide();
				  for(var i=0;i<pageListLength;i++){
				    $("#pageList").append("<li><a>"+ (i+1)  +"</a></li>");
				  }

				    $("#pageList li").on('click',function(){
				    $('.post').hide();
				    var linkNumber=$(this).text();
				    var contentToShow=$('.post').filter(':lt('+linkNumber*itemsPerPage+')');
				    var contentToHide=$('.post').filter(':lt('+(linkNumber-1)*itemsPerPage+')')
				   // $.merge(contentToHide,$('.post').filter(":gt("+(((linkNumber)*itemsPerPage)-1)+")"));

				    contentToShow.show();
				    contentToHide.hide();

				  });

			}


		}
	});