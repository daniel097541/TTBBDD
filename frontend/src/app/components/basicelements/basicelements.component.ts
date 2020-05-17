import {Component, OnInit, ViewChild} from '@angular/core';
import {ColumnMode} from '@swimlane/ngx-datatable';
import {CharacterService} from '../../services/character.service';
import {Character} from '../../models/Character';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Character2 } from 'app/models/Character2';


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
    nombreCharacter: string;
    consultas: Array<string>;
    consultaSeleccionada;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    // Columnas de las Tablas LVs
    public displayedColumns: string[] = ['nombre','naparicionesComics', 'cantidadPoderes', 'numeroCrossovers'];
    public displayedColumns2: string[] = ['nombre','cantidadPoderes'];

    constructor(private _characterService: CharacterService) {
         this.dataSourceFront = new MatTableDataSource();
         this.dataSourceFront2 = new MatTableDataSource();


    }

    ngOnInit() {
        this.consultas = ['Consulta 1', 'Consulta 2', 'Consulta 3', 'Consulta 4', 'Consulta 5', 'Consulta 6', 'Consulta 7', 'Consulta 8', 'Consulta 9', 'Consulta 10']


    }


    mostararCharacters() {
        this.dataSourceFront.data = []
        this.rows=[];
        this._characterService.getCharacters().subscribe(data => {
            console.log(data)
            this.data = data;
            this.data.forEach(c => {
                this.rows.push(new Character(c.name,c.comics.length,c.powers.length,c.crossovers.length))
            })
            this.dataSourceFront.sort = this.sort;

            const sortState: Sort = {active: 'nombre', direction: 'asc'};
            this.dataSourceFront.data = this.rows;
            this.dataSourceFront.paginator = this.paginator;
        })
    }

    mostararCharactersByName() {
        this.dataSourceFront.data = []
        this.rows=[];
        this._characterService.getCharactersByNombre(this.nombreCharacter).subscribe(data => {
            console.log(data)
            this.data = data;
            this.data.forEach(c => {
                this.rows.push(new Character(c.name,c.comics.length,c.powers.length,c.crossovers.length))
            })
            this.dataSourceFront.sort = this.sort;

            const sortState: Sort = {active: 'nombre', direction: 'asc'};
            this.sort.active = sortState.active;
            this.sort.direction = sortState.direction;
            this.sort.sortChange.emit(sortState);
            this.dataSourceFront.data = this.rows;
            this.dataSourceFront.paginator = this.paginator;
        })
    }

    mostrarPersonajesFemeninosOrdenadosPorCantidadDePoderes() {
        this.dataSourceFront2.data = []
        this.rows2=[];
        this._characterService.getPersonajesFemeninosOrdenadosPorPoderes().subscribe(data => {
            console.log(data)
            this.data = data;
            this.data.forEach(c => {
                this.rows2.push(new Character2(c.name,c.powers_amount))
            })
            this.dataSourceFront.sort = this.sort;

            const sortState: Sort = {active: 'nombre', direction: 'asc'};
            this.dataSourceFront2.data = this.rows2;
            this.dataSourceFront2.paginator = this.paginator;
        })
    }


    llamarConsulta() {
        if (this.consultaSeleccionada=='Consulta 1'){
            this.mostararCharacters();
        }else if (this.consultaSeleccionada=='Consulta 2'){
            this.mostararCharactersByName();
        }else if(this.consultaSeleccionada=='Consulta 3'){
            this.mostrarPersonajesFemeninosOrdenadosPorCantidadDePoderes()
        }
    }

}
