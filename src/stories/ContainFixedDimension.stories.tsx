import React from 'react';
import { addDecorator } from '@storybook/react';
import ContainFixedDimension from '../components/ContainFixedDimension';

addDecorator(storyFn => (
  <><style dangerouslySetInnerHTML={{__html: 'body{margin:0}'}} />{storyFn()}</>
));

export default {
  title: 'ContainFixedDimension',
  component: ContainFixedDimension,
};

export const Basic = () => (
  <ContainFixedDimension designWidth={600} designHeight={400} style={{boxSizing: 'border-box', padding: '1px', boxShadow: 'inset 0 0 0 1px'}}>
    <p style={{fontSize: '32px'}}>This is some text in 32px.</p>
    <p style={{fontSize: '24px'}}>This is some text in 24px.</p>
    <p style={{fontSize: '16px'}}>This is some text in 16px.</p>
  </ContainFixedDimension>
);

export const Iframe = () => (
  <ContainFixedDimension designWidth={1280} designHeight={720}>
    <iframe title="How Big Is My Browser" style={{width:'100%',height:'100%'}} src="http://howbigismybrowser.com/" />
  </ContainFixedDimension>
);
