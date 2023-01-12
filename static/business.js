/*************************************************
hw6 bussiness.js
*************************************************/
function clickLink(link){
    var id = link.getAttribute('data-id');
    url = `https://yuqichenpython.nn.r.appspot.com/searchId?id=${id}`;
    const req = new XMLHttpRequest();
    req.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            const details = JSON.parse(this.responseText);
            var name = details.name;
            var status = details.hours[0].is_open_now;
            var category = "";
            for(let idx in details.categories){
                category += details.categories[idx].title;
                if(idx != details.categories.length-1) category += " | ";
            }
            var address = "";
            for(let item of details.location.display_address){
                address += item + ' ';
            }
            var phone = details.display_phone;
            var transaction = "";
            for(let idx in details.transactions){
                transaction += details.transactions[idx];
                if(idx != details.transactions.length-1) transaction += " | ";
            }
            var price = details.price;
            var infoLink = details.url;
            const card3Div = document.querySelector("div.card3");
            // refresh
            while(card3Div.firstChild) card3Div.removeChild(card3Div.firstChild);

            var hr1 = document.createElement('hr');
            var hr2 = document.createElement('hr');
            card3Div.append(hr1, hr2);

            var card3Header = document.createElement('h3');
            card3Header.innerText = name;
            card3Header.style.textAlign = "center";
            card3Header.style.margin = "20px";

            var greyLine = document.createElement('hr');
            greyLine.className = "greyLine";
            card3Div.append(card3Header, greyLine);

            var hr1 = document.createElement('hr');
            var hr2 = document.createElement('hr');
            card3Div.append(hr1, hr2);

            // Create table
            var card3Table = document.createElement('table');
            card3Table.className = "card3Table";
            // Row1
            var card3TableRow1 = document.createElement('tr');
            //Row1Col1
            var td_r1c1 = document.createElement('td');
            td_r1c1.style.width = "50%";
            var Row1Col1 = document.createElement("h3");
            Row1Col1.style.marginBottom = "5px";
            Row1Col1.innerText = "Status";
            var Row1Col1_ = document.createElement('button');
            Row1Col1_.className = "information";
            if(status == true){
                Row1Col1_.textContent = "Open Now";
                Row1Col1_.style = "background-color:green;border:none;color:black;padding:6px 14px;border-radius:15px";
            }else{
                Row1Col1_.textContent = "Closed";
                Row1Col1_.style = "background-color:red;border:none;color:black;padding:6px 14px;border-radius:15px";
            }
            td_r1c1.append(Row1Col1, Row1Col1_);
            //Row1Col2
            var td_r1c2 = document.createElement('td');
            var Row1Col2 = document.createElement('h3');
            Row1Col2.innerText = "Category";
            var Row1Col2_ = document.createElement('p');
            Row1Col2_.className = "information";
            Row1Col2_.innerText = category;
            td_r1c2.append(Row1Col2, Row1Col2_);

            card3TableRow1.append(td_r1c1, td_r1c2);

            // Row2
            var card3TableRow2 = document.createElement('tr');
            //Row2Col1
            var td_r2c1 = document.createElement('td');
            var Row2Col1 = document.createElement("h3");
            Row2Col1.innerText = "Address";
            var Row2Col1_ = document.createElement('p');
            Row2Col1_.className = "information";
            Row2Col1_.innerText = address;
        
            td_r2c1.append(Row2Col1, Row2Col1_);
            //Row2Col2
            var td_r2c2 = document.createElement('td');
            var Row2Col2 = document.createElement('h3');
            Row2Col2.innerText = "Phone Number";
            var Row2Col2_ = document.createElement('p');
            Row2Col2_.className = "information";
            Row2Col2_.innerText = phone;
            td_r2c2.append(Row2Col2, Row2Col2_);

            card3TableRow2.append(td_r2c1, td_r2c2);

            // Row3
            var card3TableRow3 = document.createElement('tr');
            //Row3Col1
            var td_r3c1 = document.createElement('td');
            var Row3Col1 = document.createElement("h3");
            Row3Col1.innerText = "Transactions Supported";
            var Row3Col1_ = document.createElement('p');
            Row3Col1_.className = "information";
            Row3Col1_.innerText = transaction;
        
            td_r3c1.append(Row3Col1, Row3Col1_);
            //Row3Col2
            var td_r3c2 = document.createElement('td');
            var Row3Col2 = document.createElement('h3');
            Row3Col2.innerText = "Price";
            var Row3Col2_ = document.createElement('p');
            Row3Col2_.className = "information";
            Row3Col2_.innerText = price;
            td_r3c2.append(Row3Col2, Row3Col2_);
            card3TableRow3.append(td_r3c1, td_r3c2);
            // Row4
            var card3TableRow4 = document.createElement('tr');
            //Row4Col1
            var td_r4c1 = document.createElement('td');
            var Row4Col1 = document.createElement("h3");
            Row4Col1.innerText = "More info";
            Row4Col1.style.marginBottom = "-1px";
            var Row4Col1_ = document.createElement('a');
            Row4Col1_.className = "information";
            Row4Col1_.href = infoLink;
            Row4Col1_.target = "_blank"
            Row4Col1_.textContent = "Yelp";
            var hr1 = document.createElement('hr');
            var hr2 = document.createElement('hr');
            var hr3 = document.createElement('hr');
            td_r4c1.append(Row4Col1, Row4Col1_, hr1, hr2, hr3);
            card3TableRow4.append(td_r4c1);

            //photos
            var card3Table2 = document.createElement('table');
            card3Table2.className = "card3Table2";
            var card3TableRow5 = document.createElement('tr');
            card3TableRow5.className = "row5";
            var count = details.photos.length;
            for(var i = 0; i < 3; i++){
                var row5 = document.createElement('td');
                row5.className = "photos";
                row5.style = "width:33%;vertical-align:top;text-align:center";
                if(i+1 <= count){
                    var img = document.createElement('img');
                    img.src = details.photos[i];
                    img.style = "width:100%; objectFit:contain;";
                    row5.append(img);
                }
                var caption = document.createElement('p');
                caption.innerText = `Photo ${i+1}`;
                caption.className = 'photoCaption';
                row5.append(caption);
                card3TableRow5.append(row5);
            }

            // append rows
            card3Table.append(card3TableRow1, card3TableRow2, card3TableRow3, card3TableRow4);
            card3Table2.append(card3TableRow5);
            // append table
            card3Div.append(card3Table, card3Table2);
        }
    }    
    req.open('GET', url);
    req.send();
}
var count_sortByName = 0; 
var count_sortByRating = 0; 
var count_sortByDist = 0; 
function sortTable(sortBy, businesses){
    if(sortBy == 0){
        count_sortByName++;
        if(count_sortByName % 2 == 0){
            businesses.sort((a, b) => {
                var fa = a.name.toLowerCase();
                var fb = b.name.toLowerCase();
                if(fa < fb) return 1;
                if(fa > fb) return -1;
                return 0;
            });
        }else{
            businesses.sort((a, b) => {
                var fa = a.name.toLowerCase();
                var fb = b.name.toLowerCase();
                if(fa < fb) return -1;
                if(fa > fb) return 1;
                return 0;
            });
        }
    }else if(sortBy == 1){
        count_sortByRating++;
        if(count_sortByRating % 2 == 0){
            businesses.sort((a, b) => {
                return b.rating - a.rating;
            });
        }else{
            businesses.sort((a, b) => {
                return a.rating - b.rating;
            });
        }    
    }else{
        count_sortByDist++;
        if(count_sortByDist % 2 == 0){
            businesses.sort((a, b) => {
                return b.distance - a.distance;
            });
        }else{
            businesses.sort((a, b) => {
                return a.distance - b.distance;
            });
        }    
    }
    createCard2Table(businesses);
}
function createCard2Table(businesses){
    const card2Div = document.querySelector('div.card2');
    while(card2Div.firstChild) card2Div.removeChild(card2Div.firstChild);
    var card2Table = document.createElement('table');
    card2Table.className = "card2Table";

    var card2TableHead = document.createElement('thead');
    card2TableHead.className = "card2TableHead"
    
    var card2TableHeaderRow = document.createElement('tr');
    card2TableHeaderRow.className = "card2TableHeaderRow";

    var headerNo = document.createElement('th');
    headerNo.innerText = "No.";
    headerNo.style = "height:30px;width:5%";
    card2TableHeaderRow.append(headerNo);

    var headerImg = document.createElement('th');
    headerImg.innerText = "Image";
    headerImg.style = "width:12%";
    card2TableHeaderRow.append(headerImg);

    var headerName = document.createElement('th');
    headerName.style = "width:56%";
    var linkName = document.createElement('a');
    var sortByName = 0;
    linkName.textContent = "Business Name";
    linkName.href = "#card2";
    linkName.style = "text-decoration:none;color:black";
    linkName.addEventListener('click', () => sortTable(sortByName, businesses));
    headerName.append(linkName);
    card2TableHeaderRow.append(headerName);

    var headerRating = document.createElement('th');
    headerRating.style = "width:13%";
    var linkRating = document.createElement('a');
    var sortByRating = 1;
    linkRating.textContent = "Rating";
    linkRating.href = "#card2";
    linkRating.style = "text-decoration:none;color:black";
    linkRating.setAttribute("data-id", "rating");
    linkRating.addEventListener('click', () => sortTable(sortByRating, businesses));
    headerRating.append(linkRating);
    card2TableHeaderRow.append(headerRating);

    var headerDist = document.createElement('th');
    headerDist.style = "width:14%";
    var linkDist = document.createElement('a');
    var sortBydist = 2;
    linkDist.textContent = "Distance(miles)";
    linkDist.href = "#card2";
    linkDist.style = "text-decoration:none;color:black";
    linkDist.setAttribute("data-id", "distance");
    linkDist.addEventListener('click', () => sortTable(sortBydist, businesses));
    headerDist.append(linkDist);
    card2TableHeaderRow.append(headerDist);
    card2TableHead.append(card2TableHeaderRow);
    card2Table.append(card2TableHead);

    var card2TableBody = document.createElement('tbody');
    card2TableBody.className = "card2TableBody";
    card2Table.append(card2TableBody);
    card2Div.append(card2Table);

    for(var i = 0; i < businesses.length; i++){
        var card2TableBodyRow = document.createElement('tr');
        card2TableBodyRow.className = "card2TableBodyRow";

        var tableNo = document.createElement('td');
        tableNo.innerText =  i+1;
        tableNo.style.height = "110px";

        var tableImage = document.createElement('td');
        tableImage.style.height = "110px"
        var img = document.createElement('img');
        img.src = businesses[i].image;
        tableImage.append(img);
        img.style.width = "100%";
        img.style.height = "100%";

        var tableName = document.createElement('td');
        var tableLink = document.createElement('a');
        tableLink.style = "text-decoration:none;color:black";
        tableLink.setAttribute("href", "#card3");
        tableLink.setAttribute("data-id", businesses[i].id);
        tableLink.setAttribute("onclick", "clickLink(this)");
        tableLink.textContent = businesses[i].name
        tableName.append(tableLink);

        var tableRating = document.createElement('td');
        tableRating.innerText = businesses[i].rating;

        var tableDistance = document.createElement('td');
        tableDistance.innerText = businesses[i].distance.toFixed(2);
        card2TableBodyRow.append(tableNo, tableImage, tableName, tableRating, tableDistance);
        card2TableBody.append(card2TableBodyRow);
    }
}

function getBusiness(url){
    const req = new XMLHttpRequest();
    req.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            const businesses = JSON.parse(this.responseText);
            const card2Div = document.querySelector('div.card2');
            const card3Div = document.querySelector('div.card3');
            while(card2Div.firstChild) card2Div.removeChild(card2Div.firstChild);
            while(card3Div.firstChild) card3Div.removeChild(card3Div.firstChild);    
            if(businesses.length === 0){
                var card2NoRecord = document.createElement('p');
                card2NoRecord.innerText = "No record has been found";
                card2NoRecord.style = "font-family:Arial;font-size:16px;text-align:center";
                card2Div.append(card2NoRecord);
            }else{
                createCard2Table(businesses);
            }    
        }    
    }
    req.open('GET', url, false);
    req.send();  
}
function autoButton(chkAutoDetect){
    var location = document.getElementById('Location');
    if(chkAutoDetect.checked){
        fetch('https://ipinfo.io/json?token=c5a96995ca9e33')
        .then(res => res.json())
        .then(data => document.myform.status.value = data.loc);
        location.value = "";
        location.disabled = true; 
        // location.removeAttribute("required");
    }else{
        document.myform.status.value = "";
        location.disabled = false;
        // location.setAttribute("required", "true");
    }
}
function submitButton(){
    var keyword = document.getElementById("Keyword").value;
    var distance = document.getElementById("Distance").value;
    var category = document.getElementById("Category").value;
    var location = document.getElementById("Location").value;
    var check = document.getElementById("autoDetect");
    var flag;

    if(keyword === '') return;
    if(!check.checked && location === "") return;

    if(document.myform.Location.value !== ''){
        const req = new XMLHttpRequest();
        req.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                var myLoc = JSON.parse(this.responseText);
                if(myLoc.results.length === 0 ){
                    flag = true;
                    const card2Div = document.querySelector('div.card2');
                    const card3Div = document.querySelector('div.card3');
                    while(card2Div.firstChild) card2Div.removeChild(card2Div.firstChild);
                    while(card3Div.firstChild) card3Div.removeChild(card3Div.firstChild); 
                    var card2NoRecord = document.createElement('p');
                    card2NoRecord.innerText = "No record has been found";
                    card2NoRecord.style = "font-family:Arial;font-size:16px;text-align:center";
                    card2Div.append(card2NoRecord);
                    return;
                }
                document.myform.status.value = myLoc.results[0].geometry.location.lat + ',' + myLoc.results[0].geometry.location.lng;
                
            }
        }
        req.open('GET', `https://maps.googleapis.com/maps/api/geocode/json?address=${document.myform.Location.value}&key=AIzaSyBAalrdlxI7aNUhX4LMR9hAKZjsC2YBTQY`, false);
        req.send();
    }
    if(flag) return false;
    var status = document.getElementById('status').value;
    url = `https://yuqichenpython.nn.r.appspot.com/search?Keyword=${keyword}&Distance=${distance}&Category=${category}&status=${status}`;
    getBusiness(url);
    return false;
}
function clearButton(){
    const card2Div = document.querySelector('div.card2');
    const card3Div = document.querySelector('div.card3');
    while(card2Div.firstChild) card2Div.removeChild(card2Div.firstChild);
    while(card3Div.firstChild) card3Div.removeChild(card3Div.firstChild); 
    var location = document.getElementById('Location');
    location.disabled = false;
    document.getElementById('myform').reset();
}

