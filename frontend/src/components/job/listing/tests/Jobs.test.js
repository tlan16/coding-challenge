import React from "react";
import {BrowserRouter as Router} from "react-router-dom";
import {render, unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";
import {Jobs} from "../Jobs";

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

it("renders jobs data", async () => {
    const fakeJobs = [
        {
            id: 1,
            'job title': 'job-title-1',
            'job description': 'job-description-1',
            date: '2019-01-21',
            location: 'Melbourne',
            applicants: 'Joe,Jack',
        },
        {
            id: 2,
            'job title': 'job-title-2',
            'job description': 'job-description-2',
            date: '2019-02-21',
            location: 'Sydney',
            applicants: 'Frank,Monica',
        },
    ];

    jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve(fakeJobs)
        })
    );

    // Use the asynchronous version of act to apply resolved promises
    await act(async () => {
        render(<Router><Jobs/></Router>, container);
    });

    for (const fakeJob of fakeJobs) {
        const {
            id,
            'job title': title,
            date,
            location,
        } = fakeJob;

        expect(container.textContent).toContain(id);
        expect(container.textContent).toContain(title);
        expect(container.textContent).toContain(date);
        expect(container.textContent).toContain(location);
    }

    global.fetch.mockRestore();
});
