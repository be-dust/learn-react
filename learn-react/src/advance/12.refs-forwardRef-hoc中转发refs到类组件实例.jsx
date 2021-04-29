import React from 'react';
import ReactDOM from 'react-dom';

class FancyButton extends React.Component {
  focus = () => {
    // ...
    console.log('focus');
  };

  render() {
    return <input />;
  }
}

function logProps(WrappedComponent) {
  class LogProps extends React.Component {
    componentDidUpdate(prevProps) {
      console.log('old props:', prevProps);
      console.log('new props:', this.props);
    }

    render() {
      const { forwardRef, ...rest } = this.props;
      // 将自定义的 prop 属性 “forwardedRef” 定义为 ref
      return <WrappedComponent ref={forwardRef} {...rest} />;
    }
  }

  //   return LogProps;
  return React.forwardRef((props, ref) => {
    return <LogProps {...props} forwardRef={ref}></LogProps>;
  });
}

// 我们导出 LogProps，而不是 FancyButton。
// 虽然它也会渲染一个 FancyButton。
const LogProps = logProps(FancyButton);

const ref = React.createRef();

ReactDOM.render(<LogProps ref={ref} />, document.getElementById('root'));

console.log(ref);
