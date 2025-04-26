import { render, screen, fireEvent } from "@testing-library/react";
import AddContactModal from "../AddContactModal";
import React from "react";
import { jest, test } from "@jest/globals";
import { ContactsContent } from "../../contexts/ContactsContent";

test("shoud add a new contact on form submit", () => {
	const mockDispatch = jest.fn();
	const mockOnClose = jest.fn();
	const mockState = {
		contacts: [],
	};
	render(
		<ContactsContent.Provider value={{ state: mockState, dispatch: mockDispatch }}>
			<AddContactModal onClose={mockOnClose} content={null} />
		</ContactsContent.Provider>
	);
	fireEvent.change(screen.getByPlaceholderText("نام"), { target: { value: "test", name: "name" } });
	fireEvent.change(screen.getByPlaceholderText("ایمیل"), {
		target: { value: "test@test.com", name: "email" },
	});
	fireEvent.change(screen.getByPlaceholderText("شغل"), { target: { value: "Developer", name: "job" } });
	fireEvent.change(screen.getByPlaceholderText("آدرس"), {
		target: { value: "Tehran", name: "address" },
	});

	fireEvent.click(screen.getByText("افزودن"));

	expect(mockDispatch).toHaveBeenCalledWith(
		expect.objectContaining({
			type: "ADD_CONTACT",
			payload: expect.objectContaining({
				name: "test",
				email: "test@test.com",
				job: "Developer",
				address: "Tehran",
			}),
		})
	);

	expect(mockOnClose).toHaveBeenCalled();
});
