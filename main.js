$(document).ready( () => {
    let pokemons = []
    const appendPokemon = (el) => {
        divImage = `<div class="image ${el.type[0]}"><img src="${el.image}" alt="Avatar"></div>`
        divPokeName = `<div class="pokename"><h6>${el.name}</h6></div>`
        divPokeContent = `<div class="pokecontent"><ul class="stats"><h5>1</h5><h5>2</h5></ul></div>`
        divPokeCardFront = `<div class="pokemon-card-front">` + divImage + divPokeName + divPokeContent + `</div>`
        divPokeCardBack =  `<div class="pokemon-card-back"><img src="images/pokemoncardBack.png" style="width: 101%;"></div>`
        divPokeCardInner = `<div class="pokemon-card-inner">` + divPokeCardFront + divPokeCardBack +`</div>`
        divPokeCard = `<div class="pokemon-card">` + divPokeCardInner + `</div>`
        $(".pokemonArea").append(divPokeCard)
    }
    const fetchPokemon = () => {
        for ( let i = 1; i <= 701; i++){
            let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
            fetch(url)
            .then( res => {
                return res.json();
            })
            .then( data => {
                let currentPokemon = {
                    name: data.name,
                    id: data.id,
                    image: data.sprites['front_default'],
                    type: data.types.map( type => {
                        return type.type.name
                    })
                };
                pokemons[data.id] = currentPokemon;
            });
        };
    };
    fetchPokemon();

    $(".select-types").selectize({
        options: [
            { id: 1, value: "grass", text: "Grass"},
            { id: 2, value: "normal", text: "Normal"},
            { id: 3, value: "fire", text: "Fire"},
            { id: 4, value: "water", text: "Water"},
            { id: 5, value: "flying", text: "Flying"},
            { id: 6, value: "fighting", text: "Fighting"},
            { id: 7, value: "poison", text: "Poison"},
            { id: 8, value: "electric", text: "Electric"},
            { id: 9, value: "ground", text: "Ground"},
            { id: 10, value: "rock", text: "Rock"},
            { id: 11, value: "psychic", text: "Psychic"},
            { id: 12, value: "ice", text: "Ice"},
            { id: 13, value: "bug", text: "Bug"},
            { id: 14, value: "ghost", text: "Ghost"},
            { id: 15, value: "steel", text: "Steel"},
            { id: 16, value: "dragon", text: "Dragon"},
            { id: 17, value: "dark ", text: "Dark "},
        ],
        // maxItems: 2,
        // sortField: "text",
        placeholder: "Select type"
    });
    $(document.body).on("click", ".showPokemon", function(){
        let radioValue1 = $("#flexRadioDefault1").is(":checked");
        let radioValue2 = $("#flexRadioDefault2").is(":checked");
        let typeRadio = $("#flexSwitchCheckDefault").is(":checked");
        let pickedPokeType
        if(typeRadio){
            pickedPokeType = $(".selectize-input").find(".item").html().toLowerCase()
        }
        $(".pokemonArea").empty();
        if(radioValue1 && !typeRadio){
            pokemons
            .filter( pokemon => pokemon.id < 152)
            .forEach( el => {
                appendPokemon(el);
            });
        }
        if(radioValue1 && typeRadio){
            pokemons
            .filter( pokemon => pokemon.id < 152)
            .filter( pokemon => pokemon.type[0] == pickedPokeType)
            .forEach( el => {
                appendPokemon(el);
            });
        }
        if(radioValue2 && !typeRadio){
            pokemons.forEach( el => {
                appendPokemon(el);
            });
        }
        else{
            pokemons
            .filter( pokemon => pokemon.type[0] == pickedPokeType)
            .forEach( el => {
                appendPokemon(el);
            });
        }
    })
    $(document.body).on('click', '#flexSwitchCheckDefault', function(){
        $('.selectizeDiv').toggleClass('hide')
    })
});

// divImage = `<div class="image ${el.type[0]}"><img src="${el.image}" alt="Avatar">`
// divPokeName = `<div class="pokename"><h6>${el.name}</h6></div>`
// divPokeContent = `<div class="pokecontent"><ul class="stats"><h5>1</h5><h5>2</h5></ul></div>`
// divPokeCardFront = `<div class="pokemon-card-front">` + divImage + divPokeName + divPokeContent + `</div>`
// divPokeCardInner = `<div class="pokemon-card-inner">` + divPokeCardFront + `</div>`
// divPokeCard = `<div class="pokemon-card">` + divPokeCardInner + `</div>`
// $(".pokemonArea").append(pokemonCardHtmlDiv)
/*  <div class="pokemon-card">
        <div class="pokemon-card-inner">
            <div class="pokemon-card-front">
                <div class="image grass">
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png" alt="Avatar">
                </div>
                <div class="pokename">
                    <h6>bulbasaur</h6>
                </div>
                <div class="pokecontent">
                    <ul class="stats">
                        <h5>1</h5>
                        <h5>2</h5>
                        <h5>3</h5>
                    </ul>
                </div>
            </div>
            <div class="pokemon-card-back">
                <img src="images/pokemoncardBack.png" style="width: 101%;">
            </div>
        </div>
    </div> */