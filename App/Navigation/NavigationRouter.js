// @flow

import React from 'react'
import { Scene, Router } from 'react-native-router-flux'

import {PresentationScreen} from '../Containers'
import { TabIcon } from '../Components'
import {TabBarStyle} from './Styles'

const NavigationRouter = () => (
  <Router>
    <Scene key='Root'>
      <Scene key='Tabbar' tabs initial tabBarStyle={TabBarStyle.container}>
        <Scene key='Ranking' title='Ranking' component={PresentationScreen} icon={TabIcon} />
        <Scene key='MyRanking' title='My Ranking' component={PresentationScreen} icon={TabIcon} />
        <Scene key='Account' title='Account' component={PresentationScreen} icon={TabIcon} />
      </Scene>
    </Scene>
  </Router>
)

export default NavigationRouter
