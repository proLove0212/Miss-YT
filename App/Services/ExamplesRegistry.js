// @flow

import React from 'react';
import { Text, View } from 'react-native';
import R from 'ramda';
import { applicationStyles } from '../Themes';
import DebugSettings from '../Config/DebugSettings';
const globalExamplesRegistry = [];

export const addExample = (title: string, usage: () => React$Element<*>) => { if (DebugSettings.includeExamples) globalExamplesRegistry.push({title, usage}); };

const renderExample = (example: Object) => (
  <View key={example.title}>
    <View style={applicationStyles.darkLabelContainer}>
      <Text style={applicationStyles.darkLabel}>{example.title}</Text>
    </View>
    {example.usage.call()}
  </View>
  );

export const renderExamples = () => R.map(renderExample, globalExamplesRegistry);

// Default for readability
export default {
  render: renderExamples,
  add: addExample,
};
