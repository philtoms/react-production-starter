import React from 'react'
import renderer from 'react-test-renderer'

import Layout from '../components/Layout'

describe('Post layout', () => {

  it('should render a loading page', () => {
    const component = renderer.create(
      <Layout title="t" content="c" isLoading/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })

  it('should render a loaded page', () => {
    const component = renderer.create(
      <Layout title="t" content="c"/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })

  it('should render an error page', () => {
    const component = renderer.create(
      <Layout error/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })

})
