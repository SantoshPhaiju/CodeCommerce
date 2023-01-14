import { Stepper } from "react-form-stepper";

// CustomStepper.js
const CustomStepper = ({active}) => {
    console.log(active)
  return (
    <Stepper
      steps={[
        { label: "Order Placed" },
        { label: "Processing" },
        { label: "In Transit" },
        { label: "Shipped" },
        { label: "Delivered" },
      ]}
      activeStep={active}
    />
  );
};

export default CustomStepper;
