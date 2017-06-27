$(function(){
	$("form[name='addReview']").validate({
		rules: {
			name: "required",
			rating: "required",
			review: "required"
		},
		messages: {
			name: "Please enter the name",
			rating: "Please enter the rating",
			review: "Please enter the review"
		},
		submitHandler: function(form){
			form.submit();
		}
	});
});