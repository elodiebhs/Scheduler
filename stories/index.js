import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import "index.scss";

import Button from "components/Button";

storiesOf("Button", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  //Base uses no props and is considered the default button
  .add("Base", () => <Button>Base</Button>)
  //Confirm uses the confirm prop to apply the .button--confirm modifier class
  .add("Confirm", () => <Button confirm>Confirm</Button>)
  //Danger uses the danger prop to apply the .button--danger modifier class
  .add("Danger", () => <Button danger>Cancel</Button>)
  //Clickable uses the onClick prop to handle the button click event
  .add("Clickable", () => (
    <Button onClick={action("button-clicked")}>Clickable</Button>
  ))
  //Disabled uses the disabled prop to apply the disabled attribute to the button element
  .add("Disabled", () => (
    <Button disabled onClick={action("button-clicked")}>
      Disabled
    </Button>
  ));
