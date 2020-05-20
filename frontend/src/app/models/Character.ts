export class Character {
    public id: number;
    public nombre: string
    public aparicionesEnComics: number
    public numeroPoderes: number
    public numeroCrossovers: number


    constructor(nombre: string, aparicionesEnComics: number, numeroPoderes: number, numeroCrossovers: number, id:number) {
        this.nombre = nombre;
        this.aparicionesEnComics = aparicionesEnComics;
        this.numeroPoderes = numeroPoderes;
        this.numeroCrossovers = numeroCrossovers;
        this.id = id;
    }
}
