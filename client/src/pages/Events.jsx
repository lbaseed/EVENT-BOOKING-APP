import { useRef, useState } from "react";
import Backdrop from "../components/Backdrop/Backdrop";
import Modal from "../components/modal/Modal";
import "./Events.css";

const EventsPage = () => {
	const [openModal, setOpenModal] = useState(false);
	const titleEl = useRef("");
	const priceEl = useRef("");
	const dateEl = useRef("");
	const descriptionEl = useRef("");

	const handleOpenModal = () => {
		setOpenModal(true);
	};
	const handleClose = () => {
		setOpenModal(false);
	};
	const handleConfirm = () => {
		const title = titleEl.current.value;
		const price = +priceEl.current.value;
		const date = dateEl.current.value;
		const description = descriptionEl.current.value;

		if (
			title.trim().length === 0 ||
			price.length === 0 ||
			date.trim().length === 0 ||
			description.trim().length === 0
		) {
			return console.log("fields empty");
		}
		const event = {
			title,
			price,
			date,
			description,
		};
		console.log(event);

		titleEl.current.value = "";
		priceEl.current.value = "";
		dateEl.current.value = "";
		descriptionEl.current.value = "";
	};
	return (
		<div className="events-control">
			<h1>Events Page</h1>
			<button className="btn" onClick={handleOpenModal}>
				Create Event +
			</button>
			{openModal && (
				<>
					<Backdrop />
					<Modal
						title="Add Event"
						canCancel
						canConfirm
						onCancel={handleClose}
						onConfirm={handleConfirm}>
						<form>
							<div className="form-control">
								<span>Title</span>
								<input type="text" id="title" ref={titleEl} />
							</div>
							<div className="form-control">
								<span>Price</span>
								<input type="number" id="price" ref={priceEl} />
							</div>
							<div className="form-control">
								<span>Date</span>
								<input type="date" id="date" ref={dateEl} />
							</div>
							<div className="form-control">
								<span>Description</span>
								<textarea rows="3" id="desc" ref={descriptionEl}></textarea>
							</div>
						</form>
					</Modal>
				</>
			)}
		</div>
	);
};

export default EventsPage;
