var person = {
    name: "Stephany",
    lastName: "Palacios",
    gender: "Female"
}

//Propiedades nuevas a un objeto
person.myNewProperty = "new property";
persona.gender = "F";

//Función constructora
function Person (name, lastName, gender){
    this.name = name;
    this.lastName = lastName;
    this.gender = gender
    //Return This
}

//Para ejecutar la función
Person("Stephany", "Palacios", "F");

//New para decirle al motor de javascript que la función es constructora
var person = new Person("Luisa", "Vaca", "Female")

console.log(person, '1');

//Metodos
Person.prototype.introduce = function(){
    console.log(`Hi I´m ${this.name} ${this.lastName}`);
}

//Ejecutar los metodos
person.introduce();
console.log("Introduce");

//Heredando en un nuevo nivel!
function Developer(name, lastName, gender, yearsOfExperience){
    Person.call(this, name, lastName, gender);
    this.yearsOfExperience = yearsOfExperience;
}
//Heredando el metodo introduce de Person
Developer.prototype = Object.create(Person.prototype);

var developer = new Developer("Stephany", "Palacios", "F", 2);
developer.introduce()
console.log("Developer introduce");

//Creando un método para Developer
Developer.prototype.profesionalIntroduce = function (){
    console.log(`Hi I´m ${this.name} ${this.lastName} and I have ${this.yearsOfExperience} years of experience`);
}
//Ejecutando el metodo
var developer = new Developer("Andres", "Zoto", "M", 5);
developer.introduce();
developer.profesionalIntroduce();

//Creando una clase
class  PersonClass{
    constructor(name, lastName, gender){
        this.name = name;
        this.lastName = lastName;
        this.gender = gender;

    }
    introduce(){
        console.log(`Hi I´m ${this.name} ${this.lastName}`)
    }
} 

var personClass = new PersonClass("Stephany", "Palacios", "Female");
console.log(personClass.introduce(), "personClass");
personClass.introduce()


//Heredar la clase PersonClass - Reutilizar la clase
class DeveloperClass extends PersonClass{
    constructor(name, lastName, gender, yearsOfExperience){
        super(name, lastName, gender);//Metodo para compartir propiedades con objetos los que se heredan
        this.yearsOfExperience = yearsOfExperience;

    }
    profesionalIntroduce(){
        console.log(`Hi I´m ${this.name} ${this.lastName} and I have ${this.yearsOfExperience} years of experience`);
    }
}
//Ejecutar el metodo
var developerClass = new DeveloperClass("Stephany", "Palacios","Female", 2);
console.log(developerClass, "developerClass");
developerClass.profesionalIntroduce();