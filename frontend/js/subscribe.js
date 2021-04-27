var apigClient = apigClientFactory.newClient();

$('#subtn').click(function(){
  let postform = {
    'email': $('#email').val(),
    'keyword': $('#keyword').val(),
    'popularity': $('#popularity').val(),
    'positive': $('#positive').val(),
    'negative': $('#negative').val(),
    'neutral': $('#neutral').val(),
    'mixed': $('#mixed').val(),
    'happy': $('#happy').val(),
    'angry': $('#angry').val(),
    'surprise': $('#surprise').val(),
    'sad': $('#sad').val(),
    'fear': $('#fear').val()
  };
  console.log(postform);
  apigClient.userPost({}, JSON.stringify(postform), {})
    .then(function(result){
      console.log("success")
      console.log(result);
    })
    .catch(function(result){
      console.log("unsuccess")
      console.log(result);
    })
  alert("Subscription success. You will receive email when your event occurred.")
});