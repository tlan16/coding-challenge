import React from 'react'
import {Link} from "react-router-dom";

const Job = class extends React.Component {
    render() {
        const {
            job: {
                id,
                'job title': title,
                date,
                location,
            },
        } = this.props;

        return (
            <tr>
                <td>{id}</td>
                <td>{title}</td>
                <td>{location}</td>
                <td>{date}</td>
                <td>
                    <Link to={`/job/${id}`}>View</Link>
                </td>
            </tr>
        )
    }
};

export {
    Job,
}
