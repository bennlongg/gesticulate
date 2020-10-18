import * as React from "react";
import { RouteComponentProps } from 'react-router';

import "./home.scss";
import { AppContext } from '../shell';

export const HomeView: React.FunctionComponent<RouteComponentProps> = props => {


  const { data } = React.useContext(AppContext)

  return (
    <div>Hello. It is me, the homepage. Here is some data from context: {data}</div>
  );
}