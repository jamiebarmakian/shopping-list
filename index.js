$(function(){
  let state = {};

    $("ul li").each(function() {
        item = $(this).children("span").text();
        checked = $(this).children("span").hasClass("shopping-item__checked");
        state[item] = {displayName: item, checked: checked};
    });

  let addItem = function (state, item){
    state [item] = 
    { displayName: item,
      checked: false };
      console.log(state);
  }

  let renderList = function (state, element){
    let itemsHTML = "";
    for (let i=0; i < Object.keys(state).length; i++) {
		let currentItemName = Object.keys(state)[i];
		itemsHTML += '<li><span class="shopping-item' + 
		    (state[currentItemName].checked ? " shopping-item__checked" : "") +
		    '">' +
			currentItemName +
			'</span><div class="shopping-item-controls">' +
			'<button class="shopping-item-toggle">' +
			'<span class="button-label">check</span>' +
			'</button><button class="shopping-item-delete" value="' + currentItemName + '">' +
			'delete' +
			'</button></div>'
			'</li>';
		}
		element.html(itemsHTML);
	}
    
	$("#js-shopping-list-form").submit(function(event) {
        event.preventDefault();
		addItem(state, $("#shopping-list-entry").val());
		renderList(state, $(".shopping-list"));
	})

  $(".shopping-list").on("click", ".shopping-item-toggle", function (event){
      $(this)
        .closest("li")
        .children("span")
        .toggleClass("shopping-item__checked");

      let targetToToggleCheck = $(this).closest("li").children("span").text();
      state[targetToToggleCheck].checked = !state[targetToToggleCheck].checked;
  });
  
	$(".shopping-list").on("click",".shopping-item-delete", function(event) {

        $(this).closest("li").remove();
		let targetToDelete = $(this)
            .closest("li")
            .children("span")
            .text();
        delete state[targetToDelete];
	});	
});
