var decodedCookie = decodeURIComponent(document.cookie);
decodedCookie = decodedCookie.split(';');[0]
if (decodedCookie == "isLoggedIn=true")
{
    document.write(decodedCookie[1].split('=')[1])
}
document.write("<p>התחבר</p>");
document.write("<p>הירשם</p>");