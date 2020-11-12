import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { sendPostRequest } from '../common/api';
import { useDueDate } from '../milestone/milestoneHook';
import MilestoneInputForm from './milestoneInputForm';
import { ButtonContainer, OkButton } from '../common/style/button';

const NewMilestone = (props) => {
  const [title, setTitle] = useState('');
  const { dueDate, setDueDate, dateColor } = useDueDate();
  const [description, setDescription] = useState('');
  const [redirect, setRedirect] = useState(false);

  const createMilestone = async () => {
    if (!title.length) return alert('제목을 입력해주세요.');
    if (dateColor === 'red') return alert('유효한 날짜를 입력해주세요.');
    await sendPostRequest('/milestone', {title, dueDate, description});
    setRedirect(true);
  };

  return (
    <div>
      <div>
        <h2>New Milestone</h2>
        Create a new milestone to help organize your issues and pull requests. Learn more about <a href="https://guides.github.com/features/issues/">milestones and issues</a>.
      </div>
      <hr />
      <MilestoneInputForm setTitle={setTitle} setDueDate={setDueDate} setDescription={setDescription} dateColor={dateColor} />
      <ButtonContainer>
        <OkButton onClick={createMilestone}>Create milestone</OkButton>
      </ButtonContainer>
      {redirect? <Redirect to='/milestone' /> : null}
    </div>
  )
}

export default NewMilestone;
