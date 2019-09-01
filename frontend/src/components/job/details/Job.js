import React from 'react';
import {Link} from "react-router-dom";
import {Applicants} from "./Applicants";
import constants from '../../../constants';


const Job = class extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            job: {}
        };

        this.fetchJob = this.fetchJob.bind(this);
    }

    componentDidMount() {
        this.fetchJob()
    }

    async fetchJob() {
        const response = await fetch(`${constants.API_ENDPOINT}job/${this.props.match.params.id}`);
        const job = await response.json();

        this.setState(() => ({
            job,
        }));
    }

    render() {
        const {job} = this.state;

        const {
            id,
            'job title': title,
            'job description': description,
            date,
            location,
            applicants,
        } = job;

        return (
            <React.Fragment>
                {
                    job &&
                    (
                        <table>
                            <tbody>
                            <tr>
                                <th>ID:</th>
                                <td>{id}</td>
                            </tr>
                            <tr>
                                <th>Title:</th>
                                <td>{title}</td>
                            </tr>
                            <tr>
                                <th>Location:</th>
                                <td>{location}</td>
                            </tr>
                            <tr>
                                <th>Date:</th>
                                <td>{date}</td>
                            </tr>
                            <tr>
                                <th>Description:</th>
                                <td>{description}</td>
                            </tr>
                            <tr>
                                <th>Applicants:</th>
                                <td><Applicants applicants={applicants}/></td>
                            </tr>
                            </tbody>
                        </table>
                    )
                }
                <br/>
                <Link style={{float: 'left'}} to="/">Back</Link>
            </React.Fragment>
        )
    }
};

export {
    Job,
}
