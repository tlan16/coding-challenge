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

it("renders job data", async () => {
    const fakeJob = {
        id: 1,
        'job title': 'job-title-1',
        'job description': 'job-description-1',
        date: '2019-01-21',
        location: 'Melbourne',
        applicants: 'Joe,Jack',
    };

    jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve(fakeJob)
        })
    );

    // Use the asynchronous version of act to apply resolved promises
    const match = {
        params: {
            id: 1,
        }
    };
    await act(async () => {
        render(<Router><Job match={match}/></Router>, container);
    });


    const {
        id,
        'job title': title,
        'job description': description,
        date,
        location,
        applicants,
    } = fakeJob;

    expect(container.textContent).toContain(id);
    expect(container.textContent).toContain(title);
    expect(container.textContent).toContain(date);
    expect(container.textContent).toContain(location);
    for (const applicant of applicants.split(',')) {
        expect(container.textContent).toContain(applicant);
    }

    global.fetch.mockRestore();
});
