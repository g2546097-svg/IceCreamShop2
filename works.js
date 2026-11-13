fetch("works.csv")
    .then(function(response){
        return response.text();
    })
    .then(function(data){

        //CSVを行ごとに分割
        /*var rows = data.trim().split("\n");

        //1行目は見出し
        var headers = rows[0].split(",");*/

        var rows = data.trim().split(/\r?\n/);

        var headers = rows[0].split(",").map(function(header){
            return header.trim();
        });


        var works=rows.slice(1).map(function(row){
            /*var values=row.split(",");*/
            var values=row.split(",").map(function(value){
                return value.trim();
            });
            var work={};
            headers.forEach(function(header, index){
                work[header]=values[index];
            });
            return work;
        });

        var grid=document.getElementById("works-grid");
        /*var categorySelect=document.getElementById("category");
        var sortSelect=document.getElementById("sort");

        var categories=[];

        works.forEach(function(work){
            if(!categories.includes(work.category)){
                categories.push(work.category);
            }
        });

        categories.forEach(function(category){
            var option=document.createElement("option");
            option.value=category;
            option.textContent=category;
            categorySelect.appendChild(option);
        });*/

        /*function displayWorks(){
            var selectedCategory=categorySelect.value;
            var sortType= sortSelect.value;
            var filteredWorks=works.slice();

            if(selectedCategory !=="all"){
                filteredWorks=filteredWorks.filter(function(work){
                    return work.category === selectedCategory;
                });
            }

            if(sortType==="new"){
                filteredWorks.sort(function(a,b){
                    return Number(b.year)-Number(a.year);
                });
            }
            else if (sortType==="old"){
                filteredWorks.sort(function(a,b){
                    return Number(a.year)-Number(b.year);
                });
            }
            else if (sortType==="title"){
                filteredWorks.sort(function(a,b){
                    return a.title.localCompare(b.title,"ja");
                });
            }
            filteredWorks.forEach(function(work){
                var card=document.createElement("article");
                card.className="work-card";
                card.innerHTML=
                    '<a href="'+work.link+'">'+
                    '<img src="'+work.image+'" alt"'+work.title+'">'+
                    '<div class="work-info">'+
                        '<p class="work-category">'+work.category+'</p>'+
                        '<h4>'+work.title+'</h4>'+
                        '<p>'+work.description+'</p>'+
                        '<p class="work-year">'+work.year+'</p>'+
                    '</div>'+
                '</a>';
                grid.appendChild(card);
            });
        }*/
        function displayWorks(){

            works.forEach(function(work){
                var card=document.createElement("article");
                card.className="work-card";

                 card.innerHTML=
                    '<a href="'+work.link+'">'+
                    '<img src="'+work.image+'" alt="'+work.title+'">'+
                    '<div class="work-info">'+
                        '<p class="work-category">'+work.category+'</p>'+
                        '<h4>'+work.title+'</h4>'+
                        /*'<p>'+work.description+'</p>'+
                        '<p class="work-year">'+work.year+'</p>'+*/
                    '</div>'+
                    '</a>';

            grid.appendChild(card);
            });
        }
        
        grid.innerHTML="";


        displayWorks();
        /*categorySelect.addEventListener("change",function(){
            displayWorks();
        });
        sortSelect.addEventListener("change",function(){
            displayWorks();
        });*/

    })

var latitude=35.6895;
var longitude=139.6917;

var weatherUrl=
    "https://api.open-meteo.com/v1/forecast"+
    "?latitude="+latitude+
    "&longitude="+longitude+
    "&current=temperature_2m,weather_code"+
    "&timezone=Asia%2FTokyo";

fetch(weatherUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        var weatherCode=data.current.weather_code;
        showWeather(weatherCode);
    })

function showWeather(code){
    var icon=document.getElementById("weather-icon");

    if (code===0){
        icon.textContent="☀";
        document.body.className="weather-sunny";

    } else if (code >=1 && code <=3){
        icon.textContent="☁";
        document.body.className="weather-cloudy";

    } else if (code >=51 && code <=67){
        icon.textContent="☂";
        document.body.className="weather-rainy";

    } else {
        icon.textContent="❆"
        document.body.className="weather-snowy"
    }
}