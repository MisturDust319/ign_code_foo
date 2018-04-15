import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Row } from 'reactstrap';
import { Col } from 'reactstrap';
import { Button } from 'reactstrap';
import { ButtonGroup } from 'reactstrap';

import {Article} from './Article.js';

import { Label } from 'reactstrap/dist/reactstrap.es';

class FeedPanel extends React.Component {
    render() {
        return(
            <div>
                <Row>
                    <Col xs="12">
                        <ButtonGroup >
                            <Button color="primary">VIDEOS</Button>
                            <Button color="primary">ARTICLES</Button>
                        </ButtonGroup>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12">
                        <Article imageSource="https://assets1.ignimgs.com/2018/03/28/agentsofshieldyoyo-1280-1522278265966_compact.jpg"
                        length="12" commentCount="5" name="qqqqqqq" />
                        <hr />
                    </Col>
                </Row>
                <Row>
                    <Col xs="12">
                        <Button color="primary">LOAD MORE</Button>
                    </Col>
                </Row>
            </div>
        )
    }
}

export {FeedPanel};