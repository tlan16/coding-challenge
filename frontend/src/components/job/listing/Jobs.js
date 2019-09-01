import React from 'react'
import {Job} from './Job'
import constants from '../../../constants';

const Jobs = class extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {jobs: []};

        this.fetchJobs = this.fetchJobs.bind(this);
    }

    componentDidMount() {
        this.fetchJobs()
    }

    async fetchJobs() {
        const response = await fetch(`${constants.API_ENDPOINT}jobs`);
        const jobs = await response.json();

        this.setState(() => ({
            jobs,
        }));
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
