import { render, screen, fireEvent } from "@testing-library/react";
import Contacts from "../Contacts";
import React from "react";
import { expect, jest, test } from "@jest/globals";
import { ContactsContent } from "../../contexts/ContactsContent";

test("show filtered contacts on the screen", () => {
	const mockState = {
		filteredContacts: [
			{ id: 1, name: "Ali", email: "ali@example.com" },
			{ id: 2, name: "Sara", email: "sara@example.com" },
		],
		loading: false,
		error: null,
	};

	render(
		<ContactsContent.Provider value={{ state: mockState, dispatch: jest.fn() }}>
			<Contacts showModal={false} setShowModal={jest.fn()} />
		</ContactsContent.Provider>
	);
	expect(screen.getByText("Ali")).toBeInTheDocument();
	expect(screen.getByText("ali@example.com")).toBeInTheDocument();
	expect(screen.getByText("Sara")).toBeInTheDocument();
	expect(screen.getByText("sara@example.com")).toBeInTheDocument();
});
test("should show loading message", () => {
	const mockState = {
		filteredContacts: [],
		loading: true,
		error: null,
	};

	render(
		<ContactsContent.Provider value={{ state: mockState, dispatch: jest.fn() }}>
			<Contacts showModal={false} setShowModal={jest.fn()} />
		</ContactsContent.Provider>
	);
	expect(screen.getByText("loadiiiiiing .....")).toBeInTheDocument();
});
test("should show error message", () => {
	const mockState = {
		filteredContacts: [],
		loading: false,
		error: "Error fetching contacts",
	};
	render(
		<ContactsContent.Provider value={{ state: mockState, dispatch: jest.fn() }}>
			<Contacts showModal={false} setShowModal={jest.fn()} />
		</ContactsContent.Provider>
	);
	expect(screen.getByText("Error fetching contacts")).toBeInTheDocument();
});
test("should show empty message", () => {
	const mockState = {
		filteredContacts: [],
		loading: false,
		error: null,
	};
	render(
		<ContactsContent.Provider value={{ state: mockState, dispatch: jest.fn() }}>
			<Contacts showModal={false} setShowModal={jest.fn()} />
		</ContactsContent.Provider>
	);
	expect(screen.getByText("no contacts")).toBeInTheDocument();
});
test("shoud delete a contact on delete button", () => {
	const mockDispatch = jest.fn();
	const mockState = {
		contacts: [
			{
				id: 0,
				name: "test",
				email: "test@test.com",
				job: "Developer",
				address: "Tehran",
			},
		],
		filteredContacts: [
			{
				id: 0,
				name: "test",
				email: "test@test.com",
				job: "Developer",
				address: "Tehran",
			},
		],
	};
	render(
		<ContactsContent.Provider value={{ state: mockState, dispatch: mockDispatch }}>
			<Contacts showModal={false} setShowModal={jest.fn()} />
		</ContactsContent.Provider>
	);

	fireEvent.click(screen.getByText("حذف"));

	expect(mockDispatch).toHaveBeenCalledWith(
		expect.objectContaining({
			type: "DELETE_CONTACT",
			payload: 0,
		})
	);
});
