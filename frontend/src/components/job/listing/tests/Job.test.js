import React from "react";
import {BrowserRouter as Router} from "react-router-dom";
import {render, unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";
import {Job} from "../Job";

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

it("renders job data", () => {
    const job = {
        id: 1,
        'job title': 'job-title-1',
        date: '2019-01-21',
        location: 'Melbourne',
    };

    const {
        id,
        'job title': title,
        date,
        location,
    } = job;

    act(() => {
        render(<Router><Job job={job}/></Router>, container);
    });

    expect(container.textContent).toContain(id);
    expect(container.textContent).toContain(title);
    expect(container.textContent).toContain(date);
    expect(container.textContent).toContain(location);
});