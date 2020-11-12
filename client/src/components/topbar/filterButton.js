import React, {useState, useEffect, useContext} from 'react';
import { Redirect } from 'react-router-dom';
import Modal from '../common/modal';
import filterCondition from '../common/filterCondition';
import styled from 'styled-components';
import { BORDER_COLOR, PRIMARY_COLOR, TOPBAR_SEARCH_BACKGROUND } from '../common/color';
import useModal from '../common/modalhook';

const ButtonDiv = styled.div`
  flex: 0 0 auto;
`

const ButtonInput = styled.input`
  padding: 5px 16px;

  background-color: ${TOPBAR_SEARCH_BACKGROUND};
  color: ${PRIMARY_COLOR};
  border: 1px solid ${BORDER_COLOR};

  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
  outline:none;

  cursor: pointer;

  &:hover {
    background-color: #f3f4f6;
  }
`;

const FilterButton = (props) => {
  const [onModal, setOnModal] = useModal('filters');
  const [title, setTitle] = useState('Filter issues');
  const [option, setOption] = useState([
    'Open issues',
    'Your issues',
    'Everything assigned to you',
    'Everything mentioning you',
    'Closed issues',
  ]);
  const [redirect, setRedirect] = useState(false);
  


  const handleModalEvent = (e) => {
    const text = e.target.innerHTML;
    setRedirect(filterCondition[text]);
  };

  return (
    <ButtonDiv>
      <ButtonInput className="filters" type="button" value="Filters ▼" onClick={() => setOnModal(!onModal)} />
      <Modal onModal={onModal} setOnModal={setOnModal} title={title} items={option} onEvent={handleModalEvent} />
      {(!redirect)? null : <Redirect to={`/issue?=${encodeURIComponent(redirect).replace(/%20/g, '+')}`}/>}
    </ButtonDiv>
  );
};

export default FilterButton;