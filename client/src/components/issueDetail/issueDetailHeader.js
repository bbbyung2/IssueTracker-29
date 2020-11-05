import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SvgCloseLogo from '../issuelist/svgCloseLogo';
import SvgOpenLogo from '../issuelist/svgOpenLogo.js';
import DatePassedViewer from '../common/datePassed.js';
import { ISSUE_OPEN } from '../../../util/config';

const COLOR_SUCCESS = "#22863a";
const COLOR_DANGER = "#cb2431";

const IssueHeadContainer = styled.div`
  border-bottom: 1px solid #d1d5da;
  margin-bottom: 20px;
`;

const EditTitleButton = styled.button`
  float: right;
  padding: 10px;
  margin-right: 100px;
`;

const SaveTitleButton = styled.button``;

const CancelTitleButton = styled.button``;

const EditContentsButton = styled.button``;

const IssueHeader = (props) => {

    const [isEditting, setIsEditting] = useState(false);

    return (
        <>
            <IssueHeadContainer>
                {isEditting ? <div><button>Save</button><button></button></div> : <EditTitleButton onClick={editTitle}>Edit</EditTitleButton>}
                {isEditting ? <input>{props.issue.issue_title}</input> : <h3>{props.issue.issue_title} #{props.issue.id}</h3>}
                <p>
                    <div>
                        {props.issue.is_open === ISSUE_OPEN ? <SvgOpenLogo color={COLOR_SUCCESS}/> : <SvgCloseLogo color={COLOR_DANGER}/>}
                        {props.issue.is_open === ISSUE_OPEN ? "Open" : "Closed"}
                    </div>
                    {props.issue.username} opened this issue <DatePassedViewer datetime={props.issue.changed_at} /> · {props.commentsNum} comment
                </p>
            </IssueHeadContainer>
        </>
    )
}

export default IssueHeader;