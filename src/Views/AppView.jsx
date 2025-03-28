import React, { Component } from "react";
import { Parser } from "expr-eval";

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullText: "",
      resultText: "",
      isResultInvalid: false,
      memory: localStorage.getItem("CALC_M") || "0",
    };
  }

  handleButtonClick = (value) => {
    if (this.state.isResultInvalid) {
      this.setState({ fullText: value, isResultInvalid: false });
    } else {
      this.setState((prevState) => ({
        fullText: prevState.fullText + value,
      }));
    }
  };

  clearAll = () => {
    this.setState({ fullText: "", resultText: "", isResultInvalid: false });
  };

  deleteLast = () => {
    this.setState((prevState) => ({
      fullText: prevState.fullText.slice(0, -1),
    }));
  };

  evaluateExpression = () => {
    try {
      if (!this.state.fullText) return;
      const parser = new Parser();
      const result = parser.evaluate(this.state.fullText);
      this.setState({ resultText: result.toString(), isResultInvalid: false });
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      this.setState({ resultText: "Error", isResultInvalid: true });
    }
  };

  handleKeyPress = (event) => {
    if (/\d|[+\-*/.]/.test(event.key)) {
      this.handleButtonClick(event.key);
    } else if (event.key === "Enter") {
      this.evaluateExpression();
    } else if (event.key === "Backspace") {
      this.deleteLast();
    }
  };

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }

  render() {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
        <div className="bg-white p-6 rounded-xl shadow-xl w-80">
          <div className="text-right text-gray-800 text-2xl font-semibold mb-4">
            {this.state.fullText || "0"}
          </div>
          <div
            className={`text-right text-3xl font-bold mb-6 ${
              this.state.isResultInvalid ? "text-red-500" : "text-green-500"
            }`}
          >
            {this.state.resultText}
          </div>
          <div className="grid grid-cols-4 gap-4">
            <button
              className="col-span-2 bg-red-500 text-white p-4 rounded-lg shadow-lg hover:bg-red-600 transform hover:scale-105 transition"
              onClick={this.clearAll}
            >
              C
            </button>
            <button
              className="bg-yellow-500 text-white p-4 rounded-lg shadow-lg hover:bg-yellow-600 transform hover:scale-105 transition"
              onClick={this.deleteLast}
            >
              ⌫
            </button>
            <button
              className="bg-blue-500 text-white p-4 rounded-lg shadow-lg hover:bg-blue-600 transform hover:scale-105 transition"
              onClick={() => this.handleButtonClick("/")}
            >
              ÷
            </button>
            {[7, 8, 9].map((num) => (
              <button
                key={num}
                className="bg-gray-700 text-white p-4 rounded-lg shadow-lg hover:bg-gray-800 transform hover:scale-105 transition"
                onClick={() => this.handleButtonClick(num.toString())}
              >
                {num}
              </button>
            ))}
            <button
              className="bg-blue-500 text-white p-4 rounded-lg shadow-lg hover:bg-blue-600 transform hover:scale-105 transition"
              onClick={() => this.handleButtonClick("*")}
            >
              ×
            </button>
            {[4, 5, 6].map((num) => (
              <button
                key={num}
                className="bg-gray-700 text-white p-4 rounded-lg shadow-lg hover:bg-gray-800 transform hover:scale-105 transition"
                onClick={() => this.handleButtonClick(num.toString())}
              >
                {num}
              </button>
            ))}
            <button
              className="bg-blue-500 text-white p-4 rounded-lg shadow-lg hover:bg-blue-600 transform hover:scale-105 transition"
              onClick={() => this.handleButtonClick("-")}
            >
              −
            </button>
            {[1, 2, 3].map((num) => (
              <button
                key={num}
                className="bg-gray-700 text-white p-4 rounded-lg shadow-lg hover:bg-gray-800 transform hover:scale-105 transition"
                onClick={() => this.handleButtonClick(num.toString())}
              >
                {num}
              </button>
            ))}
            <button
              className="bg-blue-500 text-white p-4 rounded-lg shadow-lg hover:bg-blue-600 transform hover:scale-105 transition"
              onClick={() => this.handleButtonClick("+")}
            >
              +
            </button>
            <button
              className="bg-gray-700 text-white p-4 rounded-lg shadow-lg hover:bg-gray-800 transform hover:scale-105 transition"
              onClick={() => this.handleButtonClick("0")}
            >
              0
            </button>
            <button
              className="bg-gray-700 text-white p-4 rounded-lg shadow-lg hover:bg-gray-800 transform hover:scale-105 transition"
              onClick={() => this.handleButtonClick(".")}
            >
              .
            </button>
            <button
              className="col-span-2 bg-green-500 text-white p-4 rounded-lg shadow-lg hover:bg-green-600 transform hover:scale-105 transition"
              onClick={this.evaluateExpression}
            >
              =
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Calculator;
