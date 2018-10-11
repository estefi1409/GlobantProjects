let randomUser = fetch ('https://randomuser.me/api/?results=10');

let setUser = randomUser.then(function(resultado){
    return resultado.json();
}).then(here =>{
    const authors = here.results;

    authors.forEach((authors) => {
        const miSectionOrigen = document.querySelector('#origen');
        const miSectionFavoritos = document.querySelector('#favoritos'); 
        const articleOrigen = document.createElement('article');
        const articleFavoritos = document.createElement('article');
        const figCapt = document.createElement('figcaption');
        const figure = document.createElement('figure');
        const img = document.createElement('img');
        
        figCapt.innerHTML = authors.name.first + ' ' + authors.name.last;
        img.src = authors.picture.large;
        
        miSectionOrigen.append(articleOrigen);
        articleOrigen.append(figure);
        figure.append(figCapt);
        figure.append(img);
       
        articleOrigen.addEventListener('click', function(){
            miSectionFavoritos.append(articleFavoritos);
            articleFavoritos.append(figure);
        });

        articleFavoritos.addEventListener('click', function(){
            miSectionOrigen.append(articleOrigen);
            articleOrigen.append(figure);
        });

    });
    
});


