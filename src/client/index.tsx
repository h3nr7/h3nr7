import * as React from "react";
import { render } from "react-dom";
import { AppRouter } from "./routes";


const root = document.createElement("div");
document.body.appendChild(root);

render(<AppRouter />, root);