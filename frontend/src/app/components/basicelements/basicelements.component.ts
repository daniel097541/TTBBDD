import {Component, OnInit, ViewChild} from '@angular/core';
import {ColumnMode} from '@swimlane/ngx-datatable';
import {CharacterService} from '../../services/character.service';
import {Character} from '../../models/Character';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


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
    ColumnMode = ColumnMode;
    public dataSourceFront: MatTableDataSource<Character>;
    nombreCharacter:string;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    // Columnas de las Tablas LVs
    public displayedColumns: string[] = ['nombre'];

    constructor(private _characterService: CharacterService) {
        this.dataSourceFront = new MatTableDataSource();


    }

    ngOnInit() {
    this.mostararCharactersByName();

    }


    mostararCharacters() {
        this._characterService.getCharacters().subscribe(data => {
            this.data = data;
            this.data.forEach(c => {
                this.rows.push(new Character(c.name))
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

    mostararCharactersByName() {
        this._characterService.getCharactersByNombre(this.nombreCharacter).subscribe(data => {
            console.log(data)
            this.data = data;
            this.data.forEach(c => {
                this.rows.push(new Character(c.name))
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


}
