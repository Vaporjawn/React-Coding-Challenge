import React, { useEffect, useState } from "react";
import { People, MarketButtons, Person, Role, activatedPerson} from "../Models";
import AdamFriedman from '../team_images/adam-friedman.jpg';
import CeciClarke from '../team_images/ceci-clarke.jpg';
import CourtneyLacy from '../team_images/courtney-lacy.jpg';
import JohnCromwell from '../team_images/jon-cromwell.jpg';
import KirstenPearson from '../team_images/kirsten-pearson.jpg';
import MichaelCarter from '../team_images/michael-carter.jpg';
import './listSelect.css';

export let dynamicPeople = People;
export let potentialTeam: activatedPerson[] = [];
export let market: string[] = [];
export let teamVisibility: string = 'invisible';
export let resultText: {
    text: string,
    visibility: string,
} = {
    text: '',
    visibility: 'invisible'
}

const getTeamImage = (name: string) => {
    switch(name){
        case 'Adam Friedman':{
            return <img className='TeamPicture' src={AdamFriedman} alt={name}/>
        }
        case 'Ceci Clark':{
            return <img className='TeamPicture' src={CeciClarke} alt={name}/>
        }
        case 'Courtney Lacy':{
            return <img className='TeamPicture' src={CourtneyLacy} alt={name}/>
        }
        case 'John Cromwell':{
            return <img className='TeamPicture' src={JohnCromwell} alt={name}/>
        }
        case 'Kirsten Pearson':{
            return <img className='TeamPicture' src={KirstenPearson} alt={name}/>
        }
        case 'Michael Carter':
            return <img className='TeamPicture' src={MichaelCarter} alt={name}/>
        }
    }

const filterPeople = (marketName: string) => {
    if(marketName === 'Reset'){dynamicPeople = People; potentialTeam = []; resultText.visibility = 'invisible';}
    else{
        dynamicPeople = People;
        dynamicPeople = dynamicPeople.filter(c => c.markets.find(d => d === marketName));
        potentialTeam = potentialTeam.filter(p => p.Person.markets.find(q => q === marketName));
        market = [marketName];
    }
}

const returnArray = (selected: Person) => {
    const chosenElement = potentialTeam.find(c => c.Person === selected);
    if(chosenElement !== undefined){
        return chosenElement.Selected;
    }
}

const marketCheck = (incomingPerson: Person) => {
    if(potentialTeam.length === 0){
        market = incomingPerson.markets;
    }
    if(potentialTeam.length === 1 && potentialTeam[0].Person.markets.length > market.length){
        market = potentialTeam[0].Person.markets;
    }
    if(market.length === 0 && incomingPerson.markets.filter(e => market.indexOf(e))){
        market = incomingPerson.markets;
    }
    if(market.length !== 0 && incomingPerson.markets.filter(e => market.indexOf(e))){
        const staticMarket = market;
        for(let i=0; i < market.length; i++){

            if(incomingPerson.markets.find(m => m === staticMarket[i])){
                if(incomingPerson.markets.length < market.length){
                    market = incomingPerson.markets;
                }
                return true;
            }
        }
        return false;
    }
}

const isSelected = (currentPerson: Person) => {
    if(!potentialTeam.find(p => p.Person === currentPerson) && potentialTeam.length < 3 && !potentialTeam.find(p => p.Person.role === currentPerson.role)){
        if(potentialTeam.find(p => p.Person.markets.find(m => m === currentPerson.markets.find(f => f === m))) || potentialTeam.find(p => p.Person.markets.find(m => m === currentPerson.markets.find(f => f === m))) === undefined){
            let newAddition: activatedPerson = {
                Person: currentPerson,
                Selected: 'isSelected'
            };
            if(marketCheck(currentPerson)){
                potentialTeam.push(newAddition);
            }
        }
    }else{
        potentialTeam = potentialTeam.filter(p => p.Person !== currentPerson);
        if(potentialTeam.length === 0){
            market = []
        }else{
            market = potentialTeam[0].Person.markets;
        }
    }
    if(potentialTeam.length < 3){teamVisibility = 'invisible'; resultText.visibility = 'invisible';};
}

const makeTeam = () => {
    if(potentialTeam.find(x => x.Person.role === Role.AccountExecutive) 
    && potentialTeam.find(x => x.Person.role === Role.Concierge)
    && potentialTeam.find(x => x.Person.role === Role.HeadOfConstruction)){

        teamVisibility = 'flex visible';
        resultText.text = 'Created Team'
        resultText.visibility = 'block'
    }else{
        teamVisibility = 'invisible'
        resultText.text = 'Error: Team Member(s) are missing from team';
        resultText.visibility = 'block error';
    }
}

const ListSelect = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [time, setTime] = useState(Date.now());

    useEffect(() => {
        const interval = setInterval(() => setTime(Date.now()), 10);
        return () => {
            clearInterval(interval);
        };
    }, []);
        const createdTeam = potentialTeam.map(item =>
            <div className="pictureText">
            <div className={returnArray(item.Person)} onClick={() => isSelected(item.Person)}>
                {getTeamImage(item.Person.name)}<br/>
                {item.Person.name} <br/>
                {item.Person.role} <br/>
                {item.Person.markets.map(c => c + '\n')} <br/><br/>
            </div>
        </div>
            )
        const renderedOutput = dynamicPeople.map(item => 
        <div className="pictureText" key={item.name}>
            <div className={returnArray(item)} onClick={() => isSelected(item)}>
                {getTeamImage(item.name)}<br/>
                {item.name} <br/>
                {item.role} <br/>
                {item.markets.map(c => c + '\n')} <br/><br/>
            </div>
        </div>)
        const filterButtons = MarketButtons.map(item => <button key={item.key} className="button" onClick={() => filterPeople(item.text)}> {item.text} </button>)

    return (
        <div>
            <div className="buttonBar">
                {filterButtons}
                <button className="button" onClick={() => makeTeam()} >Make Team</button>
            </div>
            <div className="flex">
                {renderedOutput}
            </div>
            <div className={resultText.visibility}>
                <h2 className="centered">{resultText.text}</h2>
            </div>
            <div className={teamVisibility}>
                {createdTeam}
            </div>
        </div>
    );
}

export default ListSelect;