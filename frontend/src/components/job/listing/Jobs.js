import React from 'react'
import {Job} from './Job'

const Jobs = class extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {jobs: []};

        this.fetchJobs = this.fetchJobs.bind(this);
    }

    componentDidMount() {
        this.fetchJobs()
    }

    fetchJobs() {
        const API_ENDPOINT = 'http://localhost:8000/jobs';
        fetch(API_ENDPOINT)
            .then(response => response.json())
            .then(jobs => {
                this.setState(() => ({
                    jobs,
                }))
            })
    }

    render() {
        const {
            jobs,
        } = this.state;

        return (
            <React.Fragment>
                {
                    jobs.length > 0 &&
                    (
                        <table>
                            <thead>
                            <tr>
                                <th>ID:</th>
                                <th>Title:</th>
                                <th>Location:</th>
                                <th>Date:</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                jobs.map(job => (
                                    <Job key={job.id} job={job}/>
                                ))
                            }
                            </tbody>
                        </table>
                    )
                }
            </React.Fragment>
        )
    }
};

export {
    Jobs,
}
