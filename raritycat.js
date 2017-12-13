<script>
const node = document.getElementById("kittyId");
node.addEventListener('keydown', function(event) {
    if (event.key === "Enter") {
      searchCat()
	node.value = ""
    }
});

var cats = []

function searchCat(kittyId) {
  showLoading()
  kittyId = document.getElementById("kittyId").value;
  setTimeout(()=>{getRarity(kittyId, hideLoading)}, 100)
}

function hideLoading() {
  document.getElementById("loader").style = "width: 100%; height: 100px; display: none;";
}

function showLoading() {
  document.getElementById("loader").style = "width: 100%; height: 100px; display: block;";
}

var threshold = 8

function getRarity(kittyId, callback) {
  var cat = kittytoolbox.getKittyCS(kittyId)
  cats[kittyId] = cat

  console.log(cat)

  var rarity = (kittytoolbox.calculateRarity(cat)*100*100000).toFixed(5)
  var priceData = kittytoolbox.getPrice(cat, threshold)

  c.log(cat.image_url, `#${kittyId} - ${cat.name} - GEN:${cat.generation} - Cooldown:${cat.status.cooldown_index}`,
                       `RARITY: ${rarity}% === ` + kittytoolbox.printCattributes(cat),
                       priceData[0], priceData[1], cat.id, kittytoolbox.colors[cat.color])

  callback()
}

/* console.log function from: http://www.kobashicomputing.com/send-your-console-output-to-the-result-pane-in-jsfiddle */
var c = function() {
    return({
        log: function(img, line1, line2, line3, searchLink, kittyId, color) {
          consoleDiv = document.getElementById('console')

          a = document.createElement('a')
          a.href = ('https://www.cryptokitties.co/kitty/'+kittyId)

          image = document.createElement('img')
          image.src = img
          image.width = 100
          image.height = 100

          div = document.createElement('div')
          div.classList.add('row')
          imgdiv = document.createElement('div')
          imgdiv.classList.add('inline')
          imgdiv.style.backgroundColor = color;
          console.log(color)
          textdiv = document.createElement('div')
          textdiv.classList.add('inline')
          pricediv = document.createElement('div')
          pricediv.classList.add('price')
          para1 = document.createElement('p')
          para2 = document.createElement('p')
          para3 = document.createElement('pre')
          text1 = document.createTextNode(line1)
          text2 = document.createTextNode(line2)
          text3 = document.createTextNode(line3)

          search = document.createElement('a')
          search.href = searchLink
          search.appendChild(document.createTextNode('See Searched Auctions'))


          a.appendChild(image)
          imgdiv.appendChild(a)
          para1.appendChild(text1)

          b = document.createElement('b')
          b.appendChild(text2)
          para2.appendChild(b)
          textdiv.appendChild(para1)
          textdiv.appendChild(para2)

          para3.appendChild(text3)
          pricediv.appendChild(para3)

          pricediv.appendChild(search)

          div.appendChild(imgdiv)
          div.appendChild(textdiv)
          div.appendChild(pricediv)

          consoleDiv.appendChild(div)
        },
        cls: function(msg) {
          consoleDiv = document.getElementById('console');
          consoleDiv.innerHTML='';
        }
    });
}();

</script>
