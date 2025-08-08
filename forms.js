import "./formsmd/dist/css/formsmd.min.css"; // Or import formsmd.rtl.min.css in case of RTL
import { Composer, Formsmd } from "formsmd";
import Cookies from 'js-cookie'

 
// Create form with ID and submission endpoint
const composer = new Composer({
  id: "onboarding-form",
  postUrl: "/api/onboard"
});
 
// Choice input for position
composer.choiceInput("position", {
  question: "What's your position?",
  choices: ["Product Manager", "Software Engineer", "Founder", "Other"],
  required: true
});
 
// Text input if user selects "Other" position
composer.textInput("positionOther", {
  question: "Other",
  required: true,
  labelStyle: "classic",
  displayCondition: {
    dependencies: ["position"],
    condition: "position == 'Other'"
  }
});
 
// Start new slide, progress indicator at 50%
composer.slide({
  pageProgress: "50%"
});
 
// Choice input for how user discovered the product
composer.choiceInput("referralSource", {
  question: "How did you hear about us?",
  choices: ["News", "Search Engine", "Social Media", "Recommendation"],
  required: true
});
 
// Start new slide, show only if user was recommended, progress indicator at 75%
composer.slide({
  jumpCondition: "referralSource == 'Recommendation'",
  pageProgress: "75%"
});
 
// Email input for recommender email address
composer.emailInput("recommender", {
  question: "Who recommended you?",
  description: "We may be able to reach out to them and provide a discount for helping us out."
});
 
// Initialize with template, container, and options
const formsmd = new Formsmd(
  composer.template,
  document.getElementById("onboarding-form-container"),
  {
    postHeaders: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  }
);
formsmd.init();