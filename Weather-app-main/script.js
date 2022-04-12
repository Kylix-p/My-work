// to add city to list
addCity = (data, cities) => {
    let flag = 0;
    const { main, name, sys, weather } = data;
    for (let i = 0; i < cities.length; i++) {
        console.log(cities[i]);
        if (name == cities[i].name && sys.country == cities[i].country) {
            flag = 1;
        }
    }
    if (flag == 0) {
        let item = {
            "name": name,
            "country": sys.country,
            "temp": Math.round(main.temp) - 273,
            "data": data,
            "weather": weather[0]["description"]
        }
        cities.push(item);

        const icon = `https://openweathermap.org/img/wn/${weather[0]["icon"]
            }@2x.png`;

        let markup = `
        <li>
        <h6>${name} , ${sys.country}</h6>
        <h6><b>${Math.round(main.temp) - 273} °C</b></h6>
        <div>
            <figure>
                <img src=${icon} alt=${weather[0]["main"]}>
            </figure>
        </div>
        <h6>${weather[0]["description"]}</h6>
        </li>
        `;
        $(".city").prepend(markup);
    }

}


// to show weather of 1 city
showWeather = (data) => {

    const { main, name, sys, weather } = data;
    const icon = `https://openweathermap.org/img/wn/${weather[0]["icon"]
        }@2x.png`;

    let markup = `
        <h3>${name} , ${sys.country}</h3>
        <h2><b>${Math.round(main.temp) - 273} °C</b></h2>
        <div>
            <figure>
                <img src=${icon} alt=${weather[0]["main"]}>
            </figure>
        </div>
        <h4>${weather[0]["description"]}</h4>
        `;

    $(".main").html(markup);
}



$(document).ready(() => {

    $("form").on("submit", function (e) {
        e.preventDefault();
    })

    let msg = $(".msg");
    let cities = [];

    $("button").click(() => {

        let city = $("#city");
        const url1 = 'http://api.openweathermap.org/data/2.5/weather?q=';
        const url2 = '&appid=74d4129e564023aa5ec0fb46c611a5a9#';
        let url = url1 + city.val() + url2;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                addCity(data, cities);
                if (cities.length != 0) {
                    $(".current").addClass("main");
                    $(".list").css("visibility", "visible");
                }
                showWeather(data);

                msg.text("");
            })
            .catch(() => {
                msg.text("Data not Available 😩");
            });
    });

})