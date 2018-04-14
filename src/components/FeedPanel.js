import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Row } from 'reactstrap';
import { Col } from 'reactstrap';
import { Button } from 'reactstrap';
import { ButtonGroup } from 'reactstrap';


import { Label } from 'reactstrap/dist/reactstrap.es';

class FeedPanel extends React.Component {
    render() {
        return(
            <div>
                <Row>
                    <ButtonGroup >
                        <Button size="lg" className="col-xs-4" color="danger">Videos</Button>
                        <Button size="lg" color="danger">Articles</Button>
                    </ButtonGroup>
                </Row>
                <Row>

                </Row>
            </div>
        )
    }
}

export {FeedPanel};