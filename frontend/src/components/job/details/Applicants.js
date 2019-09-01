import React from 'react';

const Applicants = class extends React.Component {
    render() {
        const {
            applicants = ''
        } = this.props;

        return (
            <React.Fragment>
                {
                    applicants.split(',').map(function (applicant, index) {
                        return [
                            <span key={applicant} style={{textTransform: "capitalize"}}>{applicant}</span>,
                            index !== applicant.length && <br key={applicant+'_break'}/>,
                        ]
                    })
                }
            </React.Fragment>
        )
    }
};

export {
    Applicants,
}
