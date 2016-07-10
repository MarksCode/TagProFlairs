console.log("hello");
var numSheets = 3;

// Creates and adds flairs button to home page
var addHomeButton = function (){
   var button = document.createElement('li');
   $(button).html("<a style='color:#33cc33' href='#'>FLAIRS</a>").attr('id', 'FlairButton').bind('click', showMenu).insertAfter('#nav-maps');
   $("<style type='text/css'> .flairSelec{ border:2px solid #FFD700;} </style>").appendTo("head");
}

var showMenu = function(){
   var flairSheet;
   chrome.storage.local.get('sheet', function(data){
      $.isEmptyObject(data) ? flairSheet = 1 : flairSheet = data[0];
   });
   
   var menu = document.createElement('div');
   $(menu).css({
      'height':'310px',
      'width':'400px',
      'position':'absolute',
      'border-radius':'5%',
      'border':'3px solid black',
      'left':'50%',
      'transform':'translate(-50%, 0)',
      'top':'10em',
      'zIndex':'30',
      'background': 'linear-gradient(to bottom, #3D445A , #859398)'
   }).attr('id', 'FlairMenu');
   
   var prefButton = document.createElement('button');
   $(prefButton).text(String.fromCharCode(9881)).css({
      'position':'absolute',
      'border':'0',
      'width':'40px',
      'height':'40px',
      'background-color':'transparent',
      'bottom':'3px',
      'left':'40px',
      'font-size':'150%',
      'text-align':'center',
   }).bind('click', showPrefs).hover(
      function(){
         $(this).css('color','black');
      },
      function(){
         $(this).css('color','initial');
      });
   
   var exit = document.createElement('button');				// Hides menu button
   $(exit).html('X').click(hideMenu).css({
      'border':'solid 3px black',
      'float':'right',
      'border-radius':'100%',
      'background-color':'#c2c2d6'
   }).hover(function(){
      $(this).css({
         'background-color':'#33334d'
      })
   }, function(){
      $(this).css({
         'background-color':'#c2c2d6'
      })
   });
   var nextPage = document.createElement('button');
   $(nextPage).text('>').css({
      'position':'absolute',
      'bottom':'5px',
      'left':'180px',
      'background-color':'transparent',
      'color':'black',
   }).attr('id', 'next').bind('click', nextSheet);
   var lastPage = document.createElement('button');
   $(lastPage).text('<').css({
      'position':'absolute',
      'bottom':'5px',
      'right':'220px',
      'background-color':'transparent',
      'color':'black',
   }).attr('id', 'last').bind('click', prevSheet);
   var flairs = document.createElement('img');
   getCurSheet();
   //debugger;
   $(flairs).attr({
      'src':window.sheetURL,
      'id':'flairs'
   }).css({
      'width':'330px',
      'top':'15px',
      'left':'30px',
      'position':'absolute'
   }).bind('click', function(e){
      var offset = $(this).offset();
      flairPressed(e.pageX-offset.left, e.pageY-offset.top);
   });
   
   var flairTable = document.createElement('table');
   $(flairTable).attr('id', 'flairTable').html("<tr><td x='0' y='0'></td><td x='1' y='0'></td><td x='2' y='0'></td><td x='3' y='0'></td><td x='4' y='0'></td><td x='5' y='0'></td><td x='6' y='0'></td><td x='7' y='0'></td><td x='8' y='0'></td><td x='9' y='0'></td><td x='10' y='0'></td></tr><!-- --><tr><td x='0' y='1'></td><td x='1' y='1'></td><td x='2' y='1'></td><td x='3' y='1'></td><td x='4' y='1'></td><td x='5' y='1'></td><td x='6' y='1'></td><td x='7' y='1'></td><td x='8' y='1'></td><td x='9' y='1'></td><td x='10' y='1'></td></tr><!-- --><tr><td x='0' y='2'></td><td x='1' y='2'></td><td x='2' y='2'></td><td x='3' y='2'></td><td x='4' y='2'></td><td x='5' y='2'></td><td x='6' y='2'></td><td x='7' y='2'></td><td x='8' y='2'></td><td x='9' y='2'></td><td x='10' y='2'></td></tr><!-- --><tr><td x='0' y='3'></td><td x='1' y='3'></td><td x='2' y='3'></td><td x='3' y='3'></td><td x='4' y='3'></td><td x='5' y='3'></td><td x='6' y='3'></td><td x='7' y='3'></td><td x='8' y='3'></td><td x='9' y='3'></td><td x='10' y='3'></td></tr><!-- --><tr><td x='0' y='4'></td><td x='1' y='4'></td><td x='2' y='4'></td><td x='3' y='4'></td><td x='4' y='4'></td><td x='5' y='4'></td><td x='6' y='4'></td><td x='7' y='4'></td><td x='8' y='4'></td><td x='9' y='4'></td><td x='10' y='4'></td></tr><!-- --><tr><td x='0' y='5'></td><td x='1' y='5'></td><td x='2' y='5'></td><td x='3' y='5'></td><td x='4' y='5'></td><td x='5' y='5'></td><td x='6' y='5'></td><td x='7' y='5'></td><td x='8' y='5'></td><td x='9' y='5'></td><td x='10' y='5'></td></tr><!-- --><tr><td x='0' y='6'></td><td x='1' y='6'></td><td x='2' y='6'></td><td x='3' y='6'></td><td x='4' y='6'></td><td x='5' y='6'></td><td x='6' y='6'></td><td x='7' y='6'></td><td x='8' y='6'></td><td x='9' y='6'></td><td x='10' y='6'></td></tr><!-- --><tr><td x='0' y='7'></td><td x='1' y='7'></td><td x='2' y='7'></td><td x='3' y='7'></td><td x='4' y='7'></td><td x='5' y='7'></td><td x='6' y='7'></td><td x='7' y='7'></td><td x='8' y='7'></td><td x='9' y='7'></td><td x='10' y='7'></td></tr>").css({
      'border-collapse':'collapse',
      'width':'330px',
      'top':'15px',
      'left':'30px',
      'position':'absolute'
   });
   $(flairTable).find('td').css({
      'height':'30px',
      'width':'30px'
   }).bind('click', flairPressed);
   
   var noneButton = document.createElement('button');
   $(noneButton).css({
      'border':'solid 2px black',
      'border-radius':'5%',
      'background-color':'#c2c2d6',
      'position':'absolute',
      'right':'5px',
      'bottom':'3px'
   }).html('Select None').hover(function(){
      $(this).css({
         'background-color':'#33334d'
      })
   }, function(){
      $(this).css({
         'background-color':'#c2c2d6'
      })
   }).bind('click', unSelectFlair);
   
   $(menu).append(exit, flairs, flairTable, noneButton, prefButton, nextPage, lastPage);
   $('body').append(menu);
   
   var fx, fy;
   chrome.storage.local.get('flairX', function(data){
      $.isEmptyObject(data) ? fx = -1 : fx = data[0];
   });
   chrome.storage.local.get('flairY', function(data){
      $.isEmptyObject(data) ? fy = -1 : fy = data[0];
      });
   selected = $("td[x='" + fx +"']").filter("td[y='" + fy +"']");
   $(selected).addClass('flairSelec');
   if (flairSheet == 1){
      $('#last').prop('disabled', true);
   }
   if (flairSheet == numSheets){
      $('#next').prop('disabled', true);
   }
}

var getCurSheet = function(isGame = false){
   chrome.storage.local.get('sheet', function(data){
      $.isEmptyObject(data) ? sheetNum = 1 : sheetNum = data[0];
      switch (sheetNum) {
         case 1:
            window.sheetURL = 'http://i.imgur.com/QlTafAU.png';    
         case 2:
            window.sheetURL = 'http://i.imgur.com/jLGpcKz.png';
         case 3:
            window.sheetURL = 'http://i.imgur.com/2uAyumP.png';
         default:
            window.sheetURL = 'http://static.koalabeast.com/images/flair.png';
      }
   });
}

var hideMenu = function(){
   $('#FlairMenu').remove();
}

var nextSheet = function(){
   var sheet;
   chrome.storage.local.get('sheet', function(data){
      $.isEmptyObject(data) ? sheet = 1 : sheet = data[0];
      console.log(data);
   });
   sheet +=1;
   if (sheet == numSheets){
      $("#next").prop('disabled', true);
   }
   $("#last").prop('disabled', false);
   chrome.storage.local.set({'sheet': sheet}, function(){
   });
   $('#flairs').attr('src', getCurSheet());
}

var prevSheet = function(){
   var sheet;
   chrome.storage.local.get('sheet', function(data){
      $.isEmptyObject(data) ? sheet = 1 : sheet = data[0];
   });
   sheet -=1;
   if (sheet == 1){
      $("#last").prop('disabled', true);
   }
   $("#next").prop('disabled', false);
   chrome.storage.local.set({'sheet': sheet}, function(){
   });
   $('#flairs').attr('src', getCurSheet());
}

var flairPressed = function(){
   var x = $(this).attr('x');
   var y = $(this).attr('y');
   chrome.storage.local.set({'flairX': x}, function(){
   });
   chrome.storage.local.set({'flairY': y}, function(){
   });
   $(selected).removeClass('flairSelec');
   selected = this;
   $(this).addClass('flairSelec');
}

var unSelectFlair = function(){
   chrome.storage.local.set({'flairX': -1}, function(){
   });
   $(selected).removeClass('flairSelec');
};

var getRandomInt = function(min, max) {
   return Math.floor(Math.random() * (max - min + 1)) + min;
}

var showPrefs = function(){
   return;
}

// Add home page button
addHomeButton();
