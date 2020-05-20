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

    public getHeroesMalos() {
        return this.httpClient.get<any[]>( '/characters'+'/findBadHeroes');
    }

    public getHeroesPoderosoComic(comicId: string) {
        return this.httpClient.get<any[]>( '/characters' + '/findBestInComic?comicId=' + comicId);
    }

    public getVillanoMasListo() {
        return this.httpClient.get<any[]>( '/characters' + '/findSmartestVillain');
    }

    public getHeroeMasTonto() {
        return this.httpClient.get<any[]>( '/characters' + '/findDumbestHero');
    }

    public getTopWomen(){
        return this.httpClient.get<any[]>( '/characters' + '/ranking' + '/topTenWomen');
    }

    public getTopPowerfull(){
        return this.httpClient.get<any[]>( '/characters' + '/ranking' + '/top10Powerfull');
    }

    public getComicsByName(comicName: string){
        return this.httpClient.get<any[]>( '/comics' + '/findMatchingName?name=' + comicName);
    }

    public getComicHeroesFuertes(){
        return this.httpClient.get<any[]>( '/comics' + '/findComicWithStrongestHeroes');
    }

    public getTopByAlignment(alignment: string){
        return this.httpClient.get<any[]>( '/characters' + '/ranking' + '/top5WithAlignment?alignment=' + alignment);
    }
}
