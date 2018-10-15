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
       const authorName = authors.name.first + ' ' + authors.name.last;
       const authorEmail = authors.email;
       var hue = Math.floor(Math.random() * 360);
       var pastel = 'hsl(' + hue + ', 100%, 70%)';

       figCapt.innerHTML += authorName + "</br>" + authorEmail;
       figure.style.backgroundColor = pastel;
       img.src = authors.picture.large;
       
       miSectionOrigen.append(articleOrigen);
       articleOrigen.append(figure);        
       figure.append(img);
       figure.append(figCapt);
      
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