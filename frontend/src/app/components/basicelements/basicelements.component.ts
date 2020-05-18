import {Component, OnInit, ViewChild} from '@angular/core';
import {ColumnMode} from '@swimlane/ngx-datatable';
import {CharacterService} from '../../services/character.service';
import {Character} from '../../models/Character';
import {Comic} from '../../models/Comic';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Character2} from 'app/models/Character2';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
    selector: 'app-basicelements',
    templateUrl: './basicelements.component.html',
    styleUrls: ['./basicelements.component.scss']
})
export class BasicelementsComponent implements OnInit {
    simpleSlider = 40;
    doubleSlider = [20, 60];
    state_default: boolean = true;
    focus: any;
    data: Array<any> = [];
    rows: Array<Character> = [];
    rows2: Array<Character2> = [];
    ColumnMode = ColumnMode;
    public dataSourceFront: MatTableDataSource<Character>;
    public dataSourceFront2: MatTableDataSource<Character2>;
    public dataSourceWomen: MatTableDataSource<Character>;
    public dataSourceComic: MatTableDataSource<Comic>;
    dataWomen: Array<any> = [];
    rowsWomen: Array<Character> = [];
    rowsComics: Array<Comic> = [];
    nombreCharacter: string;
    consultas: Array<string>;
    consultasComic: Array<string>;
    consultaSeleccionada;
    consultaComicSeleccionada;
    comicNameSerach;
    comicSearch:boolean;
    comicHeoesFuertes;


    cantidadComicsPersonajeMasPoderes;
    colorOjosPersonajeMasPoderes;
    editorialPersonajeMasPoderes;
    colorPeloPersonajeMasPoderes;
    nombrePersonajeMasPoderes;
    cantidadPoderesPersonajeMasPoderes;

    nombrePersonajeConMasPeso;
    cantidadComicsPersonajeConMasPeso;
    colorOjosPersonajeConMasPeso;
    pesoPersonajeConMasPeso;
    mejorHeroeDelComic;
    buscadorComic;
    comicFound;

    villanoMasListo;
    heroeMasTonto;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    // Columnas de las Tablas LVs
    public displayedColumns: string[] = ['nombre', 'naparicionesComics', 'cantidadPoderes', 'numeroCrossovers'];
    public displayedColumns2: string[] = ['nombre', 'cantidadPoderes'];
    public displayedColumnsWomen: string [] = ['nombre','naparicionesComics' ]
    public displayedColumnsComic: string [] = ['nombre']

    constructor(private _characterService: CharacterService,private spinner: NgxSpinnerService) {
        this.dataSourceFront = new MatTableDataSource();
        this.dataSourceFront2 = new MatTableDataSource();
        this.dataSourceWomen = new MatTableDataSource();
        this.dataSourceComic = new MatTableDataSource();
    }

    ngOnInit() {
        this.comicFound = false;
        this.comicSearch = false;
        this.consultas = ['Consulta 1', 'Consulta 2', 'Consulta 3', 'Consulta 4', 'Consulta 5', 'Consulta 6', 'Consulta 7', 'Consulta 8', 'Consulta 9', 'Consulta 10']
        this.consultasComic = ["Busqueda por nombre", "Comic con heroes mas fuertes"]
        this.getTopTenWomen();
        this.getTopPowerfull();
    }


    mostararCharacters() {
        this.spinner.show();
        this.dataSourceFront.data = []
        this.rows = [];
        this._characterService.getCharacters().subscribe(data => {
            console.log(data)
            this.data = data;
            this.data.forEach(c => {
                this.rows.push(new Character(c.name, c.comics.length, c.powers.length, c.crossovers.length))
            })
            this.dataSourceFront.sort = this.sort;

            const sortState: Sort = {active: 'nombre', direction: 'asc'};
            this.dataSourceFront.data = this.rows;
            this.dataSourceFront.paginator = this.paginator;
                this.spinner.hide();

        })
    }

    mostararCharactersByName() {
        this.spinner.show();
        this.dataSourceFront.data = []
        this.rows = [];
        this._characterService.getCharactersByNombre(this.nombreCharacter).subscribe(data => {
            console.log(data)
            this.data = data;
            this.data.forEach(c => {
                this.rows.push(new Character(c.name, c.comics.length, c.powers.length, c.crossovers.length))
            })
            this.dataSourceFront.sort = this.sort;

            const sortState: Sort = {active: 'nombre', direction: 'asc'};
            this.sort.active = sortState.active;
            this.sort.direction = sortState.direction;
            this.sort.sortChange.emit(sortState);
            this.dataSourceFront.data = this.rows;
            this.dataSourceFront.paginator = this.paginator;
            this.spinner.hide();
        })
    }

    mostrarPersonajesFemeninosOrdenadosPorCantidadDePoderes() {
        this.spinner.show();
        this.dataSourceFront2.data = []
        this.rows2 = [];
        this._characterService.getPersonajesFemeninosOrdenadosPorPoderes().subscribe(data => {
            console.log(data)
            this.data = data;
            this.data.forEach(c => {
                this.rows2.push(new Character2(c.name, c.powers_amount))
            })
            this.dataSourceFront.sort = this.sort;

            const sortState: Sort = {active: 'nombre', direction: 'asc'};
            this.dataSourceFront2.data = this.rows2;
            this.dataSourceFront2.paginator = this.paginator;
            this.spinner.hide();
        })
    }

    mostrarPersonajeConMasPoderes() {
        this.spinner.show();
        this._characterService.getPersonajeConMasPoderes().subscribe(data => {
            // @ts-ignore
            this.cantidadComicsPersonajeMasPoderes = data[0]._id.comics.length;
            // @ts-ignore
            this.colorOjosPersonajeMasPoderes = data[0]._id.info.eye_color;
            // @ts-ignore
            this.editorialPersonajeMasPoderes = data[0]._id.info.publisher;
            // @ts-ignore
            this.colorPeloPersonajeMasPoderes = data[0]._id.info.hair_color
            // @ts-ignore
            this.nombrePersonajeMasPoderes = data[0]._id.name;
            // @ts-ignore
            this.cantidadPoderesPersonajeMasPoderes = data[0]._id.powers.length;
            this.spinner.hide();
        })
    }

    mostrarPersonajeMasGordo() {
        this.spinner.show();
        this._characterService.getPersonajeConMasPoderes().subscribe(data => {
            // @ts-ignore
            this.cantidadComicsPersonajeMasPoderes = data[0]._id.comics.length;
            // @ts-ignore
            this.colorOjosPersonajeMasPoderes = data[0]._id.info.eye_color;
            // @ts-ignore
            this.editorialPersonajeMasPoderes = data[0]._id.info.publisher;
            // @ts-ignore
            this.colorPeloPersonajeMasPoderes = data[0]._id.info.hair_color
            // @ts-ignore
            this.nombrePersonajeMasPoderes = data[0]._id.name;
            // @ts-ignore
            this.cantidadPoderesPersonajeMasPoderes = data[0]._id.powers.length;
            this.spinner.hide();
        })
    }

    mostrarPersonajeConMasPeso(){
        this.spinner.show();
        this._characterService.getPersonajeMasGordo().subscribe(data => {

            this.nombrePersonajeConMasPeso=data[0]._id.name;
            this.cantidadComicsPersonajeConMasPeso=data[0]._id.comics.length;
            this.colorOjosPersonajeConMasPeso=data[0]._id.info.eye_color;
            this.pesoPersonajeConMasPeso=data[0].weight;
            this.spinner.hide();
        })
    }

    mostrarHeroesMalos(){
        this.spinner.show();
        this._characterService.getHeroesMalos().subscribe(data => {

            this.data = data;
            this.data.forEach(c => {
                this.rows.push(new Character(c.name, c.comics.length, c.powers.length, c.crossovers.length))
            })
            this.dataSourceFront.sort = this.sort;

            this.dataSourceFront.data = this.rows;
            this.dataSourceFront.paginator = this.paginator;
            this.spinner.hide();
        });
    }

    mostrarHeroeMasPoderosoByComic(){
        this.spinner.show();

        this._characterService.getHeroesPoderosoComic(this.buscadorComic).subscribe(data => {
            this.mejorHeroeDelComic=data[0].name;
            this.comicFound = true;
            this.spinner.hide();
        });
    }

    getVillanoMasListo(){
        this.spinner.show();

        this._characterService.getVillanoMasListo().subscribe(data => {
            this.villanoMasListo=data[0].name;
            this.spinner.hide();
        });
    }

    getHeroeMasTonto(){
        this.spinner.show();

        this._characterService.getHeroeMasTonto().subscribe(data => {
            this.heroeMasTonto=data[0].name;
            this.spinner.hide();
        });
    }

    getTopTenWomen(){
        this._characterService.getTopWomen().subscribe(data => {
            console.log(data);
            this.dataWomen = data;
            this.dataWomen.forEach(c => {
                this.rowsWomen.push(new Character(c.char_name, c.numberOfAppearances, 0, 0))
            });
            //this.dataSourceWomen.sort = this.sort;

            this.dataSourceWomen.data = this.rowsWomen;
            this.dataSourceWomen.paginator = this.paginator;
        });
    }

    getTopPowerfull(){
        this._characterService.getTopPowerfull().subscribe(data => {
            console.log(data)
            this.data = data;
            this.data.forEach(c => {
                this.rows2.push(new Character2(c.char_name, c.numberOfPowers))
            })
            this.dataSourceFront.sort = this.sort;

            const sortState: Sort = {active: 'nombre', direction: 'asc'};
            this.dataSourceFront2.data = this.rows2;
            this.dataSourceFront2.paginator = this.paginator;
            this.spinner.hide();
        });
    }

    llamarConsulta() {
        if (this.consultaSeleccionada == 'Consulta 1') {
            this.mostararCharacters();
        } else if (this.consultaSeleccionada == 'Consulta 2') {
            this.mostararCharactersByName();
        } else if (this.consultaSeleccionada == 'Consulta 3') {
            this.mostrarPersonajesFemeninosOrdenadosPorCantidadDePoderes()
        } else if (this.consultaSeleccionada == 'Consulta 4') {
            this.mostrarPersonajeConMasPoderes();
        }else if (this.consultaSeleccionada == 'Consulta 5'){
            this.mostrarPersonajeConMasPeso();
        }else if (this.consultaSeleccionada == 'Consulta 6'){
            this.mostrarHeroesMalos();
        }else if(this.consultaSeleccionada == 'Consulta 8'){
            this.getVillanoMasListo();
        }else if(this.consultaSeleccionada == 'Consulta 9'){
            this.getHeroeMasTonto();
        }
    }

    llamarConsultaComic(){
        if(this.consultaComicSeleccionada == "Comic con heroes mas fuertes"){
            this.getComicHeroesFuertes();
        }
    }  

    buscarComic(){
        this.spinner.show();
        this.comicSearch = false;
        this._characterService.getComicsByName(this.comicNameSerach).subscribe(data => {
            this.comicSearch = true;
            this.data = data;
            this.data.forEach(c => {
                this.rowsComics.push(new Comic(c.name));
            })
            const sortState: Sort = {active: 'nombre', direction: 'asc'};
            this.sort.active = sortState.active;
            this.sort.direction = sortState.direction;
            this.sort.sortChange.emit(sortState);
            this.dataSourceComic.data = this.rowsComics;
            setTimeout(() => this.dataSourceComic.paginator = this.paginator);
            this.spinner.hide();
        });

    }

    getComicHeroesFuertes(){
        this.spinner.show();

        this._characterService.getComicHeroesFuertes().subscribe(data => {
            this.comicHeoesFuertes=data[0]._id;
            this.spinner.hide();
        });
    }
}
