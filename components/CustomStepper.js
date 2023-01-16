import { Stepper } from "react-form-stepper";

// CustomStepper.js
const CustomStepper = ({ active }) => {
  console.log(active);
  return (
    <Stepper
      className="w-full border"
      steps={[
        { label: "Order Placed" },
        { label: "Processing" },
        { label: "In Transit" },
        { label: "Shipped" },
        { label: "Delivered" },
      ]}
      stepClassName={"stepper__step"}
      activeStep={active}
      styleConfig={{
        border: "1px solid black",
        activeBgColor: "#a000ff",
        activeTextColor: "#fff",
        inactiveBgColor: "#90f9f9",
        inactiveTextColor: "#2b7cff",
        completedBgColor: "#038303",
        completedTextColor: "#fff",
        size: "4em",
      }}
    />
  );
};

export default CustomStepper;
