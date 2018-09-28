$("#submitter").click(function(){
    console.log("2");
    $.ajax({
    url: document.currentScript.src,
    data: { email: $("#email").val(),
                    password: $("#password").val(),
                    firstname: $("#firstname").val(),
                    lastname: $("#lastname").val(),
                    classs: $("#class").val() },
    success: function(result){
        console.log("1");
        var d = new Date();
    d.setTime(d.getTime() + (7*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
        document.cookie= "userid="+result +";" + expires + ";path=sicumPage.html";
        window.location = "sicumPage.html";
    },
    error: function(){
        alert("mooo");
        console.log("1");
    },
    });
});