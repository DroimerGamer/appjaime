import { Injectable } from "@angular/core";
import { Cards } from "src/app/core/trello/entities/cards";
import { CardsRepository } from "src/app/core/trello/interfaces/cards.repository";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({providedIn: 'root'})

export class CardsStorageService implements CardsRepository{

    urlTrello = "https://api.trello.com/1/"

    httpHeader = {
        headers: new HttpHeaders({ "Accept": "application/json" }),
    };

    constructor(
        public http: HttpClient
    ){}
    
    createCard(cards: Cards): Promise<boolean> {
        const httpParams = new HttpParams()
            .set("idList", cards.idList)
            .set("key", cards.key)
            .set("token", cards.token)
            .set("name", cards.name)
            .set("desc", cards.desc)
            
    
        return this.http.post(this.urlTrello + "cards", httpParams, this.httpHeader)
            .toPromise()
            .then(() => {
                console.log("confirm");
                return true;
            })
            .catch((error) => {
                console.log(error);
                return false;
            });
    }

    async getCard(idList:string): Promise<Cards[]> {

        const httpParams = new HttpParams()
            .set("key", "854262ad276f163a6d7a73851a99ae46")
            .set("token", "ATTA4699bfbad61360f9bfda676d510a0906954350cd295f66abb6cede3c9b041c5dAF5D729E")
    
        return this.http.get<Cards[]>(this.urlTrello + "lists/" + idList + "/cards", { params: httpParams, headers: { "Accept": "application/json" }})
            .toPromise()
            .then((response) => {
                return response;
            })
            .catch((error) => {
                console.log(error)
                return error
            });
    }

    updateCard(updatedCards: Cards): Promise<boolean> {
        const httpParams = new HttpParams()
            .set("key", updatedCards.key)
            .set("token", updatedCards.token)
            .set("name", updatedCards.name)
            .set("desc", updatedCards.desc)
    
        return this.http.put(this.urlTrello + "cards/" + updatedCards.id, httpParams, this.httpHeader)
            .toPromise()
            .then(() => {
                console.log("confirm");
                return true;
            })
            .catch((error) => {
                console.log(error);
                return false;
            });
    }

    async deleteCard(card: Cards): Promise<boolean> {
        const httpParams = new HttpParams()
            .set("key", card.key)
            .set("token", card.token)
    
        try {
            await this.http.delete(this.urlTrello + "cards/" + card.id, { params: httpParams, headers: { "Accept": "application/json" }})
                .toPromise();
            console.log("confirm");
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    
}