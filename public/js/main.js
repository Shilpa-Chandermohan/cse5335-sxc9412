/*jslint browser:true, plusplus: true */
/*global $, jQuery, main, console*/
//namespace for home screen
var app = angular.module('cseWeb', []);

app.controller("webDataManagement",function($scope,$http){
	$scope.scrollToSectionTwo = function(){
		$scope.tableContent = [];
		$('body').animate({
			'scrollLeft' : $(".countriesList").position().left
		},function(){
			var count = 0;
			var myVar  = setInterval(function () {
				
				$http.post("/article/featured", {"pageNumber" : count }).success(function(res) {
					(count >= 20 ? $('#list tr:first').remove() : "");
					var list = document.getElementById('list');
					var newLI = document.createElement('tr');
					newLI.innerHTML = "<td>" + count + "</td>" + "<td>" + res[0].title.replace("%20"," ") + "</td>" + "<td>" + res[0].displayLink.replace("%20"," ") + "</td>";
					list.appendChild(newLI);
					var x = setTimeout(function() {
						newLI.className = newLI.className + "show";
						var y = setTimeout(function() {
							newLI.className = "";
						}, 1000);
					}, 500);
					count++;
					
					if(count >= 100){
						clearInterval(myVar)
					}
				});
			},500);
			
		});		
	}
});