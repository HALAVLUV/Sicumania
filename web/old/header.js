var decodedCookie = decodeURIComponent(document.cookie);
decodedCookie = decodedCookie.split(';')[0];
if ("isLoggedIn=true" in decodedCookie)
{
    document.write(decodedCookie[1].split('=')[1])
}
else
{
    document.write("<p>התחבר</p>");
    document.write("<p>הירשם</p>");
}