async function buscarPokemons() {
    document.querySelector('.pokemon').setAttribute("disabled", "disabled")
    const requisicaoApi = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1015');
    const resposta = await requisicaoApi.json();
    const pokemons = resposta.results;

    console.log(pokemons);
    
    
    const detalhesPromises = pokemons.map(pokemon => fetch(pokemon.url).then(res => res.json()));

   
    const pokemonsDetalhes = await Promise.all(detalhesPromises);

    
    pokemonsDetalhes.forEach(resposta => {
        console.log(resposta);
        
       
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><img class="sprites" src="https://raw.githubusercontent.com/PokeAPI/sprites/refs/heads/master/sprites/pokemon/${resposta.id}.png"></td>
            <td><img class="spritesicon" src="https://raw.githubusercontent.com/partywhale/pokemon-type-icons/fcbe6978c61c359680bc07636c3f9bdc0f346b43/icons/${resposta.types[0].type.name}.svg"></td>
            <td>#${resposta.id.toString().padStart(4, "0")}</td>
            <td>${resposta.name}</td>
        `;

        
        document.querySelector('.tbody1').appendChild(tr);
    });
}

