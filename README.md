twitter_renderer
================

twitter_renderer

ziel ist ein htmlwidget von twitter mit ersetzten urls.
das widget wird vom twitter script erzeugt

die urls werden auf einen reverse proxy geleitet.
das problem ist diesen proxy gegen missbrauch abzusichern
alternativ könnten die elemente gelande und durch eigene urls ersetzt werden
links werden mit "sie verlassen jetzt ... versehen" leave.to?url=http://www.web.de

Twitter
<blockquote class="twitter-tweet" lang="de"><p>Såre scener fra et liv med bror med Downs -<a href="http://t.co/DycIyYZOxD">http://t.co/DycIyYZOxD</a> <a href="https://twitter.com/hashtag/sorteringssamfunnet?src=hash">#sorteringssamfunnet</a> <a href="https://twitter.com/hashtag/debatten?src=hash">#debatten</a> <a href="https://twitter.com/hashtag/nrkdebatt?src=hash">#nrkdebatt</a> <a href="https://twitter.com/hashtag/downs?src=hash">#downs</a> <a href="http://t.co/s7RvfVQicu">pic.twitter.com/s7RvfVQicu</a></p>&mdash; Geir Olav Drablos (@godrablos) <a href="https://twitter.com/godrablos/status/510143515758964736">11. September 2014</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

Facebook
<div id="fb-root"></div> <script>(function(d, s, id) { var js, fjs = d.getElementsByTagName(s)[0]; if (d.getElementById(id)) return; js = d.createElement(s); js.id = id; js.src = "//connect.facebook.net/de_DE/all.js#xfbml=1"; fjs.parentNode.insertBefore(js, fjs); }(document, 'script', 'facebook-jssdk'));</script>
<div class="fb-post" data-href="https://www.facebook.com/HofButenland/posts/728570373847553" data-width="466"><div class="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/HofButenland/posts/728570373847553">Beitrag</a> von <a href="https://www.facebook.com/HofButenland">Hof Butenland</a>.</div></div>


Google Plus
<!-- Place this tag in your head or just before your close body tag. -->
<script type="text/javascript" src="https://apis.google.com/js/plusone.js"></script>
<!-- Place this tag where you want the widget to render. -->
<div class="g-post" data-href="https://plus.google.com/102860501900098846931/posts/BTZNZjjjTZC"></div>
<!-- <div class="g-post" data-href="https://plus.google.com/102860501900098846931/posts/Qnfx7ECzooW"></div> -->

MR
<div class="mr-space" data-space-id="zdf/brazilstream" style="min-height: 500px;"></div>
<script src="//platform.massrelevance.com/js/massrel.js"></script>
<script>
  massrel.ui.load();
</script>






TODO Prio2
----------
ein globaler versonierter "arbeitsscript"
dieser holt anhand der id im parentElement (später vlt url parameter)
das passende js+preview image aus der DB

//preview sollte mit verschiedenen hintergrundfarben gerendert werden können (besonders wichtig für MR)




embeddcode
----------

<div class="zdfembed" id="b06e606cdd950bf13aefb9eef57c2694dd3b659c">
  <noscript>
    <a href="https://twitter.com/godrablos/status/510143515758964736" >
      <img src="http://localhost:5984/twr/d09d5064702d9e5c92baf28b50ab1ebfcf8a0f5e/preview">
    </a>
  </noscript>

  <script src="http://localhost:5984/twr/b06e606cdd950bf13aefb9eef57c2694dd3b659c/script.js"></script>
  html einfügen
  script einfügen
</div>


script2.js
---------
<script>
(function(){

  var script = "";
  var scriptlinks = [];
  scriptlinks.push("http://localhost:5984/twr/b06e606cdd950bf13aefb9eef57c2694dd3b659c/script.js");


  var htmlDiv = document.createElement('div');
  htmlDiv.innerHTML = '<blockquote class="twitter-tweet" lang="de"><p>Såre scener fra et liv med bror med Downs -<a href="http://t.co/DycIyYZOxD">http://t.co/DycIyYZOxD</a> <a href="https://twitter.com/hashtag/sorteringssamfunnet?src=hash">#sorteringssamfunnet</a> <a href="https://twitter.com/hashtag/debatten?src=hash">#debatten</a> <a href="https://twitter.com/hashtag/nrkdebatt?src=hash">#nrkdebatt</a> <a href="https://twitter.com/hashtag/downs?src=hash">#downs</a> <a href="http://t.co/s7RvfVQicu">pic.twitter.com/s7RvfVQicu</a></p>&mdash; Geir Olav Drablos (@godrablos) <a href="https://twitter.com/godrablos/status/510143515758964736">11. September 2014</a></blockquote>';
  document.getElementById('b06e606cdd950bf13aefb9eef57c2694dd3b659c').appendChild(htmlDiv);


  for(var i1=0; i1 < scriptlinks.length; i1++)
  {
    var s=document.createElement('script');
    s.setAttribute("src",scriptlinks[i1]);
    document.getElementsByTagName('head')[0].appendChild(s);
  }
  eval(script);

})();

</script>


