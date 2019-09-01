import React from "react";
import {BrowserRouter as Router} from "react-router-dom";
import {render, unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";
import {Applicants} from "../Applicants";

let container = null;
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("renders applicants data", () => {
    const applicants = 'Joe,Jack';

    act(() => {
        render(<Router><Applicants applicants={applicants}/></Router>, container);
    });

    for (const applicant of applicants.split(',')) {
        expect(container.textContent).toContain(applicant);
    }
});