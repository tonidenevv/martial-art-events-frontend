import { render, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Login from "./Login";

test('Renders username input field', () => {
    const { getByPlaceholderText } = render(<BrowserRouter><Login /></BrowserRouter>);
    const usernameElement = getByPlaceholderText('Username...');
    expect(usernameElement).toBeInTheDocument();
});

test('Renders password input field', () => {
    const { getByPlaceholderText } = render(<BrowserRouter><Login /></BrowserRouter>);
    const passwordElement = getByPlaceholderText('Password...');
    expect(passwordElement).toBeInTheDocument();
});

test('Username field should be empty', () => {
    const { getByPlaceholderText } = render(<BrowserRouter><Login /></BrowserRouter>);
    const usernameElement = getByPlaceholderText('Username...');
    expect(usernameElement.value).toBe('');
});

test('Password field should be empty', () => {
    const { getByPlaceholderText } = render(<BrowserRouter><Login /></BrowserRouter>);
    const passwordElement = getByPlaceholderText('Password...');
    expect(passwordElement.value).toBe('');
});

test('Username field should change', () => {
    const { getByPlaceholderText } = render(<BrowserRouter><Login /></BrowserRouter>);
    const usernameElement = getByPlaceholderText('Username...');
    const testValue = 'test';
    fireEvent.change(usernameElement, { target: { value: testValue } });
    expect(usernameElement.value).toBe(testValue);
})