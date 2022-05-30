import { fireEvent, render as rtlRender, RenderResult } from "@testing-library/react";
import React, { ReactElement } from "react";
import { runAllTimers } from "./testUtils";
import { Simulate } from "react-dom/test-utils";

/** Syntax sugar for rendering `component` in RTL with our app-specific state/wrapper components. */
export async function render(component: React.ReactElement, ...wrappers: Wrapper[]): Promise<RenderResult> {
  // Just hardcode `withTheme` because we assume everyone will need it
  const wrapped = wrap([...wrappers], component);
  const result = rtlRender(wrapped);
  // It's really common for GraphQL to need a tick to render, so always do this here.
  await runAllTimers();
  return result;
}

/** Interface for adding wrappers (i.e. store, theme, etc. providers) around the test component. */
interface Wrapper {
  wrap(c: ReactElement): ReactElement;
}

function wrap(wrappers: Wrapper[], component: ReactElement): ReactElement {
  return wrappers.reduce((current, wrapper) => wrapper.wrap(current), component);
}

export class Rendered {
  constructor(public result: RenderResult) {}
}

export function type(input: HTMLElement, value: string): void {
  if (input.getAttribute("type") === "tel") {
    // For telephones, assume this is react-input-mask and apply this work around: https://github.com/sanniassin/react-input-mask/issues/174
    input.focus();
    // Ideally our caller would do this cast, but it's easier to do it here b/c RTL APIs all return HTMLElement.
    const inputElement = input as HTMLInputElement;
    inputElement.value = value;
    inputElement.selectionStart = inputElement.selectionEnd = value.length;
    Simulate.change(input);
  } else {
    fireEvent.input(input, { target: { value } });
  }
}

export function change(input: HTMLElement, value: string): void {
  fireEvent.change(input, { target: { value } });
}

export function click(element: HTMLElement): void {
  fireEvent.click(element);
}

