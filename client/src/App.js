import React, { useEffect, useReducer, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import styled, { createGlobalStyle } from 'styled-components';
import Header from './components/header/header.js';
import Login from "./components/login/index.js";
import Issue from "./components/issuelist/issuelist.js";
import Label from './components/labellist/labellist.js';
import NewIssue from "./components/newIssue/newIssue.js";
import IssueDetail from "./components/issueDetail/issueDetail.js";
import { IssueContext, LabelContext, MilestoneContext, UserContext, UsersContext } from "./components/common/context.js";
import asyncLabelWrapper from './wrapper/label';
import { reducer as labelReducer} from './reducer/label';
import MilestoneList from "./components/milestone/milestoneList.js";
import NewMilestone from "./components/newMilestone/newMilestone.js";
import MilestoneEditer from './components/MilestoneEditer/MilestoneEditer.js';
import { sendGetRequest } from "./components/common/api.js";
import { useUsers } from './components/issuelist/issueHook';

const ResetStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
`;

const ContentsContainer = styled.div`
  padding: 0px 32px;
  margin: 0px auto;
  max-width: 1280px;
`;

const App = () => {
  const [issues, setIssues] = useState([]);
  const [milestones, setMilestones] = useState([]);

  const [labelState, labelDispatch] = useReducer(labelReducer, {labels: []});
  const asyncLabelDispatch = asyncLabelWrapper(labelDispatch);

  const [users, setUsers] = useUsers();
  const [user, setUser] = useState(true);

  const putUserInState = async () => {
    const res = await sendGetRequest('/user/me', null);
    if (res !== null) {
      return setUser(res);
    }
    setUser(null);
  }

  useEffect(() => {
    putUserInState();
  }, []);

  const redirect = user ? null : <Redirect to="/"/>

  return (
    <div>
      <ResetStyle />
      <Header />
      <ContentsContainer>
        <UserContext.Provider value={user}>
          <IssueContext.Provider value={{issues, setIssues}}>
            <LabelContext.Provider value={{labelState, labelDispatch: asyncLabelDispatch}}>
              <MilestoneContext.Provider value={{milestones, setMilestones}}>
                {redirect}
                  <UsersContext.Provider value={{users, setUsers}}>
                  <Switch>
                    <Route exact path="/issue/create" component={NewIssue}/>
                    <Route exact path="/issue/:id" component={IssueDetail} />
                    <Route exact path="/issue" component={Issue}/>
                  </Switch>
                  </UsersContext.Provider>
                <Route exact path='/label' component={Label}/>
                <Route exact path="/" component={Login}/>
                <Switch>
                  <Route exact path="/milestone/create" component={NewMilestone}/>
                  <Route exact path="/milestone/:id" component={MilestoneEditer}/>
                  <Route exact path="/milestone" component={MilestoneList}/>
                </Switch>
              </MilestoneContext.Provider>
            </LabelContext.Provider>
          </IssueContext.Provider>
        </UserContext.Provider>
      </ContentsContainer>
    </div>
  );
}

export default App;