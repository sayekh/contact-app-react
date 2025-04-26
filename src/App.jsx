import { useState } from "react";
import ContactsProvider from "./contexts/ContactsContent.jsx";
import Contacts from "./components/Contacts";
import Search from "./components/Search.jsx";
import AddContactModal from "./components/AddContactModal.jsx";

import style from "./App.module.css";

function App() {
	const [showModal, setShowModal] = useState({
		renderModal: false,
		content: null,
	});
	return (
		<>
			<ContactsProvider>
				<div className={style.appWrapper}>
					{showModal.renderModal && (
						<AddContactModal
							onClose={() =>
								setShowModal({
									renderModal: false,
									content: null,
								})
							}
							content={showModal.content}
						/>
					)}
					<div className={style.formContainer}>
						<div className={style.header}>
							<h1 className={style.neonTitle}>Contact App</h1>
						</div>
						<Search />
						<Contacts showModal={showModal} setShowModal={setShowModal} />
					</div>
				</div>
			</ContactsProvider>
		</>
	);
}

export default App;
