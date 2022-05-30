import React from "react";
import ReactDOM from "react-dom";
import App from "../App";
import { dynamicPeople, market, potentialTeam, resultText, teamVisibility } from "../components/listSelect";
import { render } from "../test_utils/testRender";
import { People, Market, MarketButtons, Role} from '../Models';


describe("App", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders and matches snapshot", async () => {    
    const c = await render(<App />);
    expect(c.baseElement).toMatchSnapshot();
  });
});

describe("listSelect", () => {
  it("renders without crashing", () => {

  });
});

describe("potentialTeam", () => {
  it("has a max of 3", () => {
    expect(potentialTeam.length).toBeLessThanOrEqual(3);
  });

  it("Starts as empty array", () => {
    expect(potentialTeam).toEqual([]);
  });
});

describe("market", () => {
  it("does not exceed the max number of markets", () => {
    expect(market.length).toBeLessThanOrEqual(2);
  });

  it("Starts as empty array", () => {
    expect(market).toEqual([]);
  });
});

describe("dynamicPeople", () => {
  it("does not become bigger than People", () => {
    expect(dynamicPeople.length).toBeLessThanOrEqual(People.length);
  });
});

describe("teamVisibility", () => {
  it("starts off as invisible", () => {
    expect(teamVisibility).toBe('invisible');
  });
});

describe("resultText", () => {
  it("starts off as invisible", () => {
    expect(resultText).toEqual({
      text: '',
      visibility: 'invisible'
    });
  });
});

describe("Market", () => {
  it("codes are equal to their value", () => {
    expect(Market.NorCal).toBe('NorCal');
    expect(Market.SoCal).toBe('SoCal');
  });
});

describe("Market Buttons", () => {
  it("text contains the correct values", () => {
    expect(MarketButtons[0].text).toBe('SoCal');
    expect(MarketButtons[1].text).toBe('NorCal');
    expect(MarketButtons[2].text).toBe('Reset');
  });

  it("keys contain the correct values", () => {
    expect(MarketButtons[0].key).toBe('Southern California');
    expect(MarketButtons[1].key).toBe('Northern California');
    expect(MarketButtons[2].key).toBe('Reset Interface');
  });

  it("has the correct amount of buttons", () => {
    expect(MarketButtons.length).toEqual(3);
  });
});

describe("Role", () => {
  it("the required roles are available", () => {
    expect(Role.AccountExecutive).toBe('Account Executive');
    expect(Role.HeadOfConstruction).toBe('Head Of Construction');
    expect(Role.Concierge).toBe('Concierge');
  });
});

describe("People", () => {
  it("People never change", () => {
    expect(People.length).toEqual(6);
  });
  
  it("Contains the original members", () => {
    expect(People[0].name).toEqual('Adam Friedman');
    expect(People[1].name).toEqual('Ceci Clark');
    expect(People[2].name).toEqual('Courtney Lacy');
    expect(People[3].name).toEqual('John Cromwell');
    expect(People[4].name).toEqual('Kirsten Pearson');
    expect(People[5].name).toEqual('Michael Carter');
  });
});

