import React from "react";
import FilesUploadComponent from "../components/application/uploadone";
import FilesUploadComponentThree from "../components/application/uploadthree";
import FilesUploadComponentTwo from "../components/application/uploadtwo";
import { navigate } from "@reach/router";
import CryptoJS from "crypto-js";
import HomeownerApp from "../components/application/sampleform";

class FamilyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      signingUrl: "",
      loadingSigning: false,
      otherEthSelected: false,
      showFillAlert: false,
      parentName: "",
      parentAddress: "",
      parentCity: "",
      parentZip: "",
      parentPhone: "",
      parentCell: "",
      parentEmail: "",
      currAddress: "",
      Months: "",
      prevAddress: "",
      Duration: "",
      yesorno: "",
      fieldsNeedFilling: [],
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.runSigning = this.runSigning.bind(this);
    this.dismissFillAlert = this.dismissFillAlert.bind(this);
    this.salt = process.env.BSIG_SALT || "development-salt-98sdi3u-o82bfip";
  }

  encryptData(data) {
    // encryption for local storage
    return CryptoJS.AES.encrypt(JSON.stringify(data), this.salt).toString();
  }

  decryptData(cipherText) {
    // decryption for local storage
    const bytes = CryptoJS.AES.decrypt(cipherText, this.salt);
    try {
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch (err) {
      return null;
    }
  }

  emptyState() {
    // empties state
    this.setState({
      step: 1,
      signingUrl: "",
      loadingSigning: false,
      otherEthSelected: false,
      showFillAlert: false,
      parentName: "",
      parentAddress: "",
      parentCity: "",
      parentZip: "",
      parentPhone: "",
      parentCell: "",
      parentEmail: "",
      currAddress: "",
      Months: "",
      prevAddress: "",
      Duration: "",
      yesorno: "",
      fieldsNeedFilling: [],
    });
  }

  componentDidMount() {
    // local storage data in case user accidentally hits back or forward
    const localData = localStorage.getItem("user");

    if (localData) {
      // if data exists
      const originalData = this.decryptData(localData);

      if (!originalData) {
        // data has been changed
        this.emptyState();
      } else {
        this.formData = originalData;
        this.setState({
          step: 1,
          signingUrl: this.formData.signingUrl,
          loadingSigning: false,
          otherEthSelected: false,
          showFillAlert: false,
          parentName: this.formData.parentName,
          parentAddress: this.formData.parentAddress,
          parentCity: this.formData.parentCity,
          parentZip: this.formData.parentZip,
          parentPhone: this.formData.parentPhone,
          parentCell: this.formData.parentCell,
          parentEmail: this.formData.parentEmail,
          currAddress: this.formData.currAddress,
          Months: this.formData.Months,
          prevAddress: this.formData.prevAddress,
          Duration: this.formData.Duration,
          yesorno: this.formData.yesorno,
          fieldsNeedFilling: this.formData.fieldsNeedFilling,
        });
      }
    } else {
      this.emptyState();
    }
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem("user", this.encryptData(nextState));
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;
    // handle option to input other ethnicity
    if (name === "childEthnicity" && value === "Other") {
      this.setState({ otherEthSelected: true });
    } else if (
      this.state.otherEthSelected &&
      name === "childEthnicity" &&
      value !== "Other" &&
      target.className === "form-select"
    ) {
      this.setState({ otherEthSelected: false });
    }

    this.setState({
      [name]: value,
    });
  }

  async runSigning(event) {
    // get information about unfilled fields to user, if necessary
    const inputVals = {
      "Name": this.state.parentName,
      "Address": this.state.parentAddress,
      "City": this.state.parentCity,
      "Postal code": this.state.parentZip,
      "Home phone": this.state.parentPhone,
      "Work phone": this.state.parentCell,
      "Email": this.state.parentEmail,
      "How long have you been at this address": this.state.currAddress,
      "Months": this.state.Months,
      "Previous Address": this.state.prevAddress,
      "How long?": this.state.Duration,
      "Have you ever owned property in the past?": this.state.yesorno,
    };
    const inputNotFilled = [];
    for (const [key, value] of Object.entries(inputVals)) {
      if (value === "") {
        inputNotFilled.push(key);
      }
    }
    // validate email
    if (
      !/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(this.state.parentEmail)
    ) {
      inputNotFilled.push("Parent's email");
    }

    // validate all fields are filled
    if (inputNotFilled.length !== 0) {
      this.setState({ showFillAlert: true, fieldsNeedFilling: inputNotFilled });
      return;
    }

    // start login and get signing URL
    this.setState({ loadingSigning: true, showFillAlert: false });
    try {
      await this.runLogin();
      fetch("/api/eg001/family", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          // transmit form info to backend
          parentName: this.state.parentName,
          parentAddress: this.state.parentAddress,
          parentCity: this.state.parentCity,
          parentZip: this.state.parentZip,
          parentPhone: this.state.parentPhone,
          parentCell: this.state.parentCell,
          parentEmail: this.state.parentEmail,
          currAddress: this.state.currAddress,
          Months: this.state.Months,
          prevAddress: this.state.prevAddress,
          Duration: this.state.Duration,
          yesorno: this.state.yesorno,
        }),
        credentials: "include",
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error("Input not valid");
          }
        })
        .then((data) => {
          this.setState(
            {
              signingUrl: data.signingUrl,
              step: 4,
              loadingSigning: true,
              otherEthSelected: false,
              showFillAlert: false,
              parentName: "",
              parentAddress: "",
              parentCity: "",
              parentZip: "",
              parentPhone: "",
              parentCell: "",
              parentEmail: "",
              currAddress: "",
              Months: "",
              prevAddress: "",
              Duration: "",
              yesorno: "",
              fieldsNeedFilling: [],
            },
            () => {
              // clear local storage for security
              localStorage.clear();
              window.location.href = data.signingUrl;
            }
          );
        })
        .catch((error) => {
          console.log(error);
          navigate("/bad/");
        });
    } catch (error) {
      console.log(error);
      navigate("/bad");
    }
  }

  runLogin() {
    const res = fetch("/api/login", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      credentials: "include",
    }).catch((err) => {
      console.log(err);
      throw new Error("Login failed");
    });
    return res;
  }

  nextPage() {
    const step = this.state.step;
    if (step < 4) {
      this.setState({ step: step + 1 });
    }
  }

  prevPage() {
    const step = this.state.step;
    if (step > 1) {
      this.setState({ step: step - 1 });
    }
  }

  dismissFillAlert() {
    this.setState({ showFillAlert: false });
  }

  render() {
    let curForm;
    switch (this.state.step) {
      case 1:
        curForm = (
          <FilesUploadComponent
            handleChange={this.handleInputChange}
            nextPage={this.nextPage}
            values={this.state}
          />
        );
        break;
      case 2:
        curForm = (
          <FilesUploadComponentTwo
            handleChange={this.handleInputChange}
            nextPage={this.nextPage}
            prevPage={this.prevPage}
            values={this.state}
          />
        );
        break;
      case 3:
        curForm = (
          <FilesUploadComponentThree
            handleChange={this.handleInputChange}
            prevPage={this.prevPage}
            nextPage={this.nextPage}
            values={this.state}
          />
        );
        break;
        case 4:
          curForm = (
            <HomeownerApp
              handleChange={this.handleInputChange}
              prevPage={this.prevPage}
              submitForm={this.runSigning}
              dismissFillAlert={this.dismissFillAlert}
              values={this.state}
            />
          );
          break;
      default:
        curForm = <h1>Error: Page Does Not Exist</h1>;
    }
    return (
      <div className="input-page">
        <div id="form-header">My Application</div>
        <div className="left-stuff">{curForm}</div>
      </div>
    );
  }
}

export default FamilyForm;