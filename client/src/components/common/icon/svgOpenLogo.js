import React from 'react';
import styled from 'styled-components';
import Icon from '../icon.js';

const SvgContainer = styled(Icon)`
  margin-top: 4px;
  color: ${props => props.color};
  width: 16px;
  height: 16px;
`
const SvgOpenLogo = (props) => {
  return (
    <SvgContainer viewBox="0 0 16 16" color={props.color}>
      <path fill="currentcolor" d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8zm9 3a1 1 0 11-2 0 1 1 0 012 0zm-.25-6.25a.75.75 0 00-1.5 0v3.5a.75.75 0 001.5 0v-3.5z"></path>
    </SvgContainer>
  );
};

export default SvgOpenLogo;
