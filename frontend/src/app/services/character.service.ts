import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})

export class CharacterService {

    constructor(private httpClient: HttpClient) {
    }

    public getCharacters() {
        return this.httpClient.get<any[]>('/characters');
    }

    public getCharactersByNombre(nombre: string) {
        return this.httpClient.get<any[]>('/characters' + '/findMatchingName?name=' + nombre);
    }

    public getPersonajesFemeninosOrdenadosPorPoderes() {
        return this.httpClient.get<any[]>( '/characters'+'/didYouJustAssumeMyGender');
    }

    public getPersonajeConMasPoderes() {
        return this.httpClient.get<any[]>( '/characters'+'/whoIsPeterPetrelli');
    }

    public getPersonajeMasGordo() {
        return this.httpClient.get<any[]>( '/characters'+'/whoIsRedBarclay');
    }


}
