
let getId = x => document.getElementById(x)
let getClass = x => document.querySelector(x)

function request(isSend) {
    let name = getId('text').value
    let xhr = new XMLHttpRequest();// створили обєкт запитів
    return new Promise(function (resolve, reject) {
        xhr.open('GET', 'http://www.omdbapi.com/?s=' + name + '&apikey=7a70aeb4', true);// create request
        xhr.onreadystatechange = function () {//тут виловлюємо додаткові налаштування
            if (xhr.readyState == 4 && xhr.status == 200) {
                data = JSON.parse(xhr.responseText)
                let movie = Object.values(data.Search)
                console.log(movie)
                render(movie);
                resolve('good')
            }
            if (name==""){
                reject('try again')
            }
        }
        xhr.send()//send request;
        getId('text').value = ''
    })
}

let answer = function () {
    request()
        .then(data => console.log(data))
        .catch(err => console.error(err))
}

function render(movie) {
    for (let i = 0; i < movie.length; i++) {
        // console.log(movie[i])//виведено кожен фільм
        let block = document.createElement('div')
        let id = movie[i]['imdbID']
        // console.log(id);//виводиться айді кожного ФІЛЬМУ
        block.classList.add('smallBlock');
        block.insertAdjacentHTML('beforeend', `<img src=${movie[i]['Poster']} class="photo">`)
        block.insertAdjacentHTML('beforeend', `<p class="name">${movie[i]['Title']}</p>`)
        block.insertAdjacentHTML('beforeend', `<p class="name2">${movie[i]['Type']}</p>`)
        block.insertAdjacentHTML('beforeend', `<p class="name3">${movie[i]['Year']}</p>`)
        block.insertAdjacentHTML('beforeend', `<button class="btn btn-success more" value="${id}" data-toggle="modal" data-target=".bd-example-modal-lg" onclick="more()">More details</button>`)
        getId('bigBox').appendChild(block);
    }
}


function more() {
    let idMovie = event.target.value;
    let xhr2 = new XMLHttpRequest();
    let data2;
    getId("wrapp").innerHTML = ""
    let left = document.createElement('div');
    let right = document.createElement('div');
    xhr2.open('GET', `http://www.omdbapi.com/?i=${idMovie}&apikey=7a70aeb4`)
    xhr2.onreadystatechange = function () {//тут виловлюємо додаткові налаштування
        if (xhr2.readyState == 4 && xhr2.status == 200) {
            data2 = JSON.parse(xhr2.responseText)
            console.log(data2)
            left.classList.add('left');
            right.classList.add('right');
            getId('wrapp').appendChild(left);
            getId('wrapp').appendChild(right);

            left.insertAdjacentHTML('beforeend', `<img src=${data2['Poster']} class="photo2">`)
            right.insertAdjacentHTML('beforeend', `<p class="name4">${data2['Title']}</p>`)
            right.insertAdjacentHTML('beforeend', `<p class="text">${data2['Rated']} ${data2['Year']} ${data2['Genre']}</p>`)
            right.insertAdjacentHTML('beforeend', `<p class="text">${data2['Plot']}</p>`)

            right.insertAdjacentHTML('beforeend', `<p class="text"> <b>Writen by:</b> ${data2['Writer']}</p>`)
            right.insertAdjacentHTML('beforeend', `<p class="text"> <b>Directed by:</b> ${data2['Director']}</p>`)
            right.insertAdjacentHTML('beforeend', `<p class="text"> <b>Starring:</b> ${data2['Actors']}</p>`)
            right.insertAdjacentHTML('beforeend', `<p class="text"> <b>BoxOffice:</b> ${data2['BoxOffice']}</p>`)
            right.insertAdjacentHTML('beforeend', `<p class="text"> <b>Awards:</b> ${data2['Awards']}</p>`)
            right.insertAdjacentHTML('beforeend', `<p class="text"> <b>Rattings:</b> </p>`)
            for (let i = 0; i < data2['Ratings'].length; i++) {
                // console.log(data2['Ratings'][i]['Source'])
                right.insertAdjacentHTML('beforeend', `<p class="text">${data2['Ratings'][i]['Source']} ${data2['Ratings'][i]['Value']}</p>`)

            }
        }
    }
    xhr2.send()//send request

    left.remove()
}
