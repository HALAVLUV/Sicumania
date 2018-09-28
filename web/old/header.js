var decodedCookie = decodeURIComponent(document.cookie);
decodedCookie = decodedCookie.split(';')[0];
if ("isLoggedIn=true" in decodedCookie)
{
    document.write("<h4>" + decodedCookie[decodedCookie.indexOf("firstname")].split('=')[1] + "<h4>");
    document.write("<h4>2500★<h4>")
}
else
{
    document.write("<p>התחבר</p>");
    document.write("<p>הירשם</p>");
}