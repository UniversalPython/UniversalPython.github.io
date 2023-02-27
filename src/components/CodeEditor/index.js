import React from "react";
import PropTypes from "prop-types";
import AceEditor from "react-ace";

class CodeEditor extends React.PureComponent {
  constructor(props) {
    super(props);

    const { value } = this.props;

    this.state = {
      value
    };
  }

  componentDidUpdate(prevProps) {
    const { value } = this.props;

    if (prevProps.value !== value) {
      this.onChange(value);
    }
  }

  onChange = value => {
    const { onChange } = this.props;

    this.setState({ value });
    onChange(value);
  };

  getValue = () => {
    const { value } = this.state;
    return value;
  };

  render() {
    const { value } = this.state;

    return (
      
      <AceEditor
        // theme="twilight"
        theme="github"
        showPrintMargin={false}
        editorProps={{ 
            $blockScrolling: true,
        }}
        setOptions={{
            enableBasicAutocompletion: true,
            enableSnippets: true,
            enableLiveAutocompletion: true,
            showGutter: false,
            maxLines: 20,
        }}
        {...this.props}
        onChange={this.onChange}
        value={value}
      />
    );
  }
}

CodeEditor.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func
};

CodeEditor.defaultProps = {
  value: "",
  onChange: () => null
};

export default CodeEditor;
