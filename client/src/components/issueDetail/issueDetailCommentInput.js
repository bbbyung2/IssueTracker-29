import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ISSUE_CLOSE, ISSUE_OPEN } from '../../../util/config';
import { BASE_API_URL } from '../../../util/config';
import { sendPutRequest, sendPostRequest, sendImagePostRequest, sendGetRequest } from '../common/api';


const IssueCommentInput = styled.textarea`
    margin-top: 50px;
    height: 200px;
    width: 100%;
`;

const ButtonContainer = styled.div`
    display: flex;
`;

const ContentWrap = styled.div`
    width: 300px;
    height: auto;
    position: relative;
    display: inline-block;
`;

const TextCountSpan = styled.span`
    display: ${props => (props.timeCheck ? 'flex' : 'none')};
    position: absolute;
    bottom: 2px;
    right: 2px;
`;

const ImageFileBoxLabel = styled.label`
    background-color: white;
    cursor: pointer;
`;

const ImageFileBoxInput = styled.input`
    position: absolute;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
`;

const CloseIssueButton = styled.button``;

const CommentIssueButton = styled.button``;

function convertMarkDownImage(imageFileName, imageURL) {
    return `![${imageFileName}](${imageURL})`;
}

const IssueDetailCommentInput = (props) => {
    const [commentContent, setCommentContent] = useState("");
    const [characterCount, setCharacterCount] = useState(0);
    const [timeCheck, setTimeCheck] = useState(false);
    const [imageURL, setImageURL] = useState("");
    const [imageFileName, setImageFileName] = useState("");

    const [clear, setClear] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect( () => {
        if (timeCheck) {
            clearTimeout(clear)
            setClear(setTimeout(() => {
                setTimeCheck(false);
            }, 2000));
            
            return;
        }
        const timeout = (!isLoaded) ? null : setTimeout( () => {
            setTimeCheck(true);
            setClear(setTimeout( () => {
                setTimeCheck(false);
            }, 2000));
        }, 2000);

        setIsLoaded(true);

        return () => {
            clearTimeout(timeout)
            clearTimeout(clear);
        };
    }, [commentContent]);

    useEffect( () => {
        if(imageURL && imageFileName) {
            setCommentContent(commentContent + convertMarkDownImage(imageFileName, imageURL));
        }
    }, [imageURL]);

    const onChange = (e) => {
        const { value } = e.target;

        setCommentContent(e.target.value);
        setCharacterCount(value.length);
    };

    const handleImageFile = async (e) => {
        const formData = new FormData();
        formData.append('file', e.target.files[0]);
        setImageFileName(e.target.files[0].name.split('.')[0]);
        const result = await sendImagePostRequest('/upload', formData);
        setImageURL(BASE_API_URL + result.url);
    };

    const submitClickEvent = async (e) => {
        const newComment = {contents:commentContent, issueID:props.issue.id, userID: 1, created_at: new Date()};
        const res = await sendPostRequest(`/issue/${props.issue.id}/comment`, newComment);
        const data = await sendGetRequest(`/issue/${props.issue.id}/comment`)

        if (res && res.success) {
            props.setComments(data);
        }
        setCommentContent("");
    };
    
    const toggleIssueState = async () => {
        if (props.issue.is_open === ISSUE_OPEN) {
            const res = await sendPutRequest("/issue/state", {isOpen: ISSUE_CLOSE, ids: [props.issue.id]});
            if (res.success) {
                props.setIssue({...props.comments, is_open: ISSUE_CLOSE});
            }
            return;
        }

        const res = await sendPutRequest("/issue/state", {isOpen: ISSUE_OPEN, ids: [props.issue.id]});
        if (res.success) {
            props.setIssue({...props.issue, is_open: ISSUE_OPEN});
        }
        return;
    }

    return (
        <>
            <ContentWrap>
              <IssueCommentInput placeholder="Leave a comment" value={commentContent} onChange={onChange} />
              <TextCountSpan timeCheck={timeCheck}>{characterCount} characters</TextCountSpan>
            </ContentWrap>
            <ImageFileBoxLabel htmlFor="file">Attach files by selecting here</ImageFileBoxLabel>
            <ImageFileBoxInput type="file" id="file" accept="image/jpeg, image/jpg, image/png" onChange={handleImageFile}></ImageFileBoxInput>
            
            <ButtonContainer>
                <CloseIssueButton onClick={toggleIssueState}>{(props.issue.is_open === ISSUE_OPEN) ? "Close issue" : "Reopen issue"}</CloseIssueButton>
                <CommentIssueButton onClick={submitClickEvent}>Comment</CommentIssueButton>
            </ButtonContainer>
        </>
    )
}

export default IssueDetailCommentInput;