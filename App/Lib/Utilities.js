// @flow

// Utility functions
import { Platform } from 'react-native';
import R from 'ramda';

// useful cleaning functions
const nullToEmpty = R.defaultTo('');
const replaceEscapedCRLF = R.replace(/\\n/g);
const nullifyNewlines = R.compose(replaceEscapedCRLF(' '), nullToEmpty);

// Correct Map URIs
export const locationURL = (address: string) => {
  const cleanAddress = nullifyNewlines(address);
  // https://developer.apple.com/library/ios/featuredarticles/iPhoneURLScheme_Reference/MapLinks/MapLinks.html
  let url = `http://maps.apple.com/?address=${cleanAddress}`;
  // https://developers.google.com/maps/documentation/ios-sdk/urlscheme
  if (Platform.OS === 'android') url = `http://maps.google.com/?q=${cleanAddress}`;

  return url;
};
export const directionsURL = (address: string) => {
  const cleanAddress = nullifyNewlines(address);
  // https://developer.apple.com/library/ios/featuredarticles/iPhoneURLScheme_Reference/MapLinks/MapLinks.html
  let url = `http://maps.apple.com/?daddr=${cleanAddress}&dirflg=d`;
  // https://developers.google.com/maps/documentation/ios-sdk/urlscheme
  if (Platform.OS === 'android') url = `http://maps.google.com/?daddr=${cleanAddress}`;

  return url;
};
