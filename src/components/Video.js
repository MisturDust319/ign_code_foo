import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import './../Extra.css';

import { Row } from 'reactstrap';
import { Col } from 'reactstrap';

function Video(props) {

    let getRule = (bool) => {
        if(bool) {
            return ( <hr xs="12"/>);
        }
    }

    return (
        <Row className="article-card">
            {getRule(props.rule)}
            <Col xs="12" lg="4" className="article-picture">
                <img src={props.imageSource} width={props.imageWidth} height={props.imageHeight} />
            </Col>
            <Col xs="12" lg="8" className="article-info">
                <Row className="text-justify text-left">
                    <span className="item-stats">
                    {props.length}&ensp;-&ensp;
                        <svg className="icon icon-comment-2" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.538 11.528l-3.14 2.048a.5.5 0 0 1-.773-.419v-1.993a4.375 4.375 0 0 1 1.749-8.383h5.252a4.374 4.374 0 1 1 0 8.747H7.538z" stroke="#DD3A3A" stroke-width="2" fill="none" fill-rule="evenodd">
                            </path>
                        </svg>
                    &ensp;{props.commentCount}
                    </span>
                </Row>
                <Row>
                    <b className="article-name">{props.name}</b>
                </Row>
            </Col>
        </Row>
    )
}

Video.propTypes = {
    imageSource: PropTypes.string.isRequired,
    imageWidth: PropTypes.string.isRequired,
    imageHeight: PropTypes.string.isRequired,
    length: PropTypes.string.isRequired,
    commentCount: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    rule: PropTypes.bool
}

export { Video };