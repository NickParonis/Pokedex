$(document).ready( () => {
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

    let pokemons = []
    let fetchPokemon = () => {
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
    $(document.body).on("click", ".test", function(){
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
                let pokemonCardFrontHtmlDiv = `<div class="pokemon-card-front ${el.type[0]}"><h1>${el.name}</h1><img src="${el.image}" alt="Avatar"></div>`
                let pokemonCardBackHtmlDiv =  `<div class="pokemon-card-back"><img src="images/pokemoncardBack.png" style="width: 101%;"></div>`
                let pokemonCardInnerHtmlDiv = `<div class="pokemon-card-inner">` + pokemonCardFrontHtmlDiv + pokemonCardBackHtmlDiv + `</div>`
                let pokemonCardHtmlDiv =  `<div class="pokemon-card">` + pokemonCardInnerHtmlDiv + `</div>`
                $(".pokemonArea").append(pokemonCardHtmlDiv)
            });
        }
        if(radioValue1 && typeRadio){
            pokemons
            .filter( pokemon => pokemon.id < 152)
            .filter( pokemon => pokemon.type[0] == pickedPokeType)
            .forEach( el => {
                let pokemonCardFrontHtmlDiv = `<div class="pokemon-card-front ${el.type[0]}"><h1>${el.name}</h1><img src="${el.image}" alt="Avatar"></div>`
                let pokemonCardBackHtmlDiv =  `<div class="pokemon-card-back"><img src="images/pokemoncardBack.png" style="width: 101%;"></div>`
                let pokemonCardInnerHtmlDiv = `<div class="pokemon-card-inner">` + pokemonCardFrontHtmlDiv + pokemonCardBackHtmlDiv + `</div>`
                let pokemonCardHtmlDiv =  `<div class="pokemon-card">` + pokemonCardInnerHtmlDiv + `</div>`
                $(".pokemonArea").append(pokemonCardHtmlDiv)
            });
        }
        if(radioValue2 && !typeRadio){
            pokemons.forEach( el => {
                let pokemonCardFrontHtmlDiv = `<div class="pokemon-card-front ${el.type[0]}"><h1>${el.name}</h1><img src="${el.image}" alt="Avatar"></div>`
                let pokemonCardBackHtmlDiv =  `<div class="pokemon-card-back"><img src="images/pokemoncardBack.png" style="width: 101%;"></div>`
                let pokemonCardInnerHtmlDiv = `<div class="pokemon-card-inner">` + pokemonCardFrontHtmlDiv + pokemonCardBackHtmlDiv + `</div>`
                let pokemonCardHtmlDiv =  `<div class="pokemon-card">` + pokemonCardInnerHtmlDiv + `</div>`
                $(".pokemonArea").append(pokemonCardHtmlDiv)
            });
        }
        else{
            pokemons
            .filter( pokemon => pokemon.type[0] == pickedPokeType)
            .forEach( el => {
                let pokemonCardFrontHtmlDiv = `<div class="pokemon-card-front ${el.type[0]}"><h1>${el.name}</h1><img src="${el.image}" alt="Avatar"></div>`
                let pokemonCardBackHtmlDiv =  `<div class="pokemon-card-back"><img src="images/pokemoncardBack.png" style="width: 101%;"></div>`
                let pokemonCardInnerHtmlDiv = `<div class="pokemon-card-inner">` + pokemonCardFrontHtmlDiv + pokemonCardBackHtmlDiv + `</div>`
                let pokemonCardHtmlDiv =  `<div class="pokemon-card">` + pokemonCardInnerHtmlDiv + `</div>`
                $(".pokemonArea").append(pokemonCardHtmlDiv)
            });
        }
    })
    $(document).on('click', '#flexSwitchCheckDefault', function(){
        $('.selectizeDiv').toggleClass('hide')
    })
});