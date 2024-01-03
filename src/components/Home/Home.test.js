import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Home from "./Home";

test('Renders h1 title element', () => {
    const { getByText } = render(
        <BrowserRouter>
            <Home />
        </BrowserRouter>
    );
    const titleElement = getByText('The Home to Martial Art Events');
    expect(titleElement).toBeInTheDocument();
})

test('Renders link to all events', () => {
    const { getByText } = render(
        <BrowserRouter>
            <Home />
        </BrowserRouter>
    );

    const linkElement = getByText('View All Events');
    expect(linkElement).toBeInTheDocument();
})