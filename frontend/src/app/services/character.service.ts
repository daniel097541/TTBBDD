import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Character} from '../models/Character';


@Injectable({
    providedIn: 'root'
})

export class CharacterService {

    public url: string;

    constructor(private httpClient: HttpClient) {
        this.url = 'http://localhost:3000/'
    }

    public getCharacters() {
        return this.httpClient.get<any[]>(this.url + 'characters');
    }

    public getCharactersByNombre(nombre:string) {
        return this.httpClient.get<any[]>(this.url + 'characters'+'/findMatchingName?name='+nombre);
    }

}
