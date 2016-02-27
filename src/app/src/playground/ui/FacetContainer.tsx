/*
  CHANGELOG

  add FacetContainer
  add collapsable

 */

import * as React from "react";

const bemBlock = require('bem-cn')

require('./FacetContainer.scss')

export interface FacetContainerProps extends React.Props<FacetContainer> {
  key?: any
  title?: string
  mod?: string
  disabled?: boolean
  className?: string
  collapsable?: boolean
}

export class FacetContainer extends React.Component<FacetContainerProps, {collapsed: boolean}> {

  static propTypes = {
      title: React.PropTypes.string,
      disabled: React.PropTypes.bool,
      mod: React.PropTypes.string,
      className: React.PropTypes.string,
      collapsable: React.PropTypes.bool,
  }

  static defaultProps = {
    disabled: false,
    collapsable: false,
    mod: "sk-facet-container"
  }

  constructor(props){
    super(props)
    this.state = {
      collapsed: props.collapsable
    }
  }

  toggleCollapsed(){
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  render() {
      const { title, mod, className, disabled, children, collapsable } = this.props
      const { collapsed } = this.state

      const bemBlocks = {
          container: bemBlock(mod)
      }

      var block = bemBlocks.container
      var containerClass = block()
          .mix(className)
          .state({ disabled })

      var titleDiv
      if (collapsable){
        const arrowClass = collapsed ? 'sk-arrow-right' : 'sk-arrow-down'
        titleDiv = (
          <div className={block("header").state({ collapsable })} onClick={this.toggleCollapsed.bind(this)}>
            <span className={arrowClass}/>&nbsp;{title}
          </div>
        )
      } else {
        titleDiv = <div className={block("header") }>{title}</div>
      }

      return (
        <div className={containerClass}>
          {titleDiv}
          <div className={block("content").state({ collapsed })}>
            {children}
          </div>
        </div>
      );
  }
}
